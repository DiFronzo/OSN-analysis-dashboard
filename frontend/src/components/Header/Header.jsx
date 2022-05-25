import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MenuItem, Select, Typography } from '@mui/material';

const StyledHeader = styled.header(() => ({
  padding: '0 1em',
  boxShadow: '0 -0.2em 0.5em black',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function Header({ title }) {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (e) => setTheme(e.target.value);

  return (
    <StyledHeader>
      <Typography variant="h1">{title}</Typography>
      <Select value={theme} onChange={handleThemeChange} variant="outlined">
        <MenuItem value="light">Light theme</MenuItem>
        <MenuItem value="dark">Dark theme</MenuItem>
      </Select>
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
