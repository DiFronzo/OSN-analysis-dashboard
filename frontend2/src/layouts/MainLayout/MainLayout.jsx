import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainLayout.module.css';
import Header from '../../components/Header';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>{children}</main>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
