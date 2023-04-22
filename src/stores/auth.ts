import { User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { makeAutoObservable } from 'mobx';
import { IUser } from '../utils/types';
import { getDatabase, ref, set } from 'firebase/database';

class Auth {
  user: User | null = null;
  userInfo: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async register(username: string, email: string, password: string) {
    const auth = getAuth();
    const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
    const userInfo: IUser = {
      uid: user.uid,
      username,
    };

    const db = getDatabase();
    await set(ref(db, `users/${user.uid}`), userInfo);
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }
}

export default new Auth();
