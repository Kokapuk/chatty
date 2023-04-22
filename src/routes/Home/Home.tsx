import Search from '../../components/Search/Search';
import styles from './Home.module.scss';
import classNames from 'classnames';
import StatusBar from '../../components/StatusBar/StatusBar';
import Send from '../../assets/icons/Send';
import React, { useEffect, useRef, useState } from 'react';
import { IMessage, IUser } from '../../utils/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, placeholderAvatarUrl } from '../../utils/database';
import auth from '../../stores/auth';

const Home = () => {
  const myId = '0';

  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserUid, setSelectedUserUid] = useState('');
  const [draftMessage, setDraftMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([
    { id: '0', authorUid: '1', content: 'Hey there!', date: 0 },
    { id: '1', authorUid: '0', content: 'Hello!', date: 0 },
    { id: '2', authorUid: '1', content: 'How are you doing?', date: 0 },
    { id: '3', authorUid: '0', content: 'Fine', date: 0 },
    { id: '4', authorUid: '0', content: 'Whats about you?', date: 0 },
  ]);

  const messageWraper = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draftMessage) return;

    const newMessage: IMessage = { id: String(messages.length), authorUid: myId, content: draftMessage, date: Date.now() };
    setMessages((prev) => [...prev, newMessage]);
    setDraftMessage('');
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) navigate('/login');
    });

    const fetchUsers = async () => {
      setUsers((await getAllUsers()).filter((user) => user.uid !== auth.user?.uid));
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    messageWraper.current?.scrollTo({ top: messageWraper.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <StatusBar />

      <div className={styles['middle']}>
        <Search />

        <div className={classNames(styles['chat-list'], 'card')}>
          {users.map((user) => (
            <button
              onClick={() => setSelectedUserUid(user.uid)}
              key={user.uid}
              className={classNames(styles.chat, 'button', selectedUserUid === user.uid && styles.chat__active)}>
              <img
                src={user.profilePictureUrl ? user.profilePictureUrl : placeholderAvatarUrl}
                className='avatar avatar__horizontal'
              />
              <span className={styles.chat__title}>{user.username}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={classNames(styles.right, 'card')}>
        <div className={styles['user-info']}>
          <img
            src='https://i.guim.co.uk/img/media/c7dbdbcacbf9aec07eee7daf41ad7d7a06c2c786/0_0_2405_1443/master/2405.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=46260b46d339ad5974834de513f39170'
            className='avatar avatar__horizontal'
          />
          <span className={styles['user-info__user-name']}>Elon Musk</span>
        </div>

        <div ref={messageWraper} className={styles['messages-wrapper']}>
          {messages.map((message) => (
            <div key={message.id} className={classNames(styles.message, message.authorUid === myId && styles['message__own'])}>
              {message.content}
            </div>
          ))}
        </div>

        <form className={styles['text-area']} onSubmit={handleSubmit}>
          <input
            value={draftMessage}
            onInput={(e) => setDraftMessage(e.currentTarget.value)}
            placeholder='Type your message here...'
            className={styles['text-area__input']}
            type='text'
          />
          <button type='submit' className={classNames(styles['text-area__send'], 'button')}>
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
