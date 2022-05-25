import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import charts from '../../services/charts';

import useSearchFormData from '../../hooks/useSearchFormData';
import SearchForm from '../../components/SearchForm/SearchForm';
import getQueryParamString from '../../utils/getQueryParamString';

/*
const MIN_POSTS = 100;
const MAX_POSTS = 1000;

const StyledForm = styled.form(() => ({
  width: '60%',
  minWidth: '20em',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));
*/

function SearchPage() {
  const {
    searchTerm,
    library,
    advancedOptions,
    showAdvanced,
    isLoading,
    setSearchTerm,
    setLibrary,
    setAdvancedOptions,
    setShowAdvanced,
    setIsLoading,
  } = useSearchFormData();
  const navigate = useNavigate();

  const handleSearch = async () => {
    const queryParamString = getQueryParamString({
      query: searchTerm,
      library,
      ...advancedOptions,
    });
    navigate(`/dashboard${queryParamString}`);
    /*
    setIsLoading(true);
    try {
      const { data } = await charts.getPieChartData(searchTerm);
      const chartData = data.polarity.map(({ analysis }) => analysis);
      const queryParamString = getQueryParamString({
        query: searchTerm,
        library,
        ...advancedOptions,
      });
      navigate(`/dashboard${queryParamString}`, { state: { pie: chartData } });
    } catch (err) {
      // Ignore
    }
    setIsLoading(false);
    */
  };

  return (
    <Box
      container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '15em',
      }}>
      <SearchForm
        onSearch={handleSearch}
        searchTerm={searchTerm}
        library={library}
        advancedOptions={advancedOptions}
        showAdvanced={showAdvanced}
        isLoading={isLoading}
        setSearchTerm={setSearchTerm}
        setLibrary={setLibrary}
        setAdvancedOptions={setAdvancedOptions}
        setShowAdvanced={setShowAdvanced}
        setIsLoading={setIsLoading}
      />
    </Box>
  );
}

export default SearchPage;
