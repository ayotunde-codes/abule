import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  InputSelectUser, PopMessage, SearchBar
} from '@abule-common/components';
import ChatHistory from './ChatHistory';
import CreateChat from './CreateChat';
import {
  createNewConversation,
  setCurrentConversationRecipient as setConversationRecipient,
} from '../../redux/inbox/action';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createConversation: false,
      recipients: [],
    };

    this.showCreateConversation = this.showCreateConversation.bind(this);
    this.hideCreateConversation = this.hideCreateConversation.bind(this);
    this.initializeConversation = this.initializeConversation.bind(this);
  }

  showCreateConversation() {
    this.setState({
      createConversation: true,
    });
  }

  hideCreateConversation() {
    this.setState({
      createConversation: false,
      recipients: [],
    });
  }

  async initializeConversation() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    let { recipients } = state;
    recipients = recipients.map((recipient) => recipient.userId);

    const initNewConversation = async () => {
      const { recipients: Recipients } = state;
      let conversation = {
        conversation: [],
      };
      if (Recipients.length === 1) {
        conversation = {
          ...conversation,
          recipient: {
            isNew: true,
            ...Recipients[0],
          },
        };
      } else {
        // when its a group chat
        conversation = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/inbox/conversations/group`,
          method: 'POST',
          body: JSON.stringify({
            participants: Recipients.map((p) => p.userId),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { chatGroup } = conversation;
        console.log('the conversation returned after creating group', conversation);
        props.emitEvent({
          topic: props.topic,
          event: 'create-group',
          chatGroupId: chatGroup.id,
        });
      }

      props.createNewConversation(conversation);
      props.setConversationRecipient(conversation.recipient || conversation.chatGroup);
      return conversation;
    };

    let oldRecipient = false;
    if (recipients.length > 0) {
      const { conversations } = props.inbox;
      if (recipients.length === 1) {
        const [recipient] = recipients;
        for (const chat of conversations) {
          console.log({ chat, recipient });
          if (chat.recipient && chat.recipient.userId === recipient) {
            oldRecipient = chat.recipient;
            break;
          }
        }

        if (oldRecipient) {
          props.setConversationRecipient(oldRecipient);
        } else {
          initNewConversation();
        }

        Router.push(`${props.AppUrl}/inbox/[id]`, `${props.AppUrl}/inbox/${recipient}`);
      } else {
        recipients.push(sessionUser.userId);
        for (const chat of conversations) {
          if (chat.chatGroup && chat.chatGroup.participants.length === recipients.length) {
            const participantsId = chat.chatGroup.participants.map((participant) => participant.userId);
            let matches = 0;
            recipients.forEach((recipient) => {
              if (participantsId.includes(recipient)) {
                matches += 1;
              }
            });

            if (matches === recipients.length) {
              oldRecipient = chat.chatGroup;
              break;
            }
          }
        }

        let groupId = '';
        if (oldRecipient) {
          groupId = oldRecipient.id;
          props.setConversationRecipient(oldRecipient);
        } else {
          const conversation = await initNewConversation();
          groupId = conversation.chatGroup.id;
        }

        Router.push(`${props.AppUrl}/inbox/group/[id]`, `${props.AppUrl}/inbox/group/${groupId}`);
      }
    }
    this.hideCreateConversation();
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    return (
      <div className="navigation-block">
        <CreateChat
          createConversation={this.showCreateConversation}
        />
        <ChatHistory
          {...props}
          createConversation={this.showCreateConversation}
        />
        {state.createConversation && (
          <PopMessage
            rootClassName="inbox-select-recipient"
            show={state.initregistration}
            message={(
              <div id="finHelpPickerUsersPopUp">
                <SearchBar />
                <div className="results">
                  <InputSelectUser
                    title="Members of your Tribe"
                    values={state.recipients}
                    users={sessionUser.tribe}
                    maxSelection={2}
                    onChange={(recipients) => {
                      this.setState({
                        recipients,
                      });
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-1"
                  style={{ margin: '0px auto', marginTop: '2em', width: 'max-content' }}
                  onClick={this.initializeConversation}
                >FINISH
                </button>
              </div>
            )}
            confirmButton={{
              show: false,
            }}
            cancelButton={{
              show: false,
            }}
            onCancel={this.hideCreateConversation}
          />
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  createNewConversation: (recipient) => dispatch(createNewConversation(recipient)),
  setConversationRecipient: (recipient) => dispatch(setConversationRecipient(recipient)),
});
export default connect(null, mapDispatchToProps)(Navigation);
