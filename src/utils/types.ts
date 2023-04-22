export interface IMessage {
  authorUid: string;
  content: string;
  timeStamp: number;
}

export interface IUser {
  uid: string;
  username: string;
  profilePictureUrl?: string;
}

export interface IConversation {
  id: string;
  messages: IMessage[];
}
