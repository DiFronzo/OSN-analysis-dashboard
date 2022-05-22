import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  FormLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MIN_POSTS = 100;
const MAX_POSTS = 1000;

const libraries = ['TextBlob', 'VADER'];

const StyledForm = styled.form(() => ({
  margin: '1em',
}));

function DashboardLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [library, setLibrary] = useState(libraries[0].toLowerCase());
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedData, setAdvancedData] = useState({
    amount: MIN_POSTS,
    region: '',
    from: '',
    to: '',
  });

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleChangeLibrary = (e) => setLibrary(e.target.value);

  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);

  const handleAdvancedOptionChange = (e) => {
    let { value } = e.target;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10) || 0;
    }
    setAdvancedData({ ...advancedData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Card sx={{ marginTop: '1em' }}>
        <StyledForm onSubmit={handleSubmit}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <TextField
              value={searchQuery}
              onChange={handleSearchQueryChange}
              variant="outlined"
              type="search"
              sx={{ width: '100%' }}
              required
            />
            <Select value={library} onChange={handleChangeLibrary}>
              {libraries &&
                libraries.map((lib) => (
                  <MenuItem value={lib.toLowerCase()}>{lib}</MenuItem>
                ))}
            </Select>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              startIcon={<SearchIcon />}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '10em', margin: '0.5em' }}>
              Search
            </Button>
            <Button
              startIcon={<MenuIcon />}
              onClick={handleShowAdvanced}
              variant="contained"
              color="secondary"
              sx={{ width: '10em', margin: '0.5em' }}>
              Advanced
            </Button>
          </Box>
          {showAdvanced && (
            <Box
              sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1em',
                }}>
                <FormLabel>Number of posts</FormLabel>
                <Slider
                  name="amount"
                  min={MIN_POSTS}
                  max={MAX_POSTS}
                  value={advancedData.amount}
                  onChange={handleAdvancedOptionChange}
                />
                <TextField
                  name="amount"
                  type="number"
                  variant="outlined"
                  value={advancedData.amount}
                  onChange={handleAdvancedOptionChange}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1em',
                }}>
                <FormLabel>Region</FormLabel>
                <Select
                  name="region"
                  value={advancedData.region}
                  onChange={handleAdvancedOptionChange}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1em',
                }}>
                <FormLabel>From</FormLabel>
                <TextField
                  name="from"
                  type="date"
                  value={advancedData.from}
                  onChange={handleAdvancedOptionChange}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1em',
                }}>
                <FormLabel>To</FormLabel>
                <TextField
                  name="to"
                  type="date"
                  value={advancedData.to}
                  onChange={handleAdvancedOptionChange}
                />
              </Box>
            </Box>
          )}
        </StyledForm>
      </Card>
      <ButtonGroup sx={{ marginTop: '1em' }}>
        <Button LinkComponent={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button LinkComponent={Link} to="/table">
          Table
        </Button>
      </ButtonGroup>
      <Box container sx={{ marginTop: '1em' }}>
        {children}
      </Box>
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
