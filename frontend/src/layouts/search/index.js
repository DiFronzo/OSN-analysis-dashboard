import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useState } from "react";

function Search() {
	const [query, setQuery] = useState('');
	// const { search } = useLocation();
	// const query = new URLSearchParams(search);
	const history = useHistory();

	const handleSearch = async () => {
			history.push(`/dashboard?query=${query}`);
	}

	const handleChange = (e) => setQuery(e.target.value);

	return (
		<PageLayout>
			<Grid 
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '100vh' }}
			>
				<VuiBox 
					item 
					xs={6} 
					width="40%" 
					minWidth="16em" 
					display="flex" 
					justifyContent="center" 
					sx={{ flexWrap: 'wrap' }}
				>
					<VuiInput 
						type="search" 
						placeholder="Search..." 
						value={query}
						onChange={handleChange} 
						width="100%" 
						sx={{ m: '0.5em' }} 
					/>
					<VuiButton onClick={handleSearch} color="primary" sx={{ m: '0.5em' }}>Search</VuiButton>
					<VuiButton color="dark" sx={{ m: '0.5em' }}>Advanced</VuiButton>
				</VuiBox>
			</Grid>
		</PageLayout>
	);
}

export default Search;
