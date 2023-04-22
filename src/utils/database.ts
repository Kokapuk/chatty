import { child, get, getDatabase, ref } from 'firebase/database';
import { IUser } from './types';

export const placeholderAvatarUrl = 'https://t3.ftcdn.net/jpg/04/17/45/28/360_F_417452853_zX2uSxhLns2Ei2nRmXjnpjPw5Ox5V7EK.jpg';

export const getAllUsers = async (): Promise<IUser[]> => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, 'users'));
  const users: IUser[] = [];

  snapshot.forEach((childSnapshot) => {
    users.push(childSnapshot.val());
  });

  return users;
};
