import { child, get, getDatabase, ref, set } from 'firebase/database';
import { IConversation, IMessage, IUser } from './types';

export const getAllUsers = async (): Promise<IUser[]> => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, 'users'));
  const users: IUser[] = [];

  snapshot.forEach((childSnapshot) => {
    users.push(childSnapshot.val());
  });

  return users;
};

export const getConversation = async (uidA: string, uidB: string): Promise<IConversation | null> => {
  const dbRef = ref(getDatabase());
  let snapshot = await get(child(dbRef, `conversations/${uidA}_${uidB}`));

  if (!snapshot.exists()) {
    snapshot = await get(child(dbRef, `conversations/${uidB}_${uidA}`));
  }

  if (!snapshot.exists()) return null;
  return snapshot.val();
};

export const sendMessage = async (uidA: string, uidB: string, newMessage: IMessage) => {
  const db = getDatabase();
  const dbRef = ref(db);
  const uids = [uidA, uidB];
  uids.sort();

  const snapshot = await get(child(dbRef, `conversations/${uids[0]}_${uids[1]}`));
  let relevantConversation: IConversation = snapshot.val();

  if (!relevantConversation) {
    relevantConversation = { id: `${uids[0]}_${uids[1]}`, messages: [] };
  }

  set(ref(db, `conversations/${uids[0]}_${uids[1]}`), {
    ...relevantConversation,
    messages: [...relevantConversation!.messages, newMessage],
  });
};
