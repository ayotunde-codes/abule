import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
// import Image from 'next/image'
import io from 'socket.io-client';
import {
  Fn, PopMessage, InputPicker, ToolTipWrapper, SearchBar, InputField,
} from '@abule-common/components';
import Layout from '../../../components/general/Layout';
import { ActivityFrequencies, Utils } from '../../../datastore';
import UserConnectCard from '../../../components/UserConnectCard';
import PageLoader from '../../../components/general/PageLoader';
import ChatB from '../../../components/inbox/ChatB';
import ChatT from '../../../components/inbox/ChatT';

const {
  capitalize, FetchRequest, formatDate, mobileCheck,
} = Fn;

const AttendeeCard = ({ user }) => (
  <div id="user-connect-card">
    <div className="user-connect">
      <div className="user-detail">
        <div className="user-content-detail">
          {/* <a className="image avi">
                        <img src={user.imageUrl} alt="" />
                      </a> */}
          <div className="image avi">
            <img src={user.imageUrl} alt="" />
          </div>

          <div className="user-name-mile">
            <div className="user-name">
              <p className="title">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <p className="distance">
              {/* the searchTribe is for the search for tribe on events in the calendar */}
              <span className="fa fa-map-pin icon" />
              {Number(user.mileAway).toFixed(2)} miles away
            </p>

          </div>
        </div>

        <div className="user-kids">
          {user.kids.map((kid) => (
            <div>
              <p className="kid-name">{kid.firstName} {kid.lastName}</p>
              <span className={`rank-color ${kid.color}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CalendarEventDetail = (props) => {
  const { id } = Router.query;
  const { fetchRequest, settings } = props;
  const { sessionUser } = settings;
  const { userId } = sessionUser;
  const today = new Date();

  const allFriends = sessionUser.friends.all;
  const approvedFriends = sessionUser.friends.approved;

  const arrayVillage = [];
  const arrayVillageIds = [];
  Object.keys(allFriends).forEach((key) => {
    arrayVillage.push(allFriends[key]);
    arrayVillageIds.push(allFriends[key].userId);
  });

  const formatShareVillage = (values) => {
    const Ids = [];
    values.forEach((value) => {
      Ids.push(value.userId);
    });
    return Ids;
  };

  const [state, UpdateState] = useState({

    // ...defaultNewEventTest,
    attendees: [],
    request: 're',
    loading: false,
    kids: [],
    acceptedKids: [],
    kidsError: false,
    acceptedkidsError: false,
    owner: false,
    acceptModal: false,
    message: '',
    chats: [],
    selectedVillage: [],
    showSharePopUp: false,
    deleteModal: false,
    initialSharePopUp: false,
    friendGroups: [],
    allFriends: arrayVillage,
    allFriendsIds: arrayVillageIds,
    selectedTribeShare: [],
    tribeShare: false,
    shareVillage: false,
  });
  const [socket, setSocket] = useState(null);
  const setState = (prop) => {
    UpdateState((prevState) => ({
      ...prevState,
      ...prop,
    }));
  };

  //
  const selectedVillageShare = formatShareVillage(state.selectedVillage);
  // connecting the socket
  useEffect(() => {
    const socket = io(`${process.env.SERVER_URL}/event`, {
      extraHeaders: {
        authorization: `Bearer: ${localStorage.getItem('sessionUserToken')}`,
      },
      /*
    query: {
    }, */
    });
    // setState({
    //   socket,
    // })
    setSocket(socket);
    socket.on('connect', () => {
      console.log('connected');
    });

    // return ()=> socket.close()
  }, [setSocket]);
  //
  useEffect(() => {
    fetchRequest({
      url: `${process.env.REACT_APP_API}/calendar/${id}/messages`,
    }).then((data) => {
      console.log('get me all the messages', data);
      const _data = data;

      setState({
        chats: data,
      });
    })
      .catch((error) => {
        console.log('GOT ULTIMATE ERROR', error);
      });
  }, []);
  const messageEl = useRef(null);
  useEffect(() => {
    if (socket) {
      socket.on('message', (event) => {
        // console.log(event, 'give me the details')
        //  const data = JSON.parse(event)
        //  console.log(data, 'give me the details')
        if (event.eventId === id) {
          console.log(event, 'give me the details for real');
          // setSocket([...socket, data])
          const newChat = state.chats;
          newChat.push(event.data);
          console.log(newChat);
          setState({
            chats: newChat,
          });
        }
      });
    }
  }, [state.chats]);

  //

  useEffect(() => {
    console.log(ActivityFrequencies.data);
    // fetchEventDetail();
    setTimeout(() => {
      fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${id}`,
      }).then((data) => {
        console.log('says We a valid urtytytyty', data);
        const _data = data;

        // const dailyFrequency = ActivityFrequencies.data
        //   .filter((e) => e.title === 'daily');
        //   //
        const participantsIds = [];
        const AllAttendee = [];
        const { participants = [] } = data;
        if (participants.length > 0) {
          participants.forEach((participant) => {
            participantsIds.push(participant.userId);
            console.log(participant.mileAway, 'this is the participant');
            participant = {
              ...participant,
              ...participant.participant,
            };
            delete participant.participant;
            AllAttendee.push(participant);
          });
        }

        setState({
          ...data,
          loading: true,
          owner: sessionUser?.userId === data.userId,
          participantsIds,
          attendees: AllAttendee,
        });
      })
        .catch((error) => {
          console.log('GOT ULTIMATE ERROR', error);
        });
    }, 1000);
  }, []);
  //

  useEffect(() => {
    if (messageEl) {
      if (messageEl.current) {
        messageEl.current.scrollTop = messageEl.current?.scrollHeight;
      }
    }
  }, [state.loading, state.chats]);
  const eventTime = () => (
    <span>
      {state.startHour}:{state.startMinute}
      {state.startPeriod}
    </span>
  );
  const AcceptEvent = async () => {
    const field = {
      kids: state.acceptedKids,
    };
    console.log('why are yo not working', field.kids);

    try {
      const data = await fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${id}/accept`,
        method: 'PATCH',
        body: field,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data, 'this the accepted data');
      const newParticipantsIds = [];
      const AllAttendee = [];
      const { participants } = data;
      if (participants.length > 0) {
        participants.forEach((participant) => {
          newParticipantsIds.push(participant.userId);
          participant = {
            ...participant,
            ...participant.participant,
          };
          delete participant.participant;
          AllAttendee.push(participant);
        });
      }

      console.log(newParticipantsIds);
      // newParticipantsIds.push(userId)
      setState({
        ...data,
        participantsIds: newParticipantsIds,
        attendees: AllAttendee,
        acceptModal: false,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const DeleteEvent = async () => {
    try {
      const data = await fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${id}`,
        method: 'DELETE',
      });
      Router.push(`${props.AppUrl}/calendar`);
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = async () => {
    const { message } = state;
    const field = {
      message,
    };
    try {
      const data = await fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${id}/messages`,
        method: 'POST',
        body: field,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setState({
        message: '',
      });
    } catch (e) {

    }
  };

  //
  // event url
  const eventURL = `${process.env.FULL_APP_URL}/calendar/${id}`;
  const shareMessage = (
    `Hi
I think you should check out this event on Abule
${eventURL}`
  );
  const shareOptions = [
    {
      label: 'Social Media',
      options: [
        {
          label: 'facebook',
          icon: 'fa fa-facebook',
          onClick: () => {
            if (window.FB) {
              window.FB.ui({
                display: 'popup',
                method: 'share',
                href: eventURL,
                quote: shareMessage,
              }, (response) => {
                console.log('response gotten', response);
              });
            }
          },
        },
        {
          label: 'twitter',
          icon: 'fa fa-twitter',
          onClick: () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'linkedIn',
          icon: 'fa fa-linkedin',
          onClick: () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${eventURL}`);
          },
        },
      ],
    },
    {
      label: 'Messaging & Email',
      options: [
        {
          label: 'email',
          icon: 'fa fa-envelope',
          onClick: () => {
            window.open(`mailto:?subject=Check%20out%20this%20activity%20on%20Abulé&body=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'whatsapp',
          icon: 'fa fa-whatsapp',
          onClick: () => {
            if (mobileCheck()) {
              window.open(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
            } else {
              window.open(`https://web.whatsapp.com://send?text=${encodeURIComponent(shareMessage)}`);
            }
          },
        },
        {
          label: 'SMS',
          icon: 'fa fa-comment-o',
          onClick: () => {
            window.open(`sms:&body=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'messager',
          icon: 'fa fa-comment-o',
          onClick: () => {
            if (window.FB) {
              window.FB.ui({
                display: 'popup',
                method: 'send',
                link: eventURL,
                quote: shareMessage,
              }, (response) => {
                console.log('response gotten', response);
              });
            }
          },
        },
      ],
    },
  ];

  const TheAccordion = ({
    title, body, show, toggleShow,
  }) => (
    <div>
      <div
        className="accord-header"
        onClick={() => {
          console.log('woop');
          toggleShow(!show);
        }}
      >
        <div className="acc-title">{title}</div>
        {show ? <span>-</span> : <span>+</span>}
      </div>
      <div className={`acc-body ${show ? 'acc-open' : 'acc-closed'}`}>
        <div>{body}</div>
      </div>
    </div>
  );
  const toggleFriendGroupShow = (groupId) => {
    const friendGroups = [...state.friendGroups];
    for (let i = 0; i < friendGroups.length; i += 1) {
      const group = friendGroups[i];
      console.log('group vs groupId', {
        groupId,
        id: group.id,
      });
      if (group.id === groupId) {
        console.log('before', friendGroups[i]);
        friendGroups[i].show = !friendGroups[i].show;
        console.log('after', friendGroups[i]);
        break;
      }
    }

    setState({
      friendGroups,
    });
  };

  const sendToTribe = async (selected) => {
    const { selectedTribeShare } = state;
    const fields = {
      attendees: selected === 'tribe' ? selectedTribeShare : selectedVillageShare,
    };
    try {
      const share = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${iD}/share`,
        method: 'POST',
        // method: editEvent ? "PATCH" : "POST",
        body: fields,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setState({
        tribeShare: false,
        shareVillage: false,
        showSharePopUp: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const newStartDate = new Date(state.startDate);
  const newEndDate = new Date(state.endDate);
  const { friendGroups, selectedDate } = state;
  const oneTimeFrequencyId = 'f9959324-3df1-4e8e-9594-e0602ac9f1cd';
  const orderConversation = (conversations) => {
    const lastMessageTime = (conv) =>
      // const { conversation } = conv;
      // if (conversation.length) {
      // convert to seconds
      new Date((conv.updatedAt)).getTime() / 1000
      // }

      // return 0;
      ;
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
  };
  // const chats = orderConversation(state.chats)
  const timeFormat = (snd) => new Date(snd).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
  return (
    <Layout {...props}>

      {state.loading ? (
        <div id="calendarEventDetails" className="page-container orient">
          <div className="event-details">
            <div className="page-header">
              {/* <div className="full-width"> */}
              <h1 className="title">
                <p>Event details</p>
              </h1>
              {!state.participantsIds.includes(userId) && !state.owner && (
                <div className="accept-or-decline">
                  <button
                    className="btn btn-1"
                    onClick={() => {
                      setState({
                        acceptModal: true,
                      });
                    }}
                  >Accept
                  </button>
                  <button className="btn btn-default " onClick={() => { }}>Decline</button>
                </div>
              )}
              {/* </div> */}
            </div>
            <div className="event-detail">
              <div className="title-call-to-action">
                <p className="event-title">{state.title}</p>
                <div className="call-to-actions">
                  <img src="/images/edit.svg" alt="" onClick={() => { }} />
                  <img
                    src="/images/delete.svg"
                    onClick={() => {
                      setState({
                        deleteModal: true,
                      });
                    }}
                    alt=""
                  />
                  <img
                    src="/images/share.svg"
                    alt=""
                    onClick={() => {
                      setState({
                        initialSharePopUp: true,
                      });
                    }}
                  />
                </div>
              </div>
              {state.frequency === oneTimeFrequencyId ? (
                <div className="event-date-time">
                  <div className="event-date ">{state.date}</div>
                  <div className="event-time">{eventTime()}</div>
                </div>
              ) : (
                <div className="event-date-time">
                  <div className="event-date ">{formatDate(newStartDate)}</div>
                  <div className="event-time">{formatDate(newEndDate)}</div>
                </div>
              )}              {/* amount of time it would occur */}
              <div className="occurance">
                {ActivityFrequencies.data
                  .filter((e) => e.id === state.frequency)
                  .map((freq) => {
                    console.log(freq, 'frequency');
                    return <span className="frequency">{freq.description}</span>;
                  })}
              </div>
              {/* location section */}
              <div className="location">
                <div className="location-title">LOCATION</div>
                <div className="location-details">
                  {state.streetAddress}
                </div>
              </div>
              {/* event description */}
              <div className="event-description">
                <div className="description-title">DESCRIPTION</div>
                <div className="description-content">
                  {state.description}
                </div>
              </div>
              {/* attendee */}
              <div className="event-attendee">
                {/* <div className="attendee-title">Attendee in my tribes</div> */}
                <h1 className="title">
                  <p>Attendee in my tribes</p>
                </h1>
                <div className="attendee-case">{
                  state.attendees.map((attendee) => (
                    <AttendeeCard
                      user={attendee}
                    />
                  ))
                }
                </div>
              </div>
              <div className="handle-chat">
                <img
                  src="/images/message.svg"
                  alt=""
                  srcSet=""
                  onClick={() => {
                    Router.push(`${props.AppUrl}/calendar/${id}/chat`);
                  }}
                />
              </div>
            </div>

          </div>
          {/* the details */}
          <div className="event-chats">
            {/* <Chat {...props} /> */}
            <div className="chat-case">
              <div className="chat-header">
                Let’s chat
              </div>

              <div className="chat" ref={messageEl} id="parentDiv">
                {
                  state.chats.map((chat) =>
                  // let newChat = {}

                  (
                    <div className="message">
                      <div className={` ${chat.sender.userId !== userId ? 'message-case' : 'row-reverse'}`}>
                        <div className="chat-message">
                          <div className={`left ${chat.sender.userId !== userId ? '' : 'row-reverse atf'}`}>
                            <div className="image avi">
                              {/* <span className="icon-user default-image" /> */}
                              <img src={chat.sender.imageUrl} alt="" />
                            </div>

                            {/* <ChatBubbleTip /> */}
                            {chat.sender.userId !== userId ? <ChatB classId="chatBtip" /> : <ChatT classId="chatTtip" />}
                            <div className={`${chat.sender.userId !== userId ? 'chat-bubble' : 'chat-bubble-t'}`}>

                              <div className="text">
                                {/* {chat.message} */}
                                {/* weell it is confusing to
                                  weell it is confusing to see the extent explain */}

                                {chat.message}
                              </div>
                              <div className={`${chat.sender.userId !== userId ? 'time' : 'time-t'}`}>
                                {timeFormat(chat.updatedAt)}
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="message-send">
                <div className="chating">
                  <div className="send-img-case">
                    <img src="/images/gallery.svg" alt="" />
                    <img src="/images/video.svg" alt="" />
                    <div>GIF</div>
                    {/* <img src='/images/GIF.svg' alt=''/> */}
                  </div>
                  <InputField
                    type="text"

                    placeholder="Type a message"
                    value={state.message}
                    // className={`${state.cardNumber !== false ? ' error' : ''}`}
                    // onLoad={(e) => {
                    //   if (e) {
                    //     this.fields.cardNumber = e.inputBox;
                    //   }
                    // }}
                    onChange={(value) => {
                      setState({
                        message: value,
                      });
                    }}
                  />
                </div>
                <button onClick={() => {
                  sendMessage();
                }}
                >
                  <img src="/images/send.svg" alt="" />
                </button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div id="calendarEventDetails" className="page-container">
          <div className="page-header">
            {/* <div className="full-width"> */}
            <h1 className="title">
              <p>Event details</p>
            </h1>
          </div>
          <PageLoader inline />
        </div>
      )}
      {/* accept model */}
      <PopMessage
        show={state.acceptModal}
        message={(
          <div id="acceptModal">
            <div className="pop-message">
              <p className="title">Need to tag your kid(s)?</p>
              <div className="kids-case">
                <InputPicker
                  values={state.acceptedKids}
                  options={sessionUser.kids.map((kid) => ({
                    label: capitalize(kid.preferredName),
                    value: kid.id,
                  }))}
                  onChange={(values) => {
                    setState({
                      acceptedKids: values,
                      acceptedkidsError: false,
                    });
                  }}
                />
              </div>

            </div>
          </div>
        )}
        confirmButton={{
          show: true,
          label: 'SAVE',
          onClick: () => {
            AcceptEvent();
          },
        }}
        cancelButton={{
          show: true,
          label: 'CANCELL',
        }}
        onCancel={() => {
          // const { props, state } = this;
          // onClose();
          setState({
            acceptModal: false,
          });
        }}
      />
      {/* popUp share */}

      {/* start point */}
      <PopMessage
        show={state.initialSharePopUp}
        style={{ zIndex: '3' }}
        mainStyle={{ zIndex: '3' }}
        message={(
          <div id="shareEvent">
            <p className="title">Share this event with:</p>
            <div className="tribe-village-share container">
              <button
                type="button"
                className="btn  btn-2"
                onClick={() => {
                  setState({
                    tribeShare: true,
                    friendGroups: [
                      ...approvedFriends.groups.map((group) => ({
                        ...group,
                        members: group.members.map(
                          (userId) => allFriends[userId],
                        ),
                        show: false,
                      })),
                      ...(approvedFriends.unassigned.length > 0
                        ? [
                          {
                            id: 'unassigned',
                            name: 'unassigned',
                            members: approvedFriends.unassigned.map(
                              (userId) => allFriends[userId],
                            ),
                            show: false,
                          },
                        ]
                        : []),
                    ],
                    initialSharePopUp: false,
                  });
                }}
              >
                TRIBE
              </button>
              <button
                className="btn  btn-1"
                onClick={() => {
                  setState({
                    shareVillage: true,
                    initialSharePopUp: false,
                  });
                }}
              >VILLAGE
              </button>
            </div>
          </div>
        )}
        confirmButton={{
          // label: "TRIBE",

          // onclick: async () => {

          // },
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          // const { props, state } = this;
          setState({
            initialSharePopUp: false,
          });
          // onClose();
        }}
      />
      {/* tribeshare popUp */}
      <PopMessage
        show={state.tribeShare}
        message={(
          <div id="shareToTribe">
            <div className="pop-message">
              <p className="title">Select tribe</p>
              <div className="search-case">
                <SearchBar />
              </div>
              <div className="tribe-case">
                {friendGroups.map((group) => {
                  const newArray = [];
                  group.members.forEach((e) => {
                    newArray.push(e.id);
                  });
                  return (
                    <div>
                      <TheAccordion
                        title={group.name}
                        show={group.show}
                        toggleShow={() => toggleFriendGroupShow(group.id)}
                        body={(
                          <div className="userConnect-wrap">
                            <div className="all-selection">
                              <div
                                className="select-all nav-link"
                                onClick={(e) => {
                                  // e.preventDefault();
                                  setSelectedTribe(newArray);
                                  setState({
                                    selectedTribeShare: newArray,
                                  });
                                }}
                              >
                                Select All
                              </div>
                              <div
                                className="unselect-all nav-link"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setState({
                                    selectedTribeShare: [],
                                  });
                                }}
                              >
                                Unselect All
                              </div>
                            </div>
                            {group.members.map((tribeMember) => (
                              <UserConnectCard
                                viewType="flat"
                                // type={groupType}
                                // as={!group.name ? 'unassigned' : ''}
                                user={tribeMember}
                                onClick={() => {
                                  console.log('raining');
                                  if (
                                    state.selectedTribeShare.includes(
                                      tribeMember
                                        .userId
                                      ,
                                    )
                                  ) {
                                    // alert("entered");
                                    const testArray = state.selectedTribeShare.filter(
                                      (e) => e !== tribeMember
                                        .userId
                                      ,
                                    );
                                    setState({
                                      selectedTribeShare: testArray,
                                    });
                                    // setSelectedTribe(testArray);
                                  } else {
                                    const testArray = state.selectedTribeShare;
                                    testArray.push(tribeMember
                                      .userId);
                                    setState({
                                      selectedTribeShare: testArray,
                                    });
                                  }
                                }}
                                // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                                // type={groupType}
                                // as={!group.name ? 'unassigned' : ''}
                                // user={user}
                                searchTribe
                                selected={state.selectedTribeShare.includes(
                                  tribeMember.userId,
                                )}
                                groupId={group.id || ''}
                              />
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {state.selectedTribeShare.length > 0 && (
              <div className="float-btn-case">
                <button
                  type="button"
                  className="action btn btn-black btn-1"
                  onClick={async () => {
                    await sendToTribe('tribe');
                  }}
                >Send
                </button>
              </div>
            )}
          </div>
        )}
        confirmButton={{
          // label: "TRIBE",
          // onclick: async () => {
          //   try {
          //     await sendToTribe();
          //   } catch (e) {
          //     console.log(e);
          //   }
          // },
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          // const { props, state } = this;
          // onClose();
          setState({
            tribeShare: false,
          });
        }}
      />

      {/* share to village */}
      <PopMessage
        show={state.shareVillage}
        message={(
          <div id="shareToTribe">
            <div className="pop-message">
              <p className="title">Select from village</p>
              <div className="search-case">
                <SearchBar />
              </div>
              <div className="tribe-case">
                {state.selectedVillage.length > 0 && (<p className="sub-title">Selected</p>)}
                {state.selectedVillage.map((user) => (
                  <div>
                    <UserConnectCard
                      viewType="flat"
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      user={user}
                      onClick={() => {
                        const newArray = state.selectedVillage.filter((friend) => friend.userId !== user.userId);
                        setState({
                          allFriends: [...state.allFriends, user],
                          selectedVillage: newArray,
                        });
                      }}
                      // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      // user={user}
                      searchTribe
                      selected
                    />
                  </div>
                ))}
              </div>
              <div className="tribe-case">
                {state.allFriends.length > 0 && <p className="sub-title">Select from village</p>}
                {state.allFriends.map((user) => (
                  <div>
                    <UserConnectCard
                      viewType="flat"
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      user={user}
                      onClick={() => {
                        const newArray = state.allFriends.filter((friend) => friend.userId !== user.userId);
                        setState({
                          selectedVillage: [...state.selectedVillage, user],
                          allFriends: newArray,
                        });
                      }}
                      // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      // user={user}
                      searchTribe
                    />
                  </div>
                ))}
              </div>
            </div>
            {state.selectedVillage.length > 0 && (
              <div className="float-btn-case">
                <button
                  type="button"
                  className="action btn btn-black btn-1"
                  onClick={async () => {
                    await sendToTribe('village');
                    // setState({
                    //   showSharePopUp: true,
                    // });
                  }}
                >Send
                </button>
              </div>
            )}
          </div>
        )}
        confirmButton={{
          // label: "TRIBE",
          // onclick: async () => {
          //   try {
          //     await sendToTribe();
          //   } catch (e) {
          //     console.log(e);
          //   }
          // },
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          // const { props, state } = this;
          // onClose();
          setState({
            shareVillage: false,
          });
        }}
      />
      {/*  */}
      <PopMessage
        show={state.showSharePopUp}
        // style={{ zIndex: '2' }}
        message={(
          <div id="showActivity">
            <p className="title">Share with people outside your village</p>
            <div className="content">

              {shareOptions.map((group) => (

                <div className="group">
                  <div className="group-title">
                    <div className="label">{group.label}</div>
                    <span className="ruler" />
                  </div>
                  <div className="group-content">
                    {group.options.map((type) => (
                      <div
                        className="media-type"
                        onClick={() => {
                          if (type.onClick) {
                            type.onClick();
                          }
                        }}
                      >
                        <span className={`icon ${type.icon} ${type.label}`} />
                        <span className="name">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="group">
                <div className="group-title">
                  <div className="label">Copy Link</div>
                  <span className="ruler" />
                </div>
                <div className="group-content single">
                  <div className="link-copier">
                    <input
                      readOnly
                      id="copyUrl"
                      value={eventURL}
                    />
                    <ToolTipWrapper
                      showToolTip={state.showCopiedMessage}
                      message="Copied!"
                    >
                      <abbr
                        title="copy to clipboard"
                        onClick={() => {
                          const link = document.getElementById('copyUrl');
                          link.select();
                          document.execCommand('copy');
                          this.showCopiedMessage();
                        }}
                      >
                        <button type="button">copy</button>
                      </abbr>
                    </ToolTipWrapper>

                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        )}
        confirmButton={{
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          setState({
            showSharePopUp: false,
          });
        }}
      />
      <PopMessage
        show={state.deleteModal}
        message={(
          <div id="deleteModal">
            <div className="delete">
              <p className="title">Are you sure you want to delete this event from your calendar?</p>

            </div>
          </div>
        )}
        confirmButton={{
          show: true,
          label: 'YES',
          onClick: () => {
            DeleteEvent();
          },
        }}
        cancelButton={{
          show: true,
          label: 'NO',
        }}
        onCancel={() => {
          // const { props, state } = this;
          // onClose();
          setState({
            deleteModal: false,
          });
        }}
      />
    </Layout>
  );
};

export default CalendarEventDetail;
