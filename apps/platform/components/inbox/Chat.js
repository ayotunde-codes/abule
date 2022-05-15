import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import { updateFooter, updateHeader } from '../../redux/settings/action';
import SwitchPage from '../SwitchPage';
import ChatNotification from './ChatNotification';
import Composer from './Composer';
import Message from './Message';

const {
  getRelativeTime, popAlert,
} = Fn;

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.callOptionsDropdown = null;
  }

  componentDidUpdate() {
    const { props } = this;
    const { screen, header } = props.settings;
    if (screen.width <= process.env.MOBILE_BREAKPOINT && header.show) {
      props.updateHeader({
        show: false,
        height: 0,
        marginBottom: 0,
      });
      props.updateFooter({
        show: false,
      });
    }
  }

  componentWillUnmount() {
    const { props } = this;
    const { screen } = props.settings;
    props.updateHeader({
      show: true,
    });
    props.updateFooter({
      show: true,
    });
  }

  startCall() {
    const { state, props } = this;
    const { recipient } = props;

    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/barter/my-requests/all/${barterRequest.id}/meeting`,
      method: 'POST',
    }).then((data) => {
      /* this.setState({
          windowOpen: `/meeting/${data.meetingId}`,
        }); */
      Router.push(`${props.AppUrl}/meeting/[id]`, `${props.AppUrl}/meeting/${data.meetingId}`);
    }).catch((erroRes) => {
      popAlert({
        title: "Couldn't start this meeting",
        description: 'please try again',
        error: true,
      });
    });
  }

  render() {
    const { state, props } = this;
    const { conversations } = props.inbox;
    const { recipient } = props;
    console.log('AAAAA', recipient);

    let chat = {};
    for (const Achat of conversations) {
      if (recipient
        && ((recipient.participants && Achat.chatGroup && Achat.chatGroup.id === recipient.id)
          || !recipient.participants && Achat && recipient.userId === Achat.recieverId)) {
        const recipientsObj = {
          firstName: Achat.recieverFirstName,
          lastName: Achat.recieverLastName,
          imageUrl: Achat.recieverImage,
          userId: Achat.recieverId,
          pending: Achat.pending,
          ignore: Achat.ignore,
          conversation: Achat.conversation,
          createdAt: Achat.createdAt,
          updatedAt: Achat.updatedAt,
        };
        chat = recipientsObj;
        // chat = Achat;
        break;
      }
    }
    return (
      <div className="chat-block">
        <div className="chat-main-content">
          {recipient ? (
            <>
              <div className="chat-head">
                {/* <span className="icon-user default-image" /> */}
                <SwitchPage
                  direction="left"
                  className=""
                  onClick={() => {
                    Router.back();
                  }}
                />
                <div className="image avi">
                  <img src={!recipient.participants ? chat.imageUrl : '/icons/users.svg'} alt="" />
                </div>
                <div className="about">
                  <p className="title">
                    {
                      !recipient.participants ? `${recipient.firstName} ${recipient.lastName}`
                        : (
                          <>
                            {
                              recipient.name || recipient.participants.map(({ user }) => `${user.firstName} ${user.lastName}`).join(', ')
                            }
                          </>
                        )
                    }
                  </p>
                  {/* <p className="participants"> name,  of other, user dskjb skdjb  kjads kjds jksdkj ksdj jksdkj bsdlkjn sdlkb sdkjb ksdkjb  dskjkskdjbkj sdjkbkjskj  skjbs </p> */}
                </div>

                {/* <div className="actions">
                  <Dropdown
                    onLoad={(e) => {
                      this.callOptionsDropdown = e;
                    }}
                    defaultPosition={{ x: 'right' }}
                    controller={<span className="action call icon-hmv-phone" />}
                    content={(
                      <div id="callOptions" className="">
                        <div className="content">
                          <a
                            href="tel:09067677842"
                            className="item"
                            onClick={() => {
                              this.callOptionsDropdown.hideDropdown();
                            }}
                          >
                            Mobile
                          </a>
                          <div
                            className="item"
                            onClick={() => {
                              this.callOptionsDropdown.hideDropdown();
                              this.startCall();
                            }}
                          >
                            Wifi
                          </div>
                        </div>
                      </div>
                    )}
                    onClose={() => {
                      /* this.setState({
                        contentType: 'actions',
                      });
                      props.onClose(); *-/
                    }}
                  />
                </div> */}

              </div>

              <div className="chat-body">
                <ChatNotification />
                {chat.conversation.map((ch, i) => {
                  const chDate = new Date(ch.updatedAt);
                  if (ch) {
                    let showDateMark = true;
                    if (i > 0) {
                      const prevCh = chat.conversation[i - 1];
                      const prevChDate = new Date(prevCh.updatedAt);
                      if (
                        prevChDate.getFullYear() === chDate.getFullYear()
                        && prevChDate.getMonth() === chDate.getMonth()
                        && prevChDate.getDate() === chDate.getDate()
                      ) {
                        showDateMark = false;
                      } else {
                        console.log({ chDate, prevChDate });
                      }
                    }

                    return (
                      <>
                        {showDateMark && (
                          <div className="chat-date-mark">
                            <div className="date">{getRelativeTime(chDate, true, 'date-text')}</div>
                          </div>
                        )}
                        <Message
                          {...props}
                          chat={ch}
                        />
                      </>
                    );
                  }
                  return '';
                })}
              </div>
              <Composer {...props} />
            </>
          ) : (
            <div className="empty-msg">
              <h5 className="placeholder">You don’t have a message selected </h5>
              <p className="placeholder">Choose one from your existing messages, or start a new one.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  updateFooter: (props) => dispatch(updateFooter(props)),
});
export default connect(null, mapDispatchToProps)(Chat);
