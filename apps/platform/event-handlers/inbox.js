import { addChatToConversation } from '../redux/inbox/action';

const newMessage = async (data, dispatchEvent) => {
  console.log('the new message gotten is : ', data);
  const { chat } = data;
  dispatchEvent(addChatToConversation(chat.chatGroup || chat.sender, chat));
};

const newChatGroup = async (data, dispatchEvent) => {
  console.log('the new chat group gotten is : ', dispatchEvent, data);
  const { chatGroup } = data;

  dispatchEvent(addChatToConversation(chatGroup));
};

export default {
  topic: 'inbox',
  handler: (data, dispatchEvent) => {
    switch (data.event || '') {
      case ('new-message'): {
        newMessage(data, dispatchEvent);
        break;
      }
      case ('new-chat-group'): {
        newChatGroup(data, dispatchEvent);
        break;
      }
      default: break;
    }
  },
};
