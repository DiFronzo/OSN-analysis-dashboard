import React, { useEffect, useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useSearchContext } from '../../contexts/search';
import charts from '../../services/charts';
import data from '../../services/data';

const MIN_POSTS = 100;
const MAX_POSTS = 1000;

const libraries = ['TextBlob', 'VADER'];

const StyledForm = styled.form(() => ({
  margin: '1em',
}));

function DashboardLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [library, setLibrary] = useState(libraries[0].toLowerCase());
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedData, setAdvancedData] = useState({
    amount: MIN_POSTS,
    region: '',
    from: '',
    to: '',
  });

  const {
    query,
    setQuery,
    setResults,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useSearchContext();

  const location = useLocation();

  console.log(error, isLoading);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleChangeLibrary = (e) => setLibrary(e.target.value);

  const handleShowAdvanced = () => setShowAdvanced(!showAdvanced);

  const handleAdvancedOptionChange = (e) => {
    let { value } = e.target;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10) || 0;
    }
    setAdvancedData({ ...advancedData, [e.target.name]: value });
  };

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setQuery(searchTerm);
    try {
      let response;
      if (location.pathname === '/dashboard') {
        response = await charts.getPieChartData(searchTerm);
      } else if (location.pathname === '/table') {
        response = await data.getData(searchTerm);
      } else {
        throw new Error('Wrong pathname');
      }
      setResults(response.data);
      setError(null);
    } catch (err) {
      setResults(null);
      setError(err.response);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Card sx={{ marginTop: '1em' }}>
        <StyledForm onSubmit={handleSubmit}>
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
              onChange={handleChangeLibrary}
              sx={{ width: '12em' }}>
              {libraries &&
                libraries.map((lib) => (
                  <MenuItem key={lib} value={lib.toLowerCase()}>
                    {lib}
                  </MenuItem>
                ))}
            </Select>
            <Button
              startIcon={<SearchIcon />}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '15em', marginLeft: '0.5em' }}>
              Search
            </Button>
            <Button
              startIcon={<MenuIcon />}
              onClick={handleShowAdvanced}
              variant="contained"
              color="secondary"
              sx={{ width: '15em', marginLeft: '0.5em' }}>
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
