/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import MapChart from "examples/Charts/MapCharts/MapCharts";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "components/charts/LineChart" // "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

// Search context hook
import { useSearchContext } from "contexts/Search";
import { queryString } from "utils/queryString";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const { 
    searchQuery, 
    setSearchQuery, 
    sentimentAnalysisLibrary, 
    setSentimentAnalysisLibrary,
    showAdvanced,
    advancedOptions 
  } = useSearchContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Polarity data for pie chart
  const [polarity, setPolarity] = useState([]);
  
  const [timelineData, setTimelineData] = useState([]);
  // Data for map
  const [map, setMap] = useState([]);

  // Fetch data for pie chart
  const fetchPieData = async (search, lib, advanced = null) => {
    console.log("fetchPieData", search, lib);
    setIsLoading(true);
    if (!search || !lib) {
      console.log("exit fetchPieData");
      setPolarity([]);
      setError(null);
      setIsLoading(false);
      return;
    }
    console.log("continue fetchPieData");
    setSearchQuery(search);
    setSentimentAnalysisLibrary(lib);
    const queryParamString = queryString(advanced);
    try {
      // get the data from the api
      let data;
      if (!showAdvanced || !queryParamString) {
        data = await fetch(`http://127.0.0.1:5000/pie/${search}?number_of_tweets=100&library=${lib}`);
      } else {
        data = await fetch(`http://127.0.0.1:5000/pie/${search}${queryParamString}&number_of_tweets=100&library=${lib}`);
      }
      
      // convert the data to json
      const json = await data.json();
      let result = await json.polarity?.map(({ analysis }) => analysis);
      setPolarity(result);
      setError(null);

    let map_data;
    if (!showAdvanced || !queryParamString) {
      map_data = await fetch(`http://127.0.0.1:5000/map/${search}?number_of_tweets=100&library=${lib}`);
    } else {
      map_data = await fetch(`http://127.0.0.1:5000/map/${search}${queryParamString}&number_of_tweets=100&library=${lib}`);
    }
    // convert the map data to json
    const json_map = await map_data.json();
    let result_map = await json_map.map_data?.map(({ place }) => place ? (place.bounding_box["coordinates"][0][0]) : null);
    setMap(result_map);
    setError(null);
    } catch (err) {
      setPolarity([]);
      setMap([]);
      setError(err);
    }
    setIsLoading(false);
  }

  const fetchLineData = async (search, lib, advanced = null) => {
    console.log("fetchLineData", search, lib);
    setIsLoading(true);
    if (!search || !lib) {
      console.log("exit fetchLineData");
      setTimelineData([]);
      setError(null);
      setIsLoading(false);
      return;
    }
    console.log("Continue fetchLineData");
    setSearchQuery(search);
    setSentimentAnalysisLibrary(lib);
    const queryParamString = queryString(advanced);
    try {
      // get the data from the api
      let data;
      if (!showAdvanced || !queryParamString) {
        data = await fetch(`http://127.0.0.1:5000/line/${search}?number_of_tweets=1000&library=${lib}`);
      } else {
        data = await fetch(`http://127.0.0.1:5000/line/${search}${queryParamString}&number_of_tweets=1000&library=${lib}`);
      }
      
      // convert the data to json
      console.log("fetchLineData 1");
      const json = await data.json();
      console.log("fetchLineData 2");
      const tData = json.data;
      console.log("fetchLineData 3");
      setTimelineData(tData);
      setError(null);
    } catch (err) {
      setTimelineData([]);
      setError(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    console.log("test");
    fetchPieData(searchQuery, sentimentAnalysisLibrary, showAdvanced ? advancedOptions : null);
    fetchLineData(searchQuery, sentimentAnalysisLibrary, showAdvanced ? advancedOptions : null);
  }, []);

  const handleSearch = async (search, lib) => {
    console.log("handleSearch", searchQuery, sentimentAnalysisLibrary);
    await Promise.all([
      fetchPieData(search, lib, showAdvanced ? advancedOptions : null), 
      fetchLineData(search, lib, showAdvanced ? advancedOptions : null)
    ]);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar
        handleSearch={handleSearch} 
      />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate polarity={polarity} />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      colors={["lightgreen", "lightgray", "red"]}
                      data={timelineData}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiTypography variant="lg" color="white" fontWeight="bold" mb="1px">
                  Map
                </VuiTypography>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="350px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      )

                    }}
                  >
                    {map.length > 0 ? (<MapChart map_arr={map}  />) : (<p>Loading...</p>)}
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>

      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
