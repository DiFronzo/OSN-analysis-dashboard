import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@mui/material';
import styled from '@emotion/styled';
import DataTableCell from '../DataTableCell';

const StyledTableRow = styled(TableRow)(({ mode }) => {
  console.log(mode);
  return {
    '&:nth-of-type(odd)': {
      backgroundColor: mode === 'light' ? '#f6f6f6' : '#020202',
    },
  };
});

function DataTableRow({ data, valueKeys, mode }) {
  return (
    <StyledTableRow mode={mode}>
      {valueKeys &&
        valueKeys.map((key) => (
          <DataTableCell key={key}>{data[key]}</DataTableCell>
        ))}
    </StyledTableRow>
  );
}

DataTableRow.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  valueKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
};

export default DataTableRow;
