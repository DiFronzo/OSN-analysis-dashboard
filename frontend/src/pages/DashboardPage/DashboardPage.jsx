import { Grid, Card } from '@mui/material';
import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

function DashboardPage() {
  return (
    <DashboardLayout>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={8}>
          <Card sx={{ height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: '100%' }} />
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
