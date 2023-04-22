import classNames from 'classnames';
import styles from './StatusBar.module.scss';
import Logout from '../../assets/icons/Logout';

const StatusBar = () => {
  return (
    <div className={styles.container}>
      <img
        className='avatar avatar__vertical'
        src='https://i.guim.co.uk/img/media/c7dbdbcacbf9aec07eee7daf41ad7d7a06c2c786/0_0_2405_1443/master/2405.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=46260b46d339ad5974834de513f39170'
      />
      <button title='Logout' className={classNames(styles.logout, 'button')}>
        <Logout className={styles['logout-icon']} />
      </button>
    </div>
  );
};

export default StatusBar;
