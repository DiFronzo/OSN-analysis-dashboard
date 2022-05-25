import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button, Paper, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import { useColorModeContext } from '../../contexts/ColorMode';

/*
const StyledHeader = styled.header(() => ({
  padding: '0 1em',
  boxShadow: '0 -0.2em 0.5em black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
*/

const StyledPaper = styled(Paper)(() => ({
  padding: '0 1em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function Header({ title }) {
  const { toggleColorMode, mode } = useColorModeContext();

  return (
    <StyledPaper component="header" square>
      <Typography
        component={Link}
        to="/"
        color="textPrimary"
        variant="h1"
        sx={{ fontSize: '1.6em', margin: '0.5em 0', textDecoration: 'none' }}>
        {title}
      </Typography>
      <Button
        variant="text"
        onClick={toggleColorMode}
        endIcon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}>
        {mode === 'light' ? 'Dark mode' : 'Light mode'}
      </Button>
    </StyledPaper>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
