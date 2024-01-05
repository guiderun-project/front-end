import React from 'react';

import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout } from './components/shared';
import { BROWSER_PATH } from './constants/path';
import enMessages from './i18n/messages/en.json';
import koMessages from './i18n/messages/ko.json';
import Admin from './pages/Admin';
import Intro from './pages/Intro';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Oauth from './pages/Oauth';
import Signup from './pages/Signup';
import { RootState } from './store';

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
  const locale = useSelector((state: RootState) => state.locale.locale);

  const messages = locale === 'ko' ? koMessages : enMessages;

  //
  //
  //

  return (
    <PageLayout>
      <IntlProvider locale={locale} messages={messages}>
        <RouterProvider router={router} />
      </IntlProvider>
    </PageLayout>
  );
};

export default Route;
