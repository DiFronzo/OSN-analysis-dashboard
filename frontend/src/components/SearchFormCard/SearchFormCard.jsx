import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import SearchForm from '../SearchForm';

function SearchFormCard({
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
}) {
  return (
    <Card sx={{ marginTop: '1em', padding: '1em' }}>
      <SearchForm
        searchTerm={searchTerm}
        library={library}
        advancedOptions={advancedOptions}
        showAdvanced={showAdvanced}
        isLoading={isLoading}
        setSearchTerm={setSearchTerm}
        setLibrary={setLibrary}
        setAdvancedOptions={setAdvancedOptions}
        setShowAdvanced={setShowAdvanced}
        onSearch={onSearch}
      />
    </Card>
  );
}

SearchFormCard.propTypes = {
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
};

export default SearchFormCard;
