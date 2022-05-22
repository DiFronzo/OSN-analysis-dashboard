import React from 'react';
import Router from './routes/Router';

import { SearchProvider } from './contexts/search';

function App() {
  return (
    <SearchProvider>
      <Router />
    </SearchProvider>
  );
}

export default App;
