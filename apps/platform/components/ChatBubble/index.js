import React from 'react';
import { connect } from 'react-redux';
import ChatBubbleTip from '../inbox/ChatBubbleTip';
import {
  setItems as setGallery, hideGallery,
} from '../../redux/gallery/action';
import ChatB from '../inbox/ChatB';
import ChatT from '../inbox/ChatT';

class ChatBubble extends React.Component {
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
    const { chat, sender, isUser } = props;
    const messageLines = chat.message.split('\n');
    if (!chat) return '';
    // const sender = this.getSender(chat.senderId);

    const mediasLenegth = chat.medias.length;
    const prevMedias = [];

    for (let i = 0; i < chat.medias.length; i++) {
      if (i > 3) break;
      else prevMedias.push(chat.medias[i]);
    }
    const timeFormat = (snd) => new Date(snd).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });

    return (

      // <div className={`chat-message ${isUser ? 'is-user' : ''}`}>
      //   <div className="left">
      //     {/*  <div className="image avi">
      //       <span className="icon-user default-image" />
      //       <img src={sender.imageThumbUrl} alt="" />
      //     </div> */}

      //     <ChatBubbleTip />
      //   </div>

      //   <div className="right">
      //     {props.showName && (
      //       <div className="top">
      //         <span>{props.isUser ? 'you' : `${sender.firstName} ${sender.lastName}`}</span>
      //       </div>
      //     )}

      //     <div className="bottom">
      //       <div className="message">
      //         {chat.sending
      //           ? <p className="icon-clock time" />
      //           : <p className="time">{getRelativeTime(chat.createdAt)}</p>}
      //         <div className="content">
      //           {chat.medias.length > 0 && (
      //           <div className={`medias len-${prevMedias.length}`}>
      //             {prevMedias.map((media, i) => {
      //               let ext = '';
      //               if (media.file) {
      //                 [, ext] = media.file.type.split('/');
      //               } else {
      //                 ext = media.url.split('.');
      //                 ext = ext[ext.length - 1];
      //               }
      //               return (
      //                 <div
      //                   className="media image"
      //                   onClick={() => {
      //                     props.setGallery(chat.medias, i);
      //                   }}
      //                 >
      //                   {ext === 'mp4' ? <video src={media.url} /> : <img src={media.url} alt="" />}
      //                   {ext === 'mp4' && <span className="icon play icon-play" />}
      //                   {(i === 3 && mediasLenegth - prevMedias.length > 0) && (
      //                   <div className="reminant-count">
      //                     + {mediasLenegth - prevMedias.length}
      //                   </div>
      //                   )}
      //                 </div>
      //               );
      //             })}
      //           </div>
      //           )}
      //           <div className="text">
      //             {
      //               messageLines.map((line, index) => (
      //                 <>
      //                   <span>{line}</span>
      //                   {index > 0 && <br />}
      //                 </>
      //               ))
      //             }
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div className="chat-messages">
        <div className={` ${!isUser ? 'message-case' : 'row-reverse'}`}>
          <div className="chat-message">
            <div className={`left ${!isUser ? '' : 'row-reverse atf'}`}>
              <div className="image avi">
                {/* <span className="icon-user default-image" /> */}
                <img src={chat?.sender?.imageUrl} alt="" />
              </div>

              {/* <ChatBubbleTip /> */}
              {!isUser ? <ChatB classId="chatBtip" /> : <ChatT classId="chatTtip" />}
              <div className={`${!isUser ? 'chat-bubble' : 'chat-bubble-t'}`}>

                {/* <div className="text"> */}
                {/* {chat.message} */}
                {/* weell it is confusing to
                weell it is confusing to see the extent explain */}

                {/* {chat.message} */}
                <div className="content">
                  {chat.medias.length > 0 && (
                    <div className={`medias len-${prevMedias.length}`}>
                      {prevMedias.map((media, i) => {
                        let ext = '';
                        if (media.file) {
                          [, ext] = media.file.type.split('/');
                        } else {
                          ext = media.url.split('.');
                          ext = ext[ext.length - 1];
                        }
                        return (
                          <div
                            className="media image"
                            onClick={() => {
                              props.setGallery(chat.medias, i);
                            }}
                          >
                            {ext === 'mp4' ? <video src={media.url} /> : <img src={media.url} alt="" />}
                            {ext === 'mp4' && <span className="icon play icon-play" />}
                            {(i === 3 && mediasLenegth - prevMedias.length > 0) && (
                              <div className="reminant-count">
                                + {mediasLenegth - prevMedias.length}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="text">
                    {
                      messageLines.map((line, index) => (
                        <>
                          <span>{line}</span>
                          {index > 0 && <br />}
                        </>
                      ))
                    }
                  </div>
                </div>
                {/* </div> */}
                <div className={`${!isUser ? 'time' : 'time-t'}`}>
                  {timeFormat(chat.createdAt)}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

ChatBubble.defaultProps = {
  showName: true,
};
const mapDispatchToProps = (dispatch) => ({
  setGallery: (items, focusedIndex) => dispatch(setGallery(items, focusedIndex)),
});
export default connect(null, mapDispatchToProps)(ChatBubble);
