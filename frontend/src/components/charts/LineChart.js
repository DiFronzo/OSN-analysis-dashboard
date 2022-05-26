import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineChart({ data, colors }) {
	// const [lineChartData, setLineChartData] = useState([]);
	// const [lineChartOptions, setLineChartOptions] = useState({});

	/*
	useEffect(() => {
		setLineChartData(data);
		setLineChartOptions(options);
	}, []);
	*/

  return (
    <ReactApexChart 
      options={{
				chart: {
					toolbar: {
						show: false,
					},
				},
				tooltip: {
					theme: "dark",
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: "smooth",
				},
				xaxis: {
					type: "datetime",
					labels: {
						style: {
							colors: "#c8cfca",
							fontSize: "10px",
						},
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
				},
				yaxis: {
					labels: {
						style: {
							colors: "#c8cfca",
							fontSize: "10px",
						},
					},
				},
				legend: {
					show: false,
				},
				grid: {
					strokeDashArray: 5,
					borderColor: "#56577A",
				},
				fill: {
					type: "gradient",
					gradient: {
						shade: "dark",
						type: "vertical",
						shadeIntensity: 0,
						gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
						inverseColors: true,
						opacityFrom: 0.8,
						opacityTo: 0,
						stops: [],
					},
					colors: colors,
				},
				colors: colors,
			}}
      series={data}
      type="area"
      width="100%"
      height="100%" 
    />
  );
}

export default LineChart;