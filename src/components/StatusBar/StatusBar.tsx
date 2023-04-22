import classNames from 'classnames';
import styles from './StatusBar.module.scss';
import Logout from '../../assets/icons/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import auth from '../../stores/auth';
import { placeholderAvatarUrl } from '../../utils/database';

const StatusBar = observer(() => {
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(getAuth());
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <img
        className='avatar avatar__vertical'
        src={auth.userInfo?.profilePictureUrl ? auth.userInfo.profilePictureUrl : placeholderAvatarUrl}
      />
      <button onClick={logOut} title='Logout' className={classNames(styles.logout, 'button')}>
        <Logout className={styles['logout-icon']} />
      </button>
    </div>
  );
});

export default StatusBar;
