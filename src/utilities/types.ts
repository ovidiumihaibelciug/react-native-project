export type ChatMessage = {
  user: string;
  id: string;
  time: string;
};

export type ConversationType = {
  id?: string;
  subject: string;
  users: string[];
};
