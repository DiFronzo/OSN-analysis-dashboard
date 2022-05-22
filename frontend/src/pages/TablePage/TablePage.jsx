import React, { useEffect, useState } from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  tableCellClasses,
  TablePagination,
} from '@mui/material';
/* import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid'; */
import styled from '@emotion/styled';
// import { Box } from '@mui/material';
import DashboardLayout from '../../layouts/DashboardLayout';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f6f6f6',
  },
}));

/*
function ExportToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
*/

function TablePage() {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([
    {
      user: 'Roger',
      post: 'This is an angry letter to you.',
      location: 'California',
      date: '2022-01-01',
      verdict: 'Negative',
      polarity: -0.7,
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      // Fetch data
      // ...
      setData(data);
    };
    fetchData();
  }, [data]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handlePageChange = (_e, newPage) => {
    setPage(newPage);
  };

  const createKey = (i) => `key-${i}`;

  return (
    <DashboardLayout>
      {/* <Box height="40em" display="flex">
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            columns={[
              { field: 'user', headerName: 'User' },
              { field: 'post', headerName: 'Post' },
              { field: 'location', headerName: 'Location' },
              { field: 'date', headerName: 'Date' },
              { field: 'verdict', headerName: 'Verdict' },
              { field: 'polarity', headerName: 'Polarity' },
            ]}
            rows={data}
            getRowId={() => {
              counter += 1;
              return counter;
            }}
            pageSize={pageSize}
            page={page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            rowsPerPageOptions={[10, 25, 50]}
            components={{ Toolbar: ExportToolbar }}
            pagination
          />
        </Box>
      </Box> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Post</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Verdict</StyledTableCell>
              <StyledTableCell align="right">Polarity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, i) => (
                <StyledTableRow key={createKey(i)}>
                  <StyledTableCell>{row.user}</StyledTableCell>
                  <StyledTableCell>{row.post}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.location}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.verdict}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.polarity}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </DashboardLayout>
  );
}

export default TablePage;
