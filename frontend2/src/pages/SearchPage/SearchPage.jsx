import React from 'react';
import styles from './SearchPage.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';

const SearchPage = () => (
  <div className={styles.wrapper}>
    <SearchBox />
  </div>
);

export default SearchPage;
