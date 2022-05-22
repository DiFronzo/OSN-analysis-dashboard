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
import styled from '@emotion/styled';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useSearchContext } from '../../contexts/search';
import data from '../../services/data';

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
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const {
    query,
    results,
    setResults,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useSearchContext();

  console.log(error, isLoading);

  const formatTableData = () => {
    if (!results) {
      return null;
    }
    return results.raw_data.map(
      ({
        analysis,
        date,
        location,
        polarity,
        // eslint-disable-next-line camelcase
        screen_name,
        tweets,
        subjectivity,
      }) => ({
        // eslint-disable-next-line camelcase
        user: screen_name,
        post: tweets,
        location,
        date: new Date(date).toISOString(),
        verdict: analysis,
        polarity,
        subjectivity,
      }),
    );
  };

  useEffect(() => {
    if (results?.raw_data || isLoading) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await data.getData(query);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setResults(null);
        setError(err.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [results, query, setError, isLoading, setIsLoading, setResults]);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
  };

  const handlePageChange = (_e, newPage) => {
    setPage(newPage);
  };

  const createKey = (i) => `key-${i}`;

  return (
    <DashboardLayout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Post</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Verdict</StyledTableCell>
              <StyledTableCell>Polarity</StyledTableCell>
              <StyledTableCell>Subjectivity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              results?.raw_data &&
              formatTableData().map((item, i) => (
                <StyledTableRow key={createKey(i)}>
                  <StyledTableCell>{item.user}</StyledTableCell>
                  <StyledTableCell>{item.post}</StyledTableCell>
                  <StyledTableCell>{item.location}</StyledTableCell>
                  <StyledTableCell>{item.date}</StyledTableCell>
                  <StyledTableCell>{item.verdict}</StyledTableCell>
                  <StyledTableCell>{item.polarity}</StyledTableCell>
                  <StyledTableCell>{item.subjectivity}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={results?.raw_data?.length || 0}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </DashboardLayout>
  );
}

export default TablePage;
