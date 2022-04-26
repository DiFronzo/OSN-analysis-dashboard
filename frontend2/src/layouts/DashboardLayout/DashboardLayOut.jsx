import React from 'react';
import PropTypes from 'prop-types';
import styles from './DashboardLayout.module.css';
import Navigation from '../../components/Navigation';
import SearchBox from '../../components/SearchBox';

const DashboardLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <SearchBox />
    <Navigation />
    {children}
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DashboardLayout;
