import React from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({ children }) => <section>{children}</section>;

DashboardCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DashboardCard;
