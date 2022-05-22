import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext();

const { Provider } = SearchContext;

function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}>
      {children}
    </Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext must be used inside the SearchProvider');
  }

  return context;
}

export { SearchProvider, useSearchContext };
