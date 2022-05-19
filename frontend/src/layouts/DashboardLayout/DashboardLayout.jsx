import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

function DashboardLayout({ children }) {
  return (
    <Box>
      {/* Search box */}
      <Box>Search box</Box>
      <ButtonGroup>
        <Button LinkComponent={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button LinkComponent={Link} to="/table">
          Table
        </Button>
      </ButtonGroup>
      {/* Dashboard */}
      <Box container>{children}</Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DashboardLayout;
