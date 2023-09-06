import axios from 'axios';

export const loginUser = async (data: any) => {
  return await axios.post('/users/login', data);
};

export const createChat = async () => {
  return await axios.post('/chats');
};

export const getChatMessages = async (chatId: string) => {
  if (!chatId) {
    return null;
  }

  return await axios.get(`/chats/${chatId}/messages`);
};

export const sendMessage = async ({chatId, data}: any) => {
  if (!chatId) {
    return null;
  }

  return await axios.post(`/chats/${chatId}/messages`, data);
};

export const getUserFeed = (userId: string) => {
  return axios.get(`/chats/${userId}`);
};
