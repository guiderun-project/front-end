import React from 'react';

import ReactDOM from 'react-dom/client';

import Route from './Route';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>,
);
