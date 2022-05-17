import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useSearch() {
	const [results, setResults] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

	const fetchSearch = async (query) => {
		setLoading(true);
		// Exit the function if there are no search query.
		if (!query) {
			setLoading(false);
			return;
		}
		try {
			const data = await fetch(`http://127.0.0.1:5000/raw_data/${query}`);
			const json = await data.json();
			setResults(json);
			setError(null);
		} catch (err) {
			setResults(null);
			setError(err);
		}
		setLoading(false);
	}

	useEffect(() => {
		const query = queryParams.get("query");
		fetchSearch(query);
	}, []);

	return {
		results,
		isLoading,
		error,
		fetchSearch
	}
}

export default useSearch;