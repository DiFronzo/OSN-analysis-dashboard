import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import SearchPage from '../pages/SearchPage';
import TablePage from '../pages/TablePage';

function Router() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default Router;
