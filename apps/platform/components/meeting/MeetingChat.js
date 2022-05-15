/* eslint-disable class-methods-use-this */
import React from 'react';
import $ from 'jquery';
import { AsyncScheduler, DataMessage } from 'amazon-chime-sdk-js';
import ChatBubble from '../ChatBubble';
import Composer from '../Composer';
import SwitchPage from '../SwitchPage';
// import { range } from "moment-range";

class MeetingChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this.DATA_MESSAGE_TOPIC = 'chat';
    this.DATA_MESSAGE_LIFETIME_MS = 300000;
    this.chatsContainer = null;
    this.inputDate = null;
    this.dropdown = null;
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidUpdate() {
    const { props } = this;
    if (props.chatsScrollToBottom && this.chatsContainer) {
      this.chatsContainer.scrollTop = this.chatsContainer.offsetHeight;
      props.resetChatsScrollToBottom();
    }
  }

  sendMessage(message) {
    const { props } = this;
    new AsyncScheduler().start(() => {
      props.audioVideo.realtimeSendDataMessage(this.DATA_MESSAGE_TOPIC, message, this.DATA_MESSAGE_LIFETIME_MS);
      // echo the message to the handler
      props.dataMessageHandler(new DataMessage(
        Date.now(),
        this.DATA_MESSAGE_TOPIC,
        new TextEncoder().encode(message),
        props.meetingSession.configuration.credentials.attendeeId,
        props.meetingSession.configuration.credentials.externalUserId,
      ));
    });
  }

  render() {
    const { state, props } = this;
    const { participants, roster, chatsNewMessages } = props;
    const attendeeIds = Object.keys(roster);

    if (chatsNewMessages > 0) {
      // alert('seen the new message');
      props.resetChatsNewMessages();
    }

    return (
      <div
        id="ongoingMeetingChat"
        className=""
        ref={(e) => {
          props.onLoad(e);
        }}
      >
        <div className="head">
          <SwitchPage
            label=""
            className="go-back"
            direction="left"
            onClick={() => { props.hideChats(); }}
          />
          <p>Chat</p>
          <SwitchPage
            label=""
            direction="left"
            onClick={() => { }}
          />
        </div>
        <div
          className="content"
          ref={(e) => {
            if (e && !this.chatsContainer) {
              this.chatsContainer = e;
            }
          }}
        >
          <div className="chats">
            {props.chats.map((chat) => {
              const user = {};
              if (!participants[chat.senderExternalUserId]) {
                console.log('chat error', {
                  participants,
                  chat,
                });
                alert('found chat error');
              }
              return (
                <ChatBubble
                  isUser={chat.senderAttendeeId === props.meetingSession.configuration.credentials.attendeeId}
                  chat={{
                    message: chat.text(),
                    createdAt: chat.timestampMs,
                    medias: [],
                  }}
                  sender={participants[chat.senderExternalUserId]}
                />

              );
            })}
          </div>
        </div>
        <div className="composer">
          <Composer
            onSend={this.sendMessage}
            actions={false}
          />
        </div>
      </div>
    );
  }
}

MeetingChat.defaultProps = {
  values: [],
  participants: {},
  autoClose: false,
  showControls: true,
  onSave: () => { },
  onClose: () => { },
  onLoad: () => { },
  multichoice: false,
  readOnly: false,
  controller: 'controller',
};

export default MeetingChat;
