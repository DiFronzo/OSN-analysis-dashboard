import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const MIN_POSTS = 100;
const MAX_POSTS = 1000;

const libraries = ['TextBlob', 'VADER'];

const StyledForm = styled.form(() => ({
  width: '60%',
  minWidth: '20em',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

function SearchForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [library, setLibrary] = useState(libraries[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedData, setAdvancedData] = useState({
    amount: MIN_POSTS,
    region: '',
    from: '',
    to: '',
  });

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleLibraryChange = (e) => setLibrary(e.target.value);
  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);
  const handleAdvancedOptionChange = (e) => {
    let { value } = e.target;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10) || 0;
    }
    setAdvancedData({ ...advancedData, [e.target.name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          variant="outlined"
          type="search"
          sx={{ width: '100%' }}
          required
        />
        <Select
          value={library}
          onChange={handleLibraryChange}
          sx={{ width: '10em' }}>
          {libraries &&
            libraries.map((lib) => (
              <MenuItem key={lib} value={lib.toLowerCase()}>
                {lib}
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Button
        startIcon={<SearchIcon />}
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '10em', margin: '0.5em 0.25em' }}>
        Search
      </Button>
      <Button
        startIcon={<MenuIcon />}
        onClick={handleShowAdvanced}
        variant="contained"
        color="secondary"
        sx={{ width: '10em', margin: '0.5em 0.25em' }}>
        Advanced
      </Button>
      {showAdvanced && (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
  );
}

export default SearchForm;
