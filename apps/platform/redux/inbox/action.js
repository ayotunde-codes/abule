export const actionTypes = {
  INBOX_SET_CONVERSATIONS: 'INBOX_SET_CONVERSATIONS',
  INBOX_ADD_CHAT_TO_CONVERSATION: 'INBOX_ADD_CHAT_TO_CONVERSATION',
  INBOX_CREATE_NEW_CONVERSATION: 'INBOX_CREATE_NEW_CONVERSATION',
  INBOX_ADD_CHAT_TO_CURRENT_CONVERSATION: 'INBOX_ADD_CHAT_TO_CURRENT_CONVERSATION',
  INBOX_SET_CURRENT_CONVERSATION_RECIPIENT: 'INBOX_SET_CURRENT_CONVERSATION_RECIPIENT',
  INBOX_UPDATE_CURRENT_CONVERSATION_RECIPIENT: 'INBOX_UPDATE_CURRENT_CONVERSATION_RECIPIENT',
  INBOX_UPDATE_CURRENT_CONVERSATION_CHAT: 'INBOX_UPDATE_CURRENT_CONVERSATION_CHAT',
  INBOX_UPDATE_LOADING_CONVERSATION: 'INBOX_UPDATE_LOADING_CONVERSATION',
  INBOX_UPDATE_LOADING_CHAT: 'INBOX_UPDATE_LOADING_CHAT',
};

export const setConversations = (conversations) => ({
  conversations,
  type: actionTypes.INBOX_SET_CONVERSATIONS,
});
export const createNewConversation = (conversation) => ({
  conversation,
  type: actionTypes.INBOX_CREATE_NEW_CONVERSATION,
});
export const setCurrentConversationRecipient = (recipient) => ({
  recipient,
  type: actionTypes.INBOX_SET_CURRENT_CONVERSATION_RECIPIENT,
});
export const updateCurrentConversationRecipient = (props) => ({
  props,
  type: actionTypes.INBOX_UPDATE_CURRENT_CONVERSATION_RECIPIENT,
});
export const addChatToCurrentConversation = (recipient, message) => ({
  recipient,
  message,
  type: actionTypes.INBOX_ADD_CHAT_TO_CURRENT_CONVERSATION,
});
export const addChatToConversation = (recipient, message) => ({
  recipient,
  message,
  type: actionTypes.INBOX_ADD_CHAT_TO_CONVERSATION,
});
export const updateCurrentConversationChat = (id, props) => ({
  id,
  props,
  type: actionTypes.INBOX_UPDATE_CURRENT_CONVERSATION_CHAT,
});
export const updateLoadingConversation = (value) => ({
  value,
  type: actionTypes.INBOX_UPDATE_LOADING_CONVERSATION,
});
export const updateLoadingChat = (value) => ({
  value,
  type: actionTypes.INBOX_UPDATE_LOADING_CHAT,
});
