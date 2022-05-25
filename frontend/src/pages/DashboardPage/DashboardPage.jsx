import React, { useCallback, useEffect, useState } from 'react';
import {
  // useLocation,
  useNavigate,
  // useSearchParams,
} from 'react-router-dom';
import charts from '../../services/charts';
import PieChart from '../../components/PieChart';
import SearchFormCard from '../../components/SearchFormCard';
import DashboardCardContainer from '../../components/DashboardCardContainer';
import DashboardCard from '../../components/DashboardCard';
import useSearchFormData from '../../hooks/useSearchFormData';
import Navigation from '../../components/Navigation/Navigation';
import getQueryParamString from '../../utils/getQueryParamString';
import useQueryParams from '../../hooks/useQueryParams';
import { useColorModeContext } from '../../contexts/ColorMode';

function DashboardPage() {
  const { mode } = useColorModeContext();
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
  const [pieChartData, setPieChartData] = useState([]);

  const navigate = useNavigate();
  // const { state } = useLocation();

  // const [hasRetrieved, setHasRetrieved] = useState(false);

  // const [searchParams] = useSearchParams();

  const [isInitial, setIsInitial] = useState(true);

  const fetchData = useCallback(async () => {
    console.log('fetchData');
    const { query, library: lib } = params;
    if (!query || !lib) {
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await charts.getPieChartData(query, lib);
      setPieChartData(data.polarity.map(({ analysis }) => analysis));
    } catch (err) {
      setPieChartData([]);
    }
    setIsLoading(false);
  }, [params, setIsLoading]);

  console.log('update');

  useEffect(() => {
    const { query, library: lib } = params;
    if (!query || !lib) {
      navigate('/');
    }
  }, [navigate, params]);

  useEffect(() => {
    console.log('useEffect');
    if (!isInitial) {
      return;
    }
    setIsInitial(false);
    fetchData();
  }, [fetchData, isInitial]);

  /*
  useEffect(() => {
    console.log('useEffect...');
    setDoSearch(false);
    if (!doSearch) {
      return;
    }
    console.log(searchTerm);
    console.log(doSearch);
    console.log('has been set to false');
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await charts.getPieChartData(searchTerm, library);
        setPieChartData(data.polarity.map(({ analysis }) => analysis));
      } catch (err) {
        setPieChartData([]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [
    doSearch,
    isLoading,
    library,
    params,
    searchTerm,
    setIsLoading,
    setLibrary,
    setSearchTerm,
  ]);
  */

  const handleSearch = async () => {
    console.log('handleSearch');
    navigate(
      getQueryParamString({
        query: searchTerm,
        library,
        ...advancedOptions,
      }),
    );
    await fetchData();
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
      />
      <Navigation />
      <DashboardCardContainer>
        <DashboardCard xs={8} isLoading={isLoading}>
          test
        </DashboardCard>
        <DashboardCard xs={4} isLoading={isLoading}>
          <PieChart
            labels={['Positive', 'Neutral', 'Negative']}
            colors={['#83de62', '#c7c7c7', '#f25b3d']}
            legendColor={mode === 'light' ? '#000000' : '#ffffff'}
            data={pieChartData}
          />
        </DashboardCard>
        <DashboardCard xs={6} isLoading={isLoading}>
          test
        </DashboardCard>
        <DashboardCard xs={6} isLoading={isLoading}>
          test
        </DashboardCard>
      </DashboardCardContainer>
    </>
  );
}

export default DashboardPage;
