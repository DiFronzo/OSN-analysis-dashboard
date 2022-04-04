import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Start from '../pages/Start';

const Router = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default Router;
