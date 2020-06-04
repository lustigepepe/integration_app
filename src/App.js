import React from 'react';
import { Router, Link } from "@reach/router";

import { Header } from './components/Header';
import { Home } from './components/Home';
import { SlotsGeneration } from './components/SlotsGeneration';
import { CsvGeneration } from './components/CsvGeneration';
import { ConfigGeneration } from './components/ConfigGeneration';
import styled from 'styled-components';

const UrbanIntegration = styled.div`

    min-width: 470px;
`;

const App = () => {
  return (
    <UrbanIntegration>
     <Header/>
      <Router>
        <Home path="/" />
        <SlotsGeneration path="slots" />
        <CsvGeneration path="csv" />
        <ConfigGeneration path="config" />
      </Router>
    </UrbanIntegration>
  );
}

export default App;
