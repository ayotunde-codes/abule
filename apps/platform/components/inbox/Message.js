import React from 'react';
import ChatBubble from '../ChatBubble';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.getSender = this.getSender.bind(this);
  }

  getSender(senderId) {
    const { props } = this;
    const { inbox, settings } = props;
    const { sessionUser } = settings;
    // when its session user
    if (sessionUser.userId === senderId) {
      return sessionUser;
    }

    // when its anyother user (in a one-to-one chat)
    const { recipient } = props;
    if (recipient.userId) {
      return recipient;
    }

    // when its anyother user (in a group chat)
    const { participants } = recipient;

    for (const p of participants) {
      if (p.user.userId === senderId) return p.user;
    }
  }

  render() {
    const { state, props } = this;
    const { chat, settings } = props;
    const { sessionUser } = settings;
    const isUser = sessionUser.userId === chat.sender?.userId;
    const messageLines = chat.message.split('\n');
    if (!chat) return '';
    // const sender = this.getSender(chat.senderId);
    const sender = this.getSender(chat.sender?.userId);

    const mediasLenegth = chat.medias.length;
    const prevMedias = [];

    for (let i = 0; i < chat.medias.length; i++) {
      if (i > 3) break;
      else prevMedias.push(chat.medias[i]);
    }

    return (
      <>
        <ChatBubble
          chat={chat}
          sender={sender}
          isUser={isUser}
        />

      </>
    );
  }
}

export default Message;
