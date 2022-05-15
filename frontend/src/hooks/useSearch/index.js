import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useSearch() {
	const [results, setResults] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const query = queryParams.get("query");
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
		fetchData();
	}, []);

	return {
		results,
		isLoading,
		error,
	}
}

export default useSearch;