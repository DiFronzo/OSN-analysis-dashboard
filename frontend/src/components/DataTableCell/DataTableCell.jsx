import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, tableCellClasses } from '@mui/material';
import styled from '@emotion/styled';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
  },
}));

function DataTableCell({ children }) {
  return <StyledTableCell>{children}</StyledTableCell>;
}

DataTableCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DataTableCell;
