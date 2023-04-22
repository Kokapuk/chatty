import classNames from 'classnames';
import styles from './AuthForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import auth from '../../stores/auth';

export enum EAuthType {
  Register,
  Login,
}

interface IProps {
  authType: EAuthType;
}

const AuthForm = (props: IProps) => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.authType === EAuthType.Register) {
      await auth.register(username, email, password);
    } else if (props.authType === EAuthType.Login) {
      await auth.login(email, password);
    }

    navigate('/');
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        navigate('/');
        console.log('redirect');
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <form className={classNames(styles.from, 'card')} onSubmit={handleSubmit}>
        {props.authType === EAuthType.Register && (
          <input
            value={username}
            onInput={(e) => setUsername(e.currentTarget.value)}
            placeholder='Username'
            type='text'
            className={classNames(styles.input, 'card')}
            required
            minLength={3}
          />
        )}
        <input
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
          placeholder='Email'
          type='email'
          className={classNames(styles.input, 'card')}
          required
        />
        <input
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          placeholder='Password'
          type='password'
          className={classNames(styles.input, 'card')}
          required
          minLength={6}
        />
        <button className={classNames(styles.button, 'button')}>
          {props.authType === EAuthType.Register ? 'Register' : 'Login'}
        </button>
        <Link
          className={classNames(styles['alternate-auth-way'], 'button')}
          to={props.authType === EAuthType.Register ? '/login' : '/register'}>
          {props.authType === EAuthType.Register ? 'Login' : 'Register'}
        </Link>
      </form>
    </div>
  );
};

export default AuthForm;
