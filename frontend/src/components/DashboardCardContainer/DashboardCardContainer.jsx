import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

function DashboardCardContainer({ children }) {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {children}
    </Grid>
  );
}

DashboardCardContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DashboardCardContainer;
