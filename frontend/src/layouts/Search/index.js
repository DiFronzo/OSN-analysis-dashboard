import { Grid } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import CoverLayout from "layouts/authentication/components/CoverLayout";

const { default: VuiInput } = require("components/VuiInput");

function Search() {
    return (
        <PageLayout>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end" width="100%">
                <VuiBox item xs={6} width="40%" display="flex" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
                    <VuiInput type="search" placeholder="Search..." width="100%" sx={{ m: '0.5em' }} />
                    <VuiButton color="primary" sx={{ m: '0.5em' }}>Search</VuiButton>
                    <VuiButton color="dark" sx={{ m: '0.5em' }}>Advanced</VuiButton>
                </VuiBox>
            </Grid>
        </PageLayout>
    )
}

export default Search;