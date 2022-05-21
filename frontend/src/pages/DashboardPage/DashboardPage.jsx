import { Grid, Card } from '@mui/material';
import React from 'react';
import PieChart from '../../components/PieChart';
import DashboardLayout from '../../layouts/DashboardLayout';

function DashboardPage() {
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
            <PieChart
              labels={['Positive', 'Neutral', 'Negative']}
              colors={['#0000ff', '#c3c3c3', '#ff0000']}
              data={[30, 50, 20]}
            />
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
