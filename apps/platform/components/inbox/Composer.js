import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import { Utils } from '../../datastore';
import {
  addChatToCurrentConversation as addToChat,
  updateCurrentConversationRecipient as updateConversationRecipient,
  updateCurrentConversationChat as updateChatMessage,
} from '../../redux/inbox/action';
import Composer from '../Composer';

const {
  isEmpty, popAlert, stripExcessString,
} = Fn;

class InboxComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fileAcceptType: '',
      medias: [],
      maxMedia: Utils.getValue('MaxChatMedia'),
    };

    this.composer = null;
    this.filePicker = null;
    this.mediasPickHandler = this.mediasPickHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    // this.props.onComponentDidUpdate();
  }

  onUpdate(el) {
    if (el) this.composer = el;
    this.props.onUpdate(this.composer);
  }

  mediasPickHandler(event) {
    const { state, props } = this;
    const { target } = event;
    const { files } = target;
    const space = state.maxMedia - state.medias.length;
    // console.log({ maxMedia: this.maxMedia, length: this.state.medias.length, space });
    const arr = [];
    const imageTypes = [
      'image/gif',
      'image/jpg',
      'image/jpeg',
      'image/png',
    ];
    const videoTypes = ['video/mp4'];
    // max={ - state.medias.length}

    if (space > 0) {
      for (const file of files) {
        if (arr.length < space) {
          if (
            imageTypes.includes(file.type)
            || videoTypes.includes(file.type)
          ) {
            if ((imageTypes.includes(file.type) && file.size < 10485760) // <== 10mb
              || (videoTypes.includes(file.type) && file.size < 52428800)) { // <== 50mb
              arr.push({ preview: URL.createObjectURL(file), file });
            } else {
              popAlert({
                title: 'File too large',
                description: "Videos can't be more than 50mb and images can't be more than 10mb",
                error: true,
              });
            }
          }
        } else break;
      }

      if (arr.length > 0) {
        this.setState((prev) => ({
          medias: [...prev.medias, ...arr],
          photosError: false,
        }));
      }
    }
    target.value = null;
  }

  async sendMessage(message, medias) {
    const { props, state } = this;
    const { recipient } = props;
    if (!isEmpty(message) || medias.length > 0) {
      console.log(this);
      const { sessionUser } = props.settings;

      const chat = {
        sending: true,
        id: new Date(),
        message: stripExcessString(message, '\n'),
        senderId: sessionUser.userId,
        recieverId: 'placeholder',
        chatGroupId: 'placeholder',
        medias: medias.map((media) => ({
          ...media,
          url: media.preview,
          processing: true,
        })),
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      props.addToChat(recipient, chat);

      let assemblyId = false;
      if (medias.length > 0) {
        try {
          const data = await props.processFiles('message-media', medias.map((media) => media.file));
          assemblyId = data.assemblyId;
        } catch (e) {
          console.log('THERE WAS AN UNFORTUNATE ERROR WHILE PROCESSINIG FILES', e);
        }
      }

      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/inbox/conversations`,
        method: 'POST',
        body: JSON.stringify({
          assemblyId,
          message,
          recipient: {
            id: recipient.userId || recipient.id,
            type: recipient.userId ? 'single' : 'group',
            isNew: recipient.isNew,
            participants: (recipient.participants || []).map((p) => p.userId),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('MESSAGE DATA', data);
      props.emitEvent({
        topic: props.topic,
        event: 'send-message',
        chatId: data.conversation.id,
      });
      props.updateChatMessage(chat.id, {
        sending: false,
      });

      if (recipient.isNew) {
        props.updateConversationRecipient({
          id: data.chatGroupId,
          isNew: false,
        });
      }
    }
  }

  pickFiles(type) {
    const { state } = this;
    if (state.medias.length < state.maxMedia) {
      let fileAcceptType = 'image/jpg,image/jpeg,image/png';
      if (type === 'video') {
        fileAcceptType = 'video/mp4';
      } else if (type === 'gif') {
        fileAcceptType = 'image/gif';
      }

      this.setState({
        fileAcceptType,
      }, () => {
        this.filePicker.click();
      });
    }
  }

  deleteMeida(index) {
    const { state } = this;
    const { medias } = state;
    medias.splice(index, 1);
    this.setState({ medias });
  }

  render() {
    const { state } = this;
    const { onChange, style } = this.props;
    const allowMediaPick = state.medias.length < state.maxMedia;
    return (
      <Composer
        onSend={this.sendMessage}
      />
    );
  }
}

InboxComposer.defaultProps = {
  onUpdate: () => { },
  onChange: () => { },
  onSend: () => { },
  style: {},
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  addToChat: (recipient, message) => dispatch(addToChat(recipient, message)),
  updateChatMessage: (id, props) => dispatch(updateChatMessage(id, props)),
  updateConversationRecipient: (props) => dispatch(updateConversationRecipient(props)),
});

export default connect(null, mapDispatchToProps)(InboxComposer);
