import { useState, createContext, useContext } from "react";
import PropTypes from 'prop-types';

const SearchContext = createContext();

const { Provider } = SearchContext;

function SearchProvider({ children }) {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<Provider 
			value={{ 
				searchQuery, 
				setSearchQuery 
			}}
		>
			{children}
		</Provider>
	)
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useSearchContext() {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error("useSearchContext should be used inside the SearchProvider");
	}

	return context;
}

export {
	SearchProvider,
	useSearchContext
}
