import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import providers
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { NotificationProvider } from './contexts/NotificationContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={getDefaultConfig({
      appName: "GigsLocal",
      projectId: "9f4bd472c01ba49282b42e5e1874c2af",
      chains: [mainnet, polygon, optimism, arbitrum, base],
    })}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ToastProvider>
            <AuthProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </AuthProvider>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
