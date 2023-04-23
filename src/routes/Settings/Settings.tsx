import React, { useEffect, useRef, useState } from 'react';
import styles from './Settings.module.scss';
import { IUser } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { getDatabase, onValue, ref as databaseRef, set } from 'firebase/database';
import { placeholderAvatarUrl } from '../../utils/database';
import classNames from 'classnames';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const Settings = () => {
  const navigate = useNavigate();
  const avatarInput = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        return navigate('/login');
      }

      const db = getDatabase();
      const starCountRef = databaseRef(db, `users/${user.uid}`);

      onValue(starCountRef, (snapshot) => {
        setUserInfo(snapshot.val());
      });
    });
  }, []);

  const uploadAvatar = () => {
    avatarInput.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
      setUploadedAvatar(null);
      return;
    }

    setUploadedAvatar(event.currentTarget.files[0]);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo) {
      return;
    }

    const newUser: IUser = { ...userInfo };
    newUser.username = event.currentTarget.value;
    setUserInfo(newUser);
  };

  const save = async () => {
    if (!userInfo) {
      return;
    }

    const newUserInfo = { ...userInfo };

    if (uploadedAvatar) {
      const avatarRef = storageRef(getStorage(), `avatars/${userInfo.uid}`);
      await uploadBytes(avatarRef, uploadedAvatar);
      const avatarUrl = await getDownloadURL(avatarRef);
      newUserInfo.avatarUrl = avatarUrl;
    }

    await set(databaseRef(getDatabase(), `users/${userInfo.uid}`), newUserInfo);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <input
        onChange={handleUpload}
        ref={avatarInput}
        type='file'
        accept='image/png, image/jpeg, image/jpg'
        style={{ display: 'none' }}
      />
      <div className={classNames(styles.wrapper, 'card')}>
        <img
          className='avatar avatar__horizontal'
          src={
            uploadedAvatar
              ? window.URL.createObjectURL(uploadedAvatar)
              : userInfo?.avatarUrl
              ? userInfo.avatarUrl
              : placeholderAvatarUrl
          }
        />
        <button onClick={uploadAvatar} className={classNames(styles['button'], 'button')}>
          Upload avatar
        </button>
        <input
          onChange={handleUsernameChange}
          type='text'
          className={classNames(styles.input, 'card')}
          value={userInfo?.username}
        />
        <button onClick={save} className={classNames(styles['button'], 'button')}>
          Save
        </button>
        <button onClick={() => navigate('/')} className={classNames(styles.button, styles['button__low-attention'], 'button')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
