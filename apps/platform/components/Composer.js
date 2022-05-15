import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import { Utils } from '../datastore';

import {
  addChatToCurrentConversation as addToChat,
  updateCurrentConversationRecipient as updateConversationRecipient,
  updateCurrentConversationChat as updateChatMessage,
} from '../redux/inbox/action';

const {
  isEmpty, popAlert, stripExcessString,
} = Fn;

class Composer extends Component {
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

  async sendMessage() {
    const { props, state } = this;
    const { message, medias } = state;
    if (!isEmpty(message) || medias.length > 0) {
      console.log(this);
      props.onSend(message, medias);
      this.setState({
        message: '',
        medias: [],
      });
    }
  }

  async sendMessage_old() {
    const { props, state } = this;
    const { message, medias } = state;
    const { recipient } = props;
    if (!isEmpty(message) || medias.length > 0) {
      console.log(this);
      const { sessionUser } = props.settings;

      this.setState({
        message: '',
        medias: [],
      });
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
    const { state, props } = this;
    const { onChange, style } = this.props;
    const allowMediaPick = state.medias.length < state.maxMedia;

    return (
      <div id="chatMessageComposer">
        <div className="message-input-field">

          <div className="division">
            {state.medias.length > 0 && (
              <div className="media-previews">
                {state.medias.map((media, index) => {
                  const { preview, file } = media;
                  return (
                    <div className="media image">
                      {file.type === 'video/mp4'
                        ? <video src={preview} />
                        : <img src={preview} alt="" />}
                      <span
                        className="icon-cross icon cancel"
                        onClick={() => {
                          this.deleteMeida(index);
                        }}
                      />
                      {file.type === 'video/mp4' && <span className="icon play icon-play" />}
                    </div>
                  );
                })}
              </div>
            )}

            {props.actions && (
              <div className="actions">
                <div className="left">
                  <span
                    className={`action icon-hmv-image${allowMediaPick ? '' : ' disallow'}`}
                    onClick={() => {
                      this.pickFiles('image');
                    }}
                  />
                  <span
                    className={`action icon-hmv-video${allowMediaPick ? '' : ' disallow'}`}
                    onClick={() => {
                      this.pickFiles('video');
                    }}
                  />
                  <span
                    className={`action icon-hmv-gif${allowMediaPick ? '' : ' disallow'}`}
                    onClick={() => {
                      this.pickFiles('gif');
                    }}
                  />
                  {/* <span className="action icon-at-sign" /> */}
                  <input
                    multiple
                    id="filePicker"
                    ref={(e) => {
                      if (e && !this.filePicker) this.filePicker = e;
                    }}
                    type="file"
                    accept={state.fileAcceptType}
                    onChange={this.mediasPickHandler}
                  />
                </div>
                {/* <div className="right" /> */}
              </div>
            )}

          </div>
          <div className="message-text-field-container">
            {/* <PostViewText
              autoHeight
              className="message-text-field"
              placeholder="Say Something"
              value={state.message}
              onChange={(value) => {
                this.onUpdate();
                onChange(value);
                this.setState({ message: value });
              }}
            /> */}

            <TextareaItem
              autoHeight
              className="message-text-field"
              placeholder="say something"
              value={state.message}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.sendMessage();
                  // if (e.shiftKey) {
                  // }
                }
              }}
              onChange={(value) => {
                this.onUpdate();
                onChange(value);
                this.setState({ message: value });
              }}
            />
            <button
              type="button"
              className="btn btn-1"
              onClick={this.sendMessage}
            >
              {/* <span
                className="icon-send-2 icon"
                style={{ fontWeight: '100' }}
              /> */}
              SEND
            </button>
          </div>

        </div>
      </div>
    );
  }
}

Composer.propTypes = {
  onUpdate: PropTypes.func,
  onChange: PropTypes.func,
  onSend: PropTypes.func,
  style: PropTypes.object,
  actions: PropTypes.bool,
};

Composer.defaultProps = {
  onUpdate: () => { },
  onChange: () => { },
  onSend: () => { },
  style: {},
  actions: true,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
  addToChat: (recipient, message) => dispatch(addToChat(recipient, message)),
  updateChatMessage: (id, props) => dispatch(updateChatMessage(id, props)),
  updateConversationRecipient: (props) => dispatch(updateConversationRecipient(props)),
});

export default connect(null, mapDispatchToProps)(Composer);
