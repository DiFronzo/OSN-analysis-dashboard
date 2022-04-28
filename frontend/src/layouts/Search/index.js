import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import useQuery from "context/query";

const { default: VuiInput } = require("components/VuiInput");

function Search() {
    const { query, setQuery } = useQuery();
    const history = useHistory();

    const handleSearch = async () => {
        history.push("/dashboard");
    }

    const handleChange = (e) => setQuery(e.target.value);

    console.log(query)

    return (
        <PageLayout>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end" width="100%">
                <VuiBox item xs={6} width="40%" minWidth="16em" display="flex" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
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
    )
}

export default Search;