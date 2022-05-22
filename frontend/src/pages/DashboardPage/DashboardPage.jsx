import React, { useEffect } from 'react';
import { Grid, Card } from '@mui/material';
// import { useLocation } from 'react-router-dom';
import PieChart from '../../components/PieChart';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useSearchContext } from '../../contexts/search';
import charts from '../../services/charts';

const labels = ['Positive', 'Neutral', 'Negative'];

function DashboardPage() {
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

  const getPieData = () => {
    if (!results) {
      return null;
    }
    return results.polarity.map(({ analysis }) => analysis);
  };

  useEffect(() => {
    if (results?.polarity || isLoading) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await charts.getPieChartData(query);
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

  return (
    <DashboardLayout>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={8}>
          <Card sx={{ height: '100%' }}>
            <p>Test</p>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: '100%' }}>
            {results && results.polarity && (
              <PieChart
                labels={labels}
                colors={['#0000ff', '#c3c3c3', '#ff0000']}
                data={getPieData()}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>Test</Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: '100%' }}>Test</Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DashboardPage;
