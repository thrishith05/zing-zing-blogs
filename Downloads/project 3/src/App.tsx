import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import NetworkServices from './pages/NetworkServices';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <NetworkServices />
      </Layout>
    </ThemeProvider>
  );
}

export default App;