import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

function PieChart({ data, labels, colors, legendColor }) {
  return (
    <Chart
      type="pie"
      series={data}
      options={{
        labels,
        colors,
        legend: {
          labels: {
            colors: legendColor,
          },
        },
      }}
    />
  );
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  legendColor: PropTypes.string.isRequired,
};

export default PieChart;
