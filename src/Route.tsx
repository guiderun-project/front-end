import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout } from './components/shared';
import { BROWSER_PATH } from './constants/path';
import Admin from './pages/Admin';
import Intro from './pages/Intro';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Oauth from './pages/Oauth';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: BROWSER_PATH.INTRO,
    element: <Intro />,
  },
  {
    path: BROWSER_PATH.OAUTH,
    element: <Oauth />,
  },
  {
    path: BROWSER_PATH.MAIN,
    element: <Main />,
  },
  {
    path: BROWSER_PATH.ADMIN,
    element: <Admin />,
  },
  {
    path: BROWSER_PATH.SIGNUP,
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Route: React.FC = () => {
  return (
    <PageLayout>
      <RouterProvider router={router} />
    </PageLayout>
  );
};

export default Route;
