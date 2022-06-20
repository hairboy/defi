import React from 'react';
import ReactDOM from 'react-dom/client'
import { MetaMaskProvider } from "metamask-react";
import { MoralisProvider } from "react-moralis";

import { App } from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <MoralisProvider serverUrl='https://k7xky3r8xxmu.usemoralis.com:2053/server' appId='gR3N2CCoktgV6rJBi0balDkWeQ3H0DGiZZ0uXNd4'>
      <App />
      </MoralisProvider>
    </MetaMaskProvider>
  </React.StrictMode>
);
