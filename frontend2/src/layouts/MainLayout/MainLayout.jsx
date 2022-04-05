import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
