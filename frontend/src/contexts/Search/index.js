import { useState, createContext, useContext } from "react";
import PropTypes from 'prop-types';

// Sentiment analysis libraries
import { libraries } from "data/libraries";

const SearchContext = createContext();

const { Provider } = SearchContext;

function SearchProvider({ children }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [sentimentAnalysisLibrary, setSentimentAnalysisLibrary] = useState(libraries[0].key);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [advancedOptions, setAdvancedOptions] = useState({
		numberOfPosts: 100,
		user: '',
		untilDate: '',
	});

	return (
		<Provider 
			value={{ 
				searchQuery, 
				setSearchQuery,
				sentimentAnalysisLibrary,
				setSentimentAnalysisLibrary,
				showAdvanced,
				setShowAdvanced,
				advancedOptions,
				setAdvancedOptions
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
