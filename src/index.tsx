import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Route from './Route';
import { store } from './store';

import './index.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Failed to find the root element');
}

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const theme = createTheme({
  typography: {
    fontFamily: 'pretendard',
  },
});

const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <Route />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  );
});
