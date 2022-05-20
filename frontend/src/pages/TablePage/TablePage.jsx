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
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
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

function TablePage() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Fetch data
      // ...
      setData([]);
    };
    fetchData();
  }, []);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const handleChangePage = (_e, newPage) => {
    setPage(newPage);
  };

  return (
    <DashboardLayout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Post</StyledTableCell>
              <StyledTableCell>Polarity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.a}</StyledTableCell>
                  <StyledTableCell>{row.b}</StyledTableCell>
                  <StyledTableCell>{row.c}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </DashboardLayout>
  );
}

export default TablePage;
