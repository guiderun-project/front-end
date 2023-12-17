import React from 'react';

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

enableMocking().then(() => {
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <Route />
    </React.StrictMode>,
  );
});
