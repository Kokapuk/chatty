import classNames from 'classnames';
import styles from './StatusBar.module.scss';
import Logout from '../../assets/icons/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import auth from '../../stores/auth';
import { placeholderAvatarUrl } from '../../utils/database';
import Gear from '../../assets/icons/Gear';

const StatusBar = observer(() => {
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(getAuth());
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <img className='avatar avatar__vertical' src={auth.userInfo?.avatarUrl ? auth.userInfo.avatarUrl : placeholderAvatarUrl} />
      <button onClick={() => navigate('/settings')} title='Settings' className={classNames(styles['icon-button'], 'button')}>
        <Gear className={styles.icon} />
      </button>
      <button onClick={logOut} title='Logout' className={classNames(styles['icon-button'], styles['logout-button'], 'button')}>
        <Logout className={styles.icon} />
      </button>
    </div>
  );
});

export default StatusBar;
