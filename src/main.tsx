import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import './index.css'
import App from './App.tsx'
import "./i18n";
import { BrowserRouter } from "react-router-dom";
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from './components/ui/sonner.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
    </BrowserRouter>
  </StrictMode>
)
