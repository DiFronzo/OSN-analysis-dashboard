import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@mui/material';
import styled from '@emotion/styled';
import DataTableCell from '../DataTableCell';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f6f6f6',
  },
}));

function DataTableRow({ data, valueKeys }) {
  return (
    <StyledTableRow>
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
};

export default DataTableRow;
