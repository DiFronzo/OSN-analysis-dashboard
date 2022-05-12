import React, { useEffect, useState } from "react";

import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import PieChart from "components/charts/pieCharts";
import { Author, GetAnalysis, Polarity, StandardText } from "../../../tables/data/authorsTableData";

export const pieChartDataCharts1 = [70, 10, 20];

export const pieChartOptionsCharts1 = {
  labels: ["Negative", "Neutral", "Positive"],
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
  chart: {
    width: "100%",
    stroke: {
      show: false
    }
  },
  states: {
    hover: {
      filter: {
        type: "none"
      }
    }
  },
  legend: {
    show: false
  },
  stroke: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false
        }
      }
    }
  },
  fill: {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
  },
  tooltip: {
    enabled: true,
    theme: "dark"
  }
};

const SatisfactionRate = () => {
  const [polarity, setPolarity] = useState([26, 44, 30]);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch('http://127.0.0.1:5000/pie/trump?number_of_tweets=100');
      // convert the data to json
      const json = await data.json();
      let result = [26, 44, 30]

      // set state with the result
      setPolarity(result);
    }

    // call the function
    fetchData()
    // make sure to catch any error
    //.catch(console.error);
  }, [])

  return (
    <Card sx={{ height: "340px",  alignSelf: "center"  }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
          Pie Chart showing Polarity <br/>
        </VuiTypography>

        <VuiBox sx={{ width: "100%" }}>
          <VuiBox
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "250px", height: "250px" }}
          >
            {polarity ? (
            <PieChart
              chartData={polarity}
              chartOptions={pieChartOptionsCharts1}

            />
            ) : (<p>Loading..</p>)}
          </VuiBox>
        </VuiBox>
        <VuiBox
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minWidth: "80px" }}

        >
          <VuiBox
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: "80px" }}
          >
            <VuiTypography color="white" variant="h5">
              Based on TextBlob
            </VuiTypography>

          </VuiBox>

        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default SatisfactionRate;
