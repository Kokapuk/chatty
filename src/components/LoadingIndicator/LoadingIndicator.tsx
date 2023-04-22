import styles from './LoadingIndicator.module.scss';

const LoadingIndicator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.indicator} />
    </div>
  );
};

export default LoadingIndicator;
