import Search from '../../components/Search/Search';
import Logout from '../../assets/icons/Logout';
import styles from './Home.module.scss';
import classNames from 'classnames';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className='avatar avatar__vertical'
          src='https://i.guim.co.uk/img/media/c7dbdbcacbf9aec07eee7daf41ad7d7a06c2c786/0_0_2405_1443/master/2405.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=46260b46d339ad5974834de513f39170'
        />
        <button className={classNames(styles.logout, 'button')}>
          <Logout className={styles['logout-icon']} />
        </button>
      </div>

      <div className={styles['middle']}>
        <Search />

        <div className={styles['chat-list']}>
          <button className={classNames(styles.chat, 'button')}>
            <img
              src='https://i.guim.co.uk/img/media/c7dbdbcacbf9aec07eee7daf41ad7d7a06c2c786/0_0_2405_1443/master/2405.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=46260b46d339ad5974834de513f39170'
              className='avatar avatar__horizontal'
            />
            <span className={styles.chat__title}>Elon Musk</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
