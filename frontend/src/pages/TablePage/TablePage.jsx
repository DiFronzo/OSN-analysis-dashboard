import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFormCard from '../../components/SearchFormCard';
import DataTable from '../../components/DataTable/DataTable';
import useSearchFormData from '../../hooks/useSearchFormData';
import Navigation from '../../components/Navigation/Navigation';
import table from '../../services/table';
import useQueryParams from '../../hooks/useQueryParams';
import getQueryParamString from '../../utils/getQueryParamString';

function TablePage() {
  const { params } = useQueryParams();
  const {
    searchTerm,
    library,
    advancedOptions,
    showAdvanced,
    isLoading,
    setSearchTerm,
    setLibrary,
    setAdvancedOptions,
    setShowAdvanced,
    setIsLoading,
  } = useSearchFormData({
    searchTerm: params?.query,
    library: params?.library,
    advancedOptions: {
      amount: params?.amount,
      region: params?.region,
      from: params?.from,
      to: params?.to,
    },
  });

  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [isInitial, setIsInitial] = useState(true);

  const navigate = useNavigate();

  const formatPosts = (posts) =>
    posts.map(
      ({
        // eslint-disable-next-line camelcase
        screen_name,
        tweets,
        location,
        date,
        analysis,
        polarity,
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

  const fetchData = useCallback(async () => {
    const { query, library: lib } = params;
    if (!query || !lib) {
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await table.getTableData(query, lib);
      setTableData(formatPosts(data.raw_data));
    } catch (err) {
      setTableData([]);
    }
    setIsLoading(false);
  }, [params, setIsLoading]);

  useEffect(() => {
    const { query, library: lib } = params;
    if (!query || !lib) {
      navigate('/');
    }
  }, [navigate, params]);

  useEffect(() => {
    console.log('test');
    if (!isInitial) {
      return;
    }
    setIsInitial(false);
    fetchData();
  }, [fetchData, isInitial]);

  const handleSearch = async () => {
    navigate(
      getQueryParamString({
        query: searchTerm,
        library,
        ...advancedOptions,
      }),
    );
    fetchData();
  };

  return (
    <>
      <SearchFormCard
        onSearch={handleSearch}
        searchTerm={searchTerm}
        library={library}
        advancedOptions={advancedOptions}
        showAdvanced={showAdvanced}
        isLoading={isLoading}
        setSearchTerm={setSearchTerm}
        setLibrary={setLibrary}
        setAdvancedOptions={setAdvancedOptions}
        setShowAdvanced={setShowAdvanced}
        setIsLoading={setIsLoading}
      />
      <Navigation />
      <DataTable
        columns={[
          {
            title: 'User',
            key: 'user',
          },
          {
            title: 'Post',
            key: 'post',
          },
          {
            title: 'Location',
            key: 'location',
          },
          {
            title: 'Date',
            key: 'date',
          },
          {
            title: 'Verdict',
            key: 'verdict',
          },
          {
            title: 'Polarity',
            key: 'polarity',
          },
          {
            title: 'Subjectivity',
            key: 'subjectivity',
          },
        ]}
        data={tableData}
        // TODO: Change to actual count!
        count={100}
        page={page}
        setPage={setPage}
        pageSizeOptions={[10, 25, 50]}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default TablePage;
