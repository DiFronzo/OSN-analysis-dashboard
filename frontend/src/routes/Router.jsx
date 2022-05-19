import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import Table from '../pages/Table';

function Router() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default Router;
