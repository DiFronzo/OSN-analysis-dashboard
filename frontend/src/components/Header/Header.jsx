import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const StyledHeader = styled.header(() => ({
  boxShadow: '0 -0.2em 0.5em black',
}));

function Header({ title }) {
  return (
    <StyledHeader>
      <Typography variant="h1">{title}</Typography>
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
