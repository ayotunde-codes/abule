import Router from 'next/router';
import React from 'react';

class ChatHistory extends React.Component {
  orderConversation(conversations) {
    const lastMessageTime = (conv) => {
      const { conversation } = conv;
      if (conversation.length) {
        // convert to seconds
        return new Date((conversation[conversation.length - 1].updatedAt)).getTime() / 1000;
      }

      return 0;
    };
    conversations.sort((a, b) => {
      const scoreA = lastMessageTime(a);
      const scoreB = lastMessageTime(b);

      if (scoreA < scoreB) {
        return 1;
      }
      if (scoreA > scoreB) {
        return -1;
      }
      return 0;
    });
    return conversations;
  }

  render() {
    const { props } = this;
    const { recipient, inbox } = props;
    let { conversations } = inbox;

    // order the coversations
    conversations = this.orderConversation(conversations);
    return (
      <div className="chat-history">
        <p className="header">RECENT CHATS</p>

        <div className="chat-list">
          {conversations.length > 0 ? conversations.map((chat) => {
            const isActive = recipient && ((recipient.participants && chat.chatGroup && chat.chatGroup.id === recipient.id)
              || (!recipient.participants && chat.recipient && recipient.userId === chat.recipient.userId));

            return (
              <div
                className={`chat${isActive ? ' active' : ''}`}
                onClick={() => {
                  if (chat.recipient) {
                    Router.push(`${props.AppUrl}/inbox/[id]`, `${props.AppUrl}/inbox/${chat.recipient.userId}`);
                  }
                  if (chat.chatGroup) {
                    Router.push(`${props.AppUrl}/inbox/group/[id]`, `${props.AppUrl}/inbox/group/${chat.chatGroup.id}`);
                  }
                }}
              >
                <div className="image avi">
                  <img src={chat.recipient ? chat.recipient.imageUrl : '/icons/users.svg'} alt="" />
                </div>
                <div className="title">
                  {
                    chat.recipient ? `${chat.recipient.firstName} ${chat.recipient.lastName}`
                      : (
                        <>
                          {
                            chat.chatGroup.name
                            || chat.chatGroup.participants.map(({ user }) => `${user.firstName} ${user.lastName}`).join(', ')
                          }
                        </>
                      )
                    }
                </div>
              </div>
            );
          })
            : (
              <div className="empty-msg">
                <h5 className="placeholder">You don't have any chat history.</h5>
                <button
                  type="button"
                  className="btn btn-default no-shadow bordered"
                  onClick={props.createConversation}
                >START A CHAT
                </button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default ChatHistory;
