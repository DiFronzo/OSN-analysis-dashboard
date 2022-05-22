import React, { useEffect, useState } from "react";

import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import PieChart from "components/charts/pieCharts";
import { Author, GetAnalysis, Polarity, StandardText } from "../../../tables/data/authorsTableData";

export const pieChartDataCharts1 = [70, 10, 20];

export const pieChartOptionsCharts1 = {
  labels: ["Positive", "Neutral", "Negative"],
  colors: ["#2ca02c", "#ff7f0e", "#1f77b4"],
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
    colors: ["#2ca02c", "#ff7f0e", "#1f77b4"],
  },
  tooltip: {
    enabled: true,
    theme: "dark"
  }
};

const SatisfactionRate = () => {
  const [polarity, setPolarity] = useState([]);

  // TODO! what if there are only 3 val? should be fixed in python api.
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch('http://127.0.0.1:5000/pie/ok?number_of_tweets=100');
      // convert the data to json
      const json = await data.json();
      let result = await json.polarity?.map((item) => {
        return item.analysis;
      });

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
            sx={{ width: "250px", height: "250px" }}
          >
            {polarity.length > 0 ? (
            <PieChart
              chartData={polarity}
              chartOptions={pieChartOptionsCharts1}

            />
            ) : (<p>Loading..</p>)}
          </VuiBox>

          <VuiBox
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ minWidth: "80px" }}
          >
            <VuiTypography color="white" variant="h6">
              Based on TextBlob
            </VuiTypography>

          </VuiBox>

        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default SatisfactionRate;
