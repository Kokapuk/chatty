import styles from './Search.module.scss';
import SearchIcon from '../../assets/icons/Search';

const Search = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon} />
      <input value={props.value} onInput={props.onInput} placeholder='Search' type='search' className={styles.input} />
    </div>
  );
};

export default Search;
