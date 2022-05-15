import Router from 'next/router';
import React, { useLayoutEffect, useState, useEffect, createRef, useRef } from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
const {
  isDescendant
} = Fn;

import {
  InputSelectUser,
  PopMessage, SearchBar
} from '@abule-common/components';


const ChatList = ({ chatLists, allId, setState, props, currentId }) => {
  const timeFormat = (snd) => new Date(snd).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
  const ef = React.useRef(null)
  console.log(ef)
  const [Rclicked, setRcliked] = React.useState(false)
  // const [ViewChangerDropdown, setViewChangerDropdown] = useState(null);
  // alert('okay')
  // 
  // 
  const chatoi = [
    {
      "id": "4b062374-9145-438f-a98a-3ed3999cc961",
      // "senderId": "928564ee-ef2c-468b-9257-f58cffcc98e8",
      "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
      "pending": false,
      "ignore": true,
      "createdAt": "2022-04-07T04:28:08.370Z",
      "updatedAt": "2022-04-07T05:40:43.162Z",
      "firstName": "ayotunde",
      "lastName": "kemi",
      "imageUrl": "https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/91d80961-3294-47d1-9a01-c352ccbc6e26/profile_image-1647798705115.png",
      "conversation": [
        {
          "id": "6d8b0a5e-c081-484c-a2b8-82f03fe4534e",
          "message": "Hello boss",
          "sender": {
            "id": "daa022df-3f49-4b65-8fb5-8f333a2be9e8",
            "userId": "928564ee-ef2c-468b-9257-f58cffcc98e8",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "reciever": {
            "id": "951c495e-9022-4bb3-8727-93e334059ae4",
            "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "medias": [],
          "updatedAt": "2022-04-07T07:48:22.976Z",
          "createdAt": "2022-04-07T07:48:22.976Z"
        }
      ]
    },
    {
      "id": "4b062374-9145-438f-a98a-3ed3999cc961",
      "userId": "928564ee-ef2c-468b-9257-f58cffcc98e8",
      // "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
      "pending": false,
      "ignore": true,
      "createdAt": "2022-04-07T04:28:08.370Z",
      "updatedAt": "2022-04-07T05:40:43.162Z",
      "firstName": "ayotunde",
      "lastName": "oluwadamilola",
      "imageUrl": "https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/91d80961-3294-47d1-9a01-c352ccbc6e26/profile_image-1647798705115.png",
      "conversation": [
        {
          "id": "6d8b0a5e-c081-484c-a2b8-82f03fe4534e",
          "message": "Hello boss",
          "sender": {
            "id": "daa022df-3f49-4b65-8fb5-8f333a2be9e8",
            "userId": "928564ee-ef2c-468b-9257-f58cffcc98e8",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "reciever": {
            "id": "951c495e-9022-4bb3-8727-93e334059ae4",
            "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "medias": [],
          "updatedAt": "2022-04-07T07:48:22.976Z",
          "createdAt": "2022-04-07T07:48:22.976Z"
        }
      ]
    },
    {
      "id": "4b062374-9145-438f-a98a-3ed3999cc961",
      "userId": "928564ee-ef2c-468b-9257-f58cffcc98e9",
      // "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
      "pending": false,
      "ignore": true,
      "createdAt": "2022-04-07T04:28:08.370Z",
      "updatedAt": "2022-04-07T05:40:43.162Z",
      "firstName": "ayotunde",
      "lastName": "obasa",
      "imageUrl": "https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/91d80961-3294-47d1-9a01-c352ccbc6e26/profile_image-1647798705115.png",
      "conversation": [
        {
          "id": "6d8b0a5e-c081-484c-a2b8-82f03fe4534e",
          "message": "Hello boss",
          "sender": {
            "id": "daa022df-3f49-4b65-8fb5-8f333a2be9e8",
            "userId": "928564ee-ef2c-468b-9257-f58cffcc98e8",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "reciever": {
            "id": "951c495e-9022-4bb3-8727-93e334059ae4",
            "userId": "8513c80f-5414-49ae-8f1f-9199325b0a95",
            "firstName": "",
            "lastName": "",
            "imageUrl": null
          },
          "medias": [],
          "updatedAt": "2022-04-07T07:48:22.976Z",
          "createdAt": "2022-04-07T07:48:22.976Z"
        }
      ]
    }
  ]
  const rightClicked = (event, id) => {
    event.preventDefault()
    // ef.current = index
    setRcliked(true)

    setState({
      allId: [...allId, e.userId]
    })

  }
  React.useEffect(() => {
    if (chatLists && chatLists.length > 0) {
      chatLists.forEach((e, index) => {
        const chat = e
        if (ef && ef.current) {
          if (allId.length < 1) {
            ef.current.children[index].addEventListener("contextmenu", (e) => {
              e.preventDefault()
              setRcliked(true)

              setState({
                allId: [...allId, chat.userId]
              })
            })
            // ef.current.children[index].addEventListener("contextmenu", rightClicked)
          }
        }
      })
    }


    return () => {
      // if (ef && ef.current) {
      // ef.current.removeEventListener("contextmenu", rightClicked);
      // }
      chatLists?.forEach((e, index) => {
        const chat = e
        if (ef && ef.current) {
          if (allId.length > 0) {
            ef.current.children[index].removeEventListener("contextmenu", (e) => {
              e.preventDefault()
              setRcliked(true)

              setState({
                allId: [...allId, chat.userId]
              })
            })
            // ef.current.children[index].addEventListener("contextmenu", rightClicked)
          }
        }
      })
    };
  }, [Rclicked, chatLists])


  return (

    <div className="chat-list" ref={ef}>
      {/* {chatoi?.map((chatList, index) => { */}
      {chatLists?.map((chatList, index) => {
        const chat = chatList;

        const isActive = chatList.userId === currentId


        const checked = allId.includes(chat.userId);
        return (
          <div className={`chatlist-container${isActive ? ' active' : ''}`} >
            {Rclicked && allId.length > 0 && (
              <div className="R-clicked">
                <div className='' onClick={(e) => {
                  e.preventDefault()
                  if (allId.includes(chat.userId)) {
                    const newAllId = allId.filter(id => id !== chat.userId)
                    setState({
                      allId: newAllId
                    })
                  } else {
                    setState({
                      allId: [...allId, chat.userId]
                    })
                  }
                }}
                >
                  {checked && (<img src='/images/checked.svg' alt='' />)}
                </div>
              </div>

            )}
            <div
              className={`chat`}
              onClick={() => {
                Router.push(`${props.AppUrl}/inbox/[id]`, `${props.AppUrl}/inbox/${chat.userId}`)
              }}

            >
              <div className="image-case">
                <div className="image avi">
                  <img src={chat ? chat.imageUrl : '/icons/users.svg'} alt="" />
                </div>
              </div>

              <div className="title">
                <div className="name-conv">
                  <p className='name'>
                    {
                      chat ? `${chat.firstName} ${chat.lastName}`
                        : (
                          <>
                            {
                              chat.chatGroup.name
                              || chat.chatGroup.participants.map(({ user }) => `${user.firstName} ${user.lastName}`).join(', ')
                            }
                          </>
                        )
                    }
                  </p>
                  <p className='conv'>
                    {chat.conversation[chat.conversation.length - 1].message}
                  </p>
                </div>

                <div className="date-notifacation">
                  <div className="time">
                    {timeFormat(chat.conversation[chat.conversation.length - 1].createdAt)}
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })}
    </div>
  )
}

const NavigationBar = (props) => {
  const { inbox, settings } = props;
  const { sessionUser } = settings;
  const { conversations } = inbox;
  // const path = Router.route.split('/');
  const currentId = Router.query.id;
  console.log('THE PATHHHHHH...', currentId)

  // const recipients = []
  // conversations.forEach( conv => {
  //  const res = Object.keys(conv)
  //   const recipientsObj = {
  //     firstName: conv.recieverFirstName,
  //     lastName:  conv.recieverLastName,
  //     imageUrl: conv.recieverImage,
  //     userId:  conv.recieverId,
  //     pending: conv.pending,
  //     ignore: conv.ignore
  //   }
  //   recipients.push(recipientsObj)
  // });
  // console.log('see all the recipients',recipients)

  // const pending = recipients.filter(recipient => recipient.pending)
  // const direct = recipients.filter(recipient => !recipient.pending)

  // console.log('pending', pending, 'direct', direct)
  const [ViewChangerDropdown, setViewChangerDropdown] = useState(null);
  const [state, updateState] = useState({
    // pending: recipients.filter(recipient => recipient.pending),
    // direct: recipients.filter(recipient => !recipient.pending),
    isDirect: false,
    // conversations: [],
    loading: false,
    allId: [],
    showDisplayView: false,
    createConversation: false,
    recipients: [],
    // chats: []
  });
  const setState = (prop) => {
    updateState((prevState) => ({
      ...prevState,
      ...prop,
    }));
  };
  // 

  const showCreateConversation = () => {
    setState({
      createConversation: true,
    });
  }

  const hideCreateConversation = () => {
    setState({
      createConversation: false,
      recipients: [],
    });
  }

  const initializeConversation = async () => {
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
    hideCreateConversation();
  }

  useEffect(() => {
    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/tribe`,
    }).then((data) => {

      console.log('THE TRIBE', data, 'wecome to fame ');
    })
      .catch((error) => {
        // setUser(false);
        console.log('GOT ULTIMATE ERROR', error);
      });
  })

  const DisplayViewDropHandler = (event) => {
    if (
      ViewChangerDropdown
      && !isDescendant(event.target, ViewChangerDropdown)
    ) {
      setState({ showDisplayView: false });
      window.removeEventListener('click', DisplayViewDropHandler, false);
    }
  };
  // 
  const showDisplayViewChanger = () => {
    const { showDisplayView } = state;

    if (!showDisplayView) {
      setState({ showDisplayView: true });
      window.addEventListener('click', DisplayViewDropHandler, false);
    }
  };
  // 

  // 
  useEffect(() => {
    // console.log('ZZZZZZZ',props.conversations)
    const recipients = [];
    conversations.forEach((conv) => {
      const res = Object.keys(conv);
      const recipientsObj = {
        firstName: conv.recieverFirstName,
        lastName: conv.recieverLastName,
        imageUrl: conv.recieverImage,
        userId: conv.recieverId,
        pending: conv.pending,
        ignore: conv.ignore,
        conversation: conv.conversation,
      };
      recipients.push(recipientsObj);
    });
    console.log('see all the recipients', recipients);

    const pending = recipients.filter((recipient) => recipient.pending);
    const direct = recipients.filter((recipient) => !recipient.pending);

    console.log('pending', pending, 'direct', direct);
    setState({
      conversations,
      pending,
      direct,
      chats: state.isDirect ? direct : pending,
      loading: true,
    });
  }, [props]);

  const chats = [
    {
      recipient: {
        imageUrl: 'https://source.unsplash.com/3TLl_97HNJo',
        firstName: 'ayotunde',
        lastName: 'Obasa',
        id: 'edrr',
      },
    },
    {
      recipient: {
        imageUrl: 'https://source.unsplash.com/khV4fTy6-D8',
        firstName: 'tobi',
        lastName: 'Remenu',
        id: 'edx',
      },
    },
  ];

  useEffect(() => {
    setState({
      chats: state.isDirect ? state.direct : state.pending,
    });
  }, [state.isDirect]);

  // console.log('this pending list',pending, 'this is direct', direct)

  return (
    <>
      {!state.loading ? (<div>loading</div>) : (
        <>
          <div className="navigation-case">

            <div className="navigation_header">
              <p className="title">
                {
                  state.isDirect ? 'Direct messages' : 'Pending messages'
                }
              </p>
              <div className="icon-set">
                {/* <span className="icon-archive-add-bold icon" /> */}
                {/* <span className="icon-sort-alpha-asc icon" /> */}
                {state.allId.length > 0 ? (
                  <img src="/images/trash.svg" alt="" srcset="" className='trash' />
                ) : (
                  <div className='icon-wrap'><img src="/images/pluss.svg" alt="" srcset="" onClick={showCreateConversation} /></div>
                )}
                <div ref={(e) => {
                  setViewChangerDropdown(e);
                }}
                  className='drop-cntrl icon-wrap'
                >
                  {/* <span
                className="icon-hmv-nav-line icon "
                onClick={showDisplayViewChanger}  
              /> */}
                  <img src="/images/sort.svg" alt="" srcset="" onClick={showDisplayViewChanger} />
                  <div
                    className={`display-drop-list${state.showDisplayView ? ' show' : ''
                      }`}
                  >
                    <div className="drop-lists">
                      <p
                        className="drop-list"
                        onClick={() => setState({
                          isDirect: true,
                          showDisplayView: false,
                        })}
                      >
                        Direct
                      </p>
                      <p
                        className="drop-list"
                        onClick={() => {
                          setState({
                            isDirect: false,
                            showDisplayView: false,
                          });
                        }}
                      >
                        Pending
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
            <div className="navigation_search">
              <SearchBar
                value={state.searchQuery}
                className="search-bar"
                // onChange={(value) => {
                //   this.setState({
                //     searchQuery: value,
                //   });
                //   if (props.onSearchInput) {
                //     props.onSearchInput(value);
                //   }
                // }}
                onBlur={() => {
                  // this.makeSearch();
                }}
                onEnter={() => {
                  // this.makeSearch();
                }}
              />
            </div>
            <div className="navigation_search-list">

              <ChatList chatLists={state.chats} allId={state.allId} setState={setState} props={props} currentId={currentId} />

            </div>
          </div>
          {state.createConversation && (
            <PopMessage
              rootClassName="inbox-select-recipient"
              show={state.initregistration}
              message={(
                <div id="finHelpPickerUsersPopUp">
                  <p className="title">
                    My tribe
                  </p>
                  <SearchBar />
                  <div className="results">
                    <InputSelectUser
                      // title="Members of your Tribe"
                      // values={state.recipients}
                      users={sessionUser.tribe}
                      // users={[sessionUser.friends.all]}
                      maxSelection={2}
                      onChange={(recipients) => {
                        setState({
                          recipients,
                        });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-1"
                    style={{ margin: '0px auto', marginTop: '2em', width: 'max-content' }}
                    onClick={initializeConversation}
                  >DONE
                  </button>
                </div>
              )}
              confirmButton={{
                show: false,
              }}
              cancelButton={{
                show: false,
              }}
              onCancel={hideCreateConversation}
            />
          )}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createNewConversation: (recipient) => dispatch(createNewConversation(recipient)),
  setConversationRecipient: (recipient) => dispatch(setConversationRecipient(recipient)),
});

export default connect(null, mapDispatchToProps)(NavigationBar);
