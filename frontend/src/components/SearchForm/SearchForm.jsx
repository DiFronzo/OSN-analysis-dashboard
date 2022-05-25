import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
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
  width: '100%',
  minWidth: '20em',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

function SearchForm({
  searchTerm,
  library,
  advancedOptions,
  showAdvanced,
  isLoading,
  setSearchTerm,
  setLibrary,
  setAdvancedOptions,
  setShowAdvanced,
  onSearch,
  wrap,
}) {
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleLibraryChange = (e) => setLibrary(e.target.value);
  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);
  const handleAdvancedOptionChange = (e) => {
    let { value } = e.target;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10) || 0;
    }
    setAdvancedOptions({ ...advancedOptions, [e.target.name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await onSearch();
  };

  return (
    <StyledForm onSubmit={handleSearch}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: wrap ? 'wrap' : 'nowrap',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
                <MenuItem key={lib} value={lib}>
                  {lib}
                </MenuItem>
              ))}
          </Select>
        </Box>
        <Button
          startIcon={isLoading ? <CircularProgress /> : <SearchIcon />}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{
            width: '12em',
            margin: `${wrap ? '0.5em 0.25em' : '0 0 0 0.5em'}`,
          }}>
          Search
        </Button>
        <Button
          startIcon={<MenuIcon />}
          onClick={handleShowAdvanced}
          variant="contained"
          color="secondary"
          sx={{
            width: '12em',
            margin: `${wrap ? '0.5em 0.25em' : '0 0 0 0.5em'}`,
          }}>
          Advanced
        </Button>
      </Box>
      {showAdvanced && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '1em',
          }}>
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
              value={advancedOptions.amount}
              onChange={handleAdvancedOptionChange}
            />
            <TextField
              name="amount"
              type="number"
              variant="outlined"
              value={advancedOptions.amount}
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
              value={advancedOptions.region}
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
              value={advancedOptions.from}
              onChange={handleAdvancedOptionChange}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <FormLabel>To</FormLabel>
            <TextField
              name="to"
              type="date"
              value={advancedOptions.to}
              onChange={handleAdvancedOptionChange}
            />
          </Box>
        </Box>
      )}
    </StyledForm>
  );
}

SearchForm.defaultProps = {
  wrap: false,
};

SearchForm.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  library: PropTypes.string.isRequired,
  advancedOptions: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  showAdvanced: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  setLibrary: PropTypes.func.isRequired,
  setAdvancedOptions: PropTypes.func.isRequired,
  setShowAdvanced: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  wrap: PropTypes.bool,
};

export default SearchForm;
