import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import DataTableRow from '../DataTableRow';
import DataTableCell from '../DataTableCell';

function DataTable({
  columns,
  data,
  count,
  pageSize,
  setPageSize,
  pageSizeOptions,
  page,
  setPage,
}) {
  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handlePageChange = (_e, newPage) => {
    setPage(newPage);
  };

  const keys = columns.map(({ key }) => key);

  const createKey = (i) => i;

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns &&
                columns.map(({ title, key }) => (
                  <DataTableCell key={key}>{title}</DataTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, i) => (
                <DataTableRow key={createKey(i)} valueKeys={keys} data={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={count}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </Box>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      post: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      verdict: PropTypes.string.isRequired,
      polarity: PropTypes.number.isRequired,
      subjectivity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default DataTable;
