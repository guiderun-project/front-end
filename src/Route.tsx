import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageLayout } from './components/shared';
import { BROWSER_PATH } from './constants/path';
import intl, { setLocale } from './i18n/i18n';
import Admin from './pages/Admin';
import Intro from './pages/Intro';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Oauth from './pages/Oauth';
import Signup from './pages/Signup';
import { Locale } from './types/locale';

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
  const { data: locale } = useQuery<Locale>({ queryKey: ['locale'] });

  //
  //
  //
  React.useEffect(() => {
    if (!locale) {
      return;
    }

    setLocale(locale);
  }, [locale]);

  //
  //
  //

  return (
    <PageLayout>
      <IntlProvider locale={intl.locale} messages={intl.messages}>
        <RouterProvider router={router} />
      </IntlProvider>
    </PageLayout>
  );
};

export default Route;
