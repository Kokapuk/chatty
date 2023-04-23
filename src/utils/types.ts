export interface IMessage {
  authorUid: string;
  content: string;
  timeStamp: number;
}

export interface IUser {
  uid: string;
  username: string;
  avatarUrl?: string;
}

export interface IConversation {
  id: string;
  messages: IMessage[];
}
