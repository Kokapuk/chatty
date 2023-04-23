import Search from '../../components/Search/Search';
import styles from './Home.module.scss';
import classNames from 'classnames';
import StatusBar from '../../components/StatusBar/StatusBar';
import Send from '../../assets/icons/Send';
import React, { useEffect, useRef, useState } from 'react';
import { IConversation, IUser } from '../../utils/types';
import { Unsubscribe, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, sendMessage } from '../../utils/database';
import auth from '../../stores/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import moment from 'moment';
import { getPlaceholderAvatarUrl } from '../../utils/storage';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [placeholderAvatarUrl, setPlaceholderAvatarUrl] = useState('');

  const messageWraper = useRef<HTMLDivElement>(null);
  let valueUnsubscribe: Unsubscribe | null = null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth.user || !selectedUser || !draftMessage) return;

    setDraftMessage('');
    sendMessage(auth.user.uid, selectedUser.uid, { authorUid: auth.user.uid, content: draftMessage, timeStamp: Date.now() });
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) navigate('/login');
    });

    const fetchUsers = async () => {
      setUsers((await getAllUsers()).filter((user) => user.uid !== auth.user?.uid));
    };

    fetchUsers();

    const fetchPlaceholderAvatarUrl = async () => {
      setPlaceholderAvatarUrl(await getPlaceholderAvatarUrl());
    };

    fetchPlaceholderAvatarUrl();
  }, []);

  useEffect(() => {
    if (valueUnsubscribe) valueUnsubscribe();
    if (!auth.user || !selectedUser) return;

    const fetchConversation = async () => {
      const db = getDatabase();
      const uids = [auth.user!.uid, selectedUser.uid];
      uids.sort();
      let conversationRef = ref(db, `conversations/${uids[0]}_${uids[1]}`);

      valueUnsubscribe = onValue(conversationRef, (snapshot) => {
        setConversation(snapshot.val());
      });
    };

    fetchConversation();
  }, [selectedUser]);

  useEffect(() => {
    messageWraper.current?.scrollTo({ top: messageWraper.current.scrollHeight, behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className={styles.container}>
      <StatusBar />

      <div className={styles['middle']}>
        <Search />

        <div className={classNames(styles['chat-list'], 'card')}>
          {users.map((user) => (
            <button
              onClick={() => setSelectedUser(user)}
              key={user.uid}
              className={classNames(styles.chat, 'button', selectedUser?.uid === user.uid && styles.chat__active)}>
              <img src={user.avatarUrl ? user.avatarUrl : placeholderAvatarUrl} className='avatar avatar__horizontal' />
              <span className={styles.chat__title}>{user.username}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={classNames(styles.right, 'card')}>
        {selectedUser && (
          <div className={styles['user-info']}>
            <img
              src={selectedUser?.avatarUrl ? selectedUser.avatarUrl : placeholderAvatarUrl}
              className='avatar avatar__horizontal'
            />
            <span className={styles['user-info__user-name']}>{selectedUser.username}</span>
          </div>
        )}

        <div ref={messageWraper} className={styles['messages-wrapper']}>
          {conversation?.messages.map((message) => (
            <>
              <div
                key={message.timeStamp}
                className={classNames(styles.message, message.authorUid === auth.user?.uid && styles['message__own'])}>
                {message.content}
              </div>
              <span
                className={classNames(
                  styles['message__time-stamp'],
                  message.authorUid === auth.user?.uid && styles['message__time-stamp__own']
                )}>
                {moment(message.timeStamp).calendar()}
              </span>
            </>
          ))}
        </div>

        <form className={styles['text-area']} onSubmit={handleSubmit}>
          <input
            disabled={!selectedUser}
            value={draftMessage}
            onInput={(e) => setDraftMessage(e.currentTarget.value)}
            placeholder='Type your message here...'
            className={styles['text-area__input']}
            type='text'
          />
          <button disabled={!selectedUser} type='submit' className={classNames(styles['text-area__send'], 'button')}>
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
