import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

function PieChart({ data, labels, colors }) {
  return (
    <Chart
      type="pie"
      series={data}
      options={{
        labels,
        colors,
      }}
    />
  );
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PieChart;
