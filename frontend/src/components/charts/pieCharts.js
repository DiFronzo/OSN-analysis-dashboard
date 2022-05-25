import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart({ data, options }) {
  return (
    <ReactApexChart 
      type="pie" 
      series={data} 
      options={options}
    />
  )
}

export default PieChart;
