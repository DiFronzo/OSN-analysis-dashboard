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
import Select from "components/Select";

function Search() {
	const { 
		searchQuery, 
		setSearchQuery,
		sentimentAnalysisLibrary,
		setSentimentAnalysisLibrary,
		showAdvanced,
		setShowAdvanced,
		advancedOptions,
		setAdvancedOptions
	} = useSearchContext();
	const history = useHistory();

	const handleSearch = async () => {
		if (!searchQuery || !sentimentAnalysisLibrary) {
			return;
		}
		history.push(`/dashboard`);
	}

	const handleQueryChange = (e) => setSearchQuery(e.target.value);
	const handleSentimentAnalysisLibraryChange = (e) => setSentimentAnalysisLibrary(e.target.value);
	const handleShowAdvancedOptions = () => setShowAdvanced(!showAdvanced);
	
	const handleNumberOfPostsChange = (e) => 
			setAdvancedOptions({ ...advancedOptions, numberOfPosts: e.target.value });
	const handleUsernameChange = (e) => 
			setAdvancedOptions({ ...advancedOptions, username: e.target.value });
	const handleUntilDateChange = (e) => 
			setAdvancedOptions({ ...advancedOptions, untilDate: e.target.value });

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
					<Select
						value={sentimentAnalysisLibrary}
						onChange={handleSentimentAnalysisLibraryChange}
						options={libraries}
						key="key"
						valueKey="key"
						textKey="name"
					/>
					<VuiButton onClick={handleSearch} color="primary" sx={{ m: '0.5em' }}>Search</VuiButton>
					<VuiButton onClick={handleShowAdvancedOptions} color="dark" sx={{ m: '0.5em' }}>Advanced</VuiButton>
					{showAdvanced && (
					<VuiBox display="flex" flexDirection="column" width="100%" sx={{ marginTop: "1em" }}>
						<FormLabel>Number of posts</FormLabel>
						<Slider 
							name="number_of_posts"
							min={100}
							max={1000}
							value={advancedOptions.numberOfPosts} 
							onChange={handleNumberOfPostsChange} 
						/>
						<VuiInput 
							name="number_of_posts" 
							type="number" 
							value={advancedOptions.numberOfPosts}
							onChange={handleNumberOfPostsChange}
						/>
						<FormLabel>User</FormLabel>
						<VuiInput
							name="username"
							type="text"
							value={advancedOptions.username}
							onChange={handleUsernameChange}
						/>
						<FormLabel>Until date</FormLabel>
						<VuiInput
							name="until"
							type="date"
							value={advancedOptions.untilDate}
							onChange={handleUntilDateChange}
						/>
					</VuiBox>
				)}
				</VuiBox>
			</VuiBox>
		</PageLayout>
	);
}

export default Search;
