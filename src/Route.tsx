import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Admin from './pages/Admin';
import Intro from './pages/Intro';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Route: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Route;
