import Search from '../../components/Search/Search';
import styles from './Home.module.scss';
import classNames from 'classnames';
import StatusBar from '../../components/StatusBar/StatusBar';
import Send from '../../assets/icons/Send';

const Home = () => {
  return (
    <div className={styles.container}>
      <StatusBar />

      <div className={styles['middle']}>
        <Search />

        <div className={classNames(styles['chat-list'], 'card')}>
          <button className={classNames(styles.chat, 'button')}>
            <img
              src='https://i.guim.co.uk/img/media/c7dbdbcacbf9aec07eee7daf41ad7d7a06c2c786/0_0_2405_1443/master/2405.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=46260b46d339ad5974834de513f39170'
              className='avatar avatar__horizontal'
            />
            <span className={styles.chat__title}>Elon Musk</span>
          </button>
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

        <div className={styles['messages-wrapper']}>
          {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
            <>
              <div className={styles.message}>Hey there!</div>
              <div className={classNames(styles.message, styles['message__own'])}>Hello!</div>
            </>
          ))}
        </div>

        <form className={styles['text-area']}>
          <input placeholder='Type your message here...' className={styles['text-area__input']} type='text' />
          <button type='submit' className={classNames(styles['text-area__send'], 'button')}>
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
