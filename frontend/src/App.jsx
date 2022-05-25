import React from 'react';
import { CssBaseline } from '@mui/material';
import Router from './routes/Router';
import { ColorModeProvider } from './contexts/ColorMode';

function App() {
  return (
    <ColorModeProvider>
      <CssBaseline />
      <Router />
    </ColorModeProvider>
  );
}

export default App;
