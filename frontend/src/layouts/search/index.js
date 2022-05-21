import { useHistory } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useState } from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { useSearchContext } from "contexts/Search";

// Sentiment analysis libraries
import { libraries } from "data/libraries";
import { FormLabel, Slider } from "@mui/material";

function Search() {
	const { 
		searchQuery, 
		setSearchQuery,
		sentimentAnalysisLibrary,
		setSentimentAnalysisLibrary,
		advancedOptions,
		setAdvancedOptions
	} = useSearchContext();
	const [showAdvanced, setShowAdvanced] = useState(false);
	const history = useHistory();

	const handleSearch = async () => {
		if (!searchQuery) {
			return;
		}
		history.push(`/dashboard`);
	}

	const handleQueryChange = (e) => setSearchQuery(e.target.value);

	const handleSentimentAnalysisLibraryChange = (e) => setSentimentAnalysisLibrary(e.target.value);

	const handleShowAdvancedOptions = () => setShowAdvanced(!showAdvanced);

	const handleAdvancedOptionsChange = (e) => {
		if (e.target.name == "amount") {
			setAdvancedOptions({ ...advancedOptions, "amount": parseInt(e.target.value, 10) })
			return;
		}
		setAdvancedOptions({ ...advancedOptions, [e.target.name]: e.target.value });
	}

	return (
		<PageLayout>
			<DefaultNavbar />
			<VuiBox width="100%" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<VuiBox 
					width="40%" 
					minWidth="16em" 
					display="flex" 
					justifyContent="center" 
					sx={{ flexWrap: 'wrap', marginTop: '15em' }}
				>
					<VuiInput 
						type="search" 
						placeholder="Search..." 
						value={searchQuery}
						onChange={handleQueryChange}
						sx={{ m: '0.5em' }} 
					/>
					<select
						value={sentimentAnalysisLibrary}
						onChange={handleSentimentAnalysisLibraryChange}
					>
						{libraries.map((library) => <option key={library} value={library.toLowerCase()}>{library}</option>)}
					</select>
					<VuiButton onClick={handleSearch} color="primary" sx={{ m: '0.5em' }}>Search</VuiButton>
					<VuiButton onClick={handleShowAdvancedOptions} color="dark" sx={{ m: '0.5em' }}>Advanced</VuiButton>
					{showAdvanced && (
					<VuiBox display="flex" flexDirection="column" width="100%" sx={{ marginTop: "1em" }}>
						<FormLabel>Amount of posts</FormLabel>
						<Slider 
							name="amount"
							min={100}
							max={1000}
							value={advancedOptions.amount} 
							onChange={handleAdvancedOptionsChange} 
						/>
						<VuiInput 
							name="amount" 
							type="number" 
							value={advancedOptions.amount}
							onChange={handleAdvancedOptionsChange}
						/>
						<FormLabel>Region</FormLabel>
						<select
							name="region" 
							value={advancedOptions.region} 
							onChange={handleAdvancedOptionsChange}
						>
							{/* Countires */}
						</select>
						<FormLabel>From</FormLabel>
						<VuiInput
							name="from"
							type="date"
							value={advancedOptions.from}
							onChange={handleAdvancedOptionsChange}
						/>
						<FormLabel>To</FormLabel>
						<VuiInput
							name="to"
							type="date"
							value={advancedOptions.to}
							onChange={handleAdvancedOptionsChange}
						/>
					</VuiBox>
				)}
				</VuiBox>
			</VuiBox>
		</PageLayout>
	);
}

export default Search;
