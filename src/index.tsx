import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material';
import ReactDOM from 'react-dom/client';

import Route from './Route';

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

enableMocking().then(() => {
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Route />
      </ThemeProvider>
    </React.StrictMode>,
  );
});
