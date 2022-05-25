import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineChart({ data, options }) {
	const [lineChartData, setLineChartData] = useState([]);
	const [lineChartOptions, setLineChartOptions] = useState({});

	console.log(data);
	console.log(options);

	useEffect(() => {
		setLineChartData(data);
		setLineChartOptions(options);
	}, []);

  return (
    <ReactApexChart 
      options={lineChartOptions}
      series={lineChartData}
      type="area"
      width="100%"
      height="100%" 
    />
  );
}

export default LineChart;