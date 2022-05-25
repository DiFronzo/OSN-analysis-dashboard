import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Skeleton } from '@mui/material';

function DashboardCard({ isLoading, children, xs }) {
  return (
    <Grid item xs={xs} sx={isLoading ? { minHeight: '15em' } : {}}>
      <Card sx={{ height: '100%' }}>
        {isLoading ? (
          <Skeleton variant="rectangular" sx={{ height: '100%' }} />
        ) : (
          children
        )}
      </Card>
    </Grid>
  );
}

DashboardCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  xs: PropTypes.number.isRequired,
};

export default DashboardCard;
