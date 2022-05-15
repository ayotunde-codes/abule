import { actionTypes } from './action';

export const initState = {
  recipient: {
    id: 'user id',
    firstName: 'user first name',
    lastName: 'user last name',
  } || {
    id: 'participants id',
    displayImage: 'participants image',
    firstName: 'participant first name',
    lastName: 'participant last name',
    participants: [],
  },
  conversations: [
    {
      recipient: {
        id: 'participants id',
        displayImage: 'participants image',
        firstName: 'participant first name',
        lastName: 'participant last name',
      },
      // recieverId: 'fdljdlnljdn',
      chatGroup: {
        id: 'participants id',
        displayImage: 'participants image',
        firstName: 'participant first name',
        lastName: 'participant last name',
        participants: [],
      },
      conversation: [
        {
          id: 'sjsbjkbskjbskj',
          message: 'fkdfhjdhdfdjkd fdkjd kjdbd fjdb vkjvs vkjvjs vskjbv svskjb vskjv vskvjsv vkjsvbs vsvkjv vsskb svjkb svsvkj svskvjb sdvskjv vsvob svsvolb m,vsvkubv wvwsv  svjbsvviub vwsvku',
          senderId: 'fdljnljdn',
          recieverId: 'fdljdlnljdn',
          chatGroupId: 'fdljdlnljdn',
          medias: [
            {
              id: 'fljkndlknd',
              url: 'https://fldjnljndl.dsnjk/dlsn',
              meta: {

              },
            },
          ],
          createdAt: new Date(),
        },
      ],
    },
  ],
  recipient: false,
  conversations: [],
  loadingConversations: true,
  loadingChat: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.INBOX_SET_CONVERSATIONS: {
      return {
        ...state,
        conversations: action.conversations,
        loadingConversations: false,
      };
    }
    case actionTypes.INBOX_SET_CURRENT_CONVERSATION_RECIPIENT: {
      return {
        ...state,
        recipient: action.recipient,
      };
    }
    case actionTypes.INBOX_CREATE_NEW_CONVERSATION: {
      return {
        ...state,
        conversations: [
          ...state.conversations,
          action.conversation,
        ],
      };
    }
    case actionTypes.INBOX_ADD_CHAT_TO_CURRENT_CONVERSATION: {
      const { recipient, conversations } = state;
      let index = -1;
      for (const Achat of conversations) {
        index += 1;
        if (
          (recipient.participants && Achat.chatGroup && Achat.chatGroup.id === recipient.id)
          || !recipient.participants && Achat.recipient && recipient.userId === Achat.recipient.userId) {
          break;
        }
      }

      conversations[index].conversation.push(action.message);

      return {
        ...state,
        conversations,
      };
    }
    case actionTypes.INBOX_ADD_CHAT_TO_CONVERSATION: {
      const { conversations } = state;
      const { recipient } = action;
      let index = -1;
      let foundRecipient = false;
      for (const Achat of conversations) {
        index += 1;
        console.log('comparing the chats ', { Achat, recipient });
        if (
          (Achat.chatGroup && recipient.participants && Achat.chatGroup.id === recipient.id)
          || (Achat.recipient && recipient.userId === Achat.recipient.userId)
        ) {
          foundRecipient = true;
          break;
        }
      }
      if (!foundRecipient) {
        index += 1;
        conversations[index] = {
          chatGroup: recipient.participants ? recipient : null,
          recipient: !recipient.participants ? recipient : null,
          conversation: [],
        };
        console.log('NEW CONVERSATION MY PEOPLE IS : ', conversations[index]);
      }

      if (action.message) {
        conversations[index].conversation.push(action.message);
      }
      return {
        ...state,
        conversations,
      };
    }
    case actionTypes.INBOX_UPDATE_CURRENT_CONVERSATION_RECIPIENT: {
      console.log('mo fa props', action);
      const { recipient, conversations } = state;
      if (recipient) {
        let recipientIndex = -1;
        let conversation = {};
        // this is tricky
        // first get in the current position of the recipient in  conversations
        for (const c of conversations) {
          console.log({
            recipient,
            cRecipient: c,
          });
          recipientIndex += 1;
          if (((c.recipient) || c.chatGroup).id === recipient.id) {
            conversation = c;
            break;
          }
        }

        // now we can delete the old conversation
        conversations.splice(recipientIndex, 1);

        const newRecipient = {
          ...recipient,
          ...action.props,
        };

        conversations.push({
          ...conversation,
          recipient: recipient.userId ? newRecipient : undefined,
          chatGroup: recipient.participants ? newRecipient : undefined,
        });

        return {
          ...state,
          recipient: newRecipient,
          conversations,
        };
      }
      return state;
    }
    case actionTypes.INBOX_UPDATE_CURRENT_CONVERSATION_CHAT: {
      const { recipient, conversations } = state;
      let index = -1;
      for (const Achat of conversations) {
        index += 1;
        if (
          (recipient.participants && Achat.chatGroup && Achat.chatGroup.id === recipient.id)
          || !recipient.participants && Achat.recipient && recipient.userId === Achat.recipient.userId) {
          break;
        }
      }

      const newConversation = conversations[index].conversation.map((chat) => ({
        ...chat,
        ...(chat.id === action.id ? action.props : {}),
      }));

      conversations[index].conversation = newConversation;

      if (state.recipient) {
        return {
          ...state,
          conversations,
        };
      }
      return state;
    }
    case actionTypes.INBOX_UPDATE_LOADING_CONVERSATION: {
      return {
        ...state,
        loadingConversations: action.value,
      };
    }
    case actionTypes.INBOX_UPDATE_LOADING_CHAT: {
      return {
        ...state,
        loadingChat: action.value,
      };
    }
    default:
      return state;
  }
}

export default reducer;
