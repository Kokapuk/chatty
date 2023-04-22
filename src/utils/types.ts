export interface IMessage {
  id: string;
  authorUid: string;
  content: string;
  date: number;
}

export interface IUser {
  uid: string;
  username: string;
  profilePictureUrl?: string;
}
