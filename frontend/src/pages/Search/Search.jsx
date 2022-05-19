import React, { useState } from 'react';
import {
  Box,
  Button,
  FormLabel,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';

const MIN_POSTS = 100;
const MAX_POSTS = 1000;

const StyledHeader = styled.header(() => ({
  boxShadow: '0 -0.2em 0.5em black',
}));

const StyledForm = styled.form(() => ({
  width: '40%',
  minWidth: '20em',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedData, setAdvancedData] = useState({
    amount: MIN_POSTS,
    region: '',
    from: '',
    to: '',
  });

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

  const handleAdvancedOptionChange = (e) => {
    let { value } = e.target;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10) || 0;
    }
    setAdvancedData({ ...advancedData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted: ${searchQuery}`);
  };

  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);

  return (
    <Box
      container
      sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StyledHeader>
        <Typography variant="h1">OSN Dashboard</Typography>
      </StyledHeader>
      <Box
        container
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '15em' }}>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            value={searchQuery}
            onChange={handleSearchQueryChange}
            variant="outlined"
            type="search"
            sx={{ width: '100%' }}
            required
          />
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
      </Box>
    </Box>
  );
}

export default Search;
