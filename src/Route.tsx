import React, { Suspense } from 'react';

import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { ErrorBoundary, PageLayout, ProtectedRoute } from './components/shared';
import { BROWSER_PATH } from './constants/path';
import enMessages from './i18n/messages/en.json';
import koMessages from './i18n/messages/ko.json';
import Admin from './pages/Admin';
import AdminEvent from './pages/Admin/AdminEvent';
import AdminUser from './pages/Admin/AdminUser';
import AllEvent from './pages/Event/pages/AllEvent';
import EventCalendar from './pages/Event/pages/EventCalendar';
import EventSearch from './pages/Event/pages/EventSearch';
import MyEvent from './pages/Event/pages/MyEvent';
import FindIdPassword from './pages/FindIdPassword';
import Info from './pages/Info';
import Intro from './pages/Intro';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Main from './pages/Main';
import MainRoot from './pages/Main/MainRoot';
import Mypage from './pages/Mypage';
import NotFound from './pages/NotFound';
import Oauth from './pages/Oauth';
import Signup from './pages/Signup';
import { RootState } from './store';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      // {
      //   path: BROWSER_PATH.MAIN,
      //   element: <MainRoot />,
      //   children: [
      //     {
      //       path: '/',
      //       element: <Main />,
      //     },
      //     {
      //       path: BROWSER_PATH.EVENT.ALL,
      //       element: <AllEvent />,
      //     },
      //     {
      //       path: BROWSER_PATH.EVENT.MY,
      //       element: <MyEvent />,
      //     },
      //     {
      //       path: BROWSER_PATH.EVENT.UPCOMING,
      //       element: <UpcomingEvent />,
      //     },
      //     {
      //       path: BROWSER_PATH.CALENDAR,
      //       element: <Calendar />,
      //     },
      //     {
      //       path: BROWSER_PATH.SEARCH,
      //       element: <Search />,
      //     },
      //   ],
      // },
      // {
      //   path: BROWSER_PATH.EVENT.MAIN,
      //   element: <DetailEvent />,
      //   children: [
      //     {
      //       path: `${BROWSER_PATH.EVENT.MAIN}/:eventId`,
      //       element: <DetailEvent />,
      //     },
      //   ],
      // },
      {
        path: BROWSER_PATH.INTRO,
        element: (
          <PageLayout>
            <Intro />
          </PageLayout>
        ),
      },
      {
        path: BROWSER_PATH.OAUTH,
        element: <Oauth />,
      },
      {
        path: BROWSER_PATH.LOGIN,
        element: (
          <PageLayout>
            <Login />
          </PageLayout>
        ),
      },
      {
        path: BROWSER_PATH.FIND_ID_PASSWORD,
        element: (
          <PageLayout>
            <FindIdPassword />
          </PageLayout>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainRoot />,
            children: [
              {
                path: BROWSER_PATH.MAIN,
                element: <Main />,
              },
              {
                path: BROWSER_PATH.EVENT.ALL,
                element: <AllEvent />,
              },
              {
                path: BROWSER_PATH.EVENT.MY,
                element: <MyEvent />,
              },
              {
                path: BROWSER_PATH.EVENT.CALENDAR,
                element: <EventCalendar />,
              },
              {
                path: BROWSER_PATH.EVENT.SEARCH,
                element: <EventSearch />,
              },
            ],
          },
          {
            path: BROWSER_PATH.SIGNUP,
            element: (
              <PageLayout>
                <Signup />
              </PageLayout>
            ),
          },
          {
            path: BROWSER_PATH.ADMIN.MAIN,
            element: <Admin />,
            children: [
              {
                path: BROWSER_PATH.ADMIN.USER,
                element: <AdminUser />,
              },
              {
                path: BROWSER_PATH.ADMIN.EVENT,
                element: <AdminEvent />,
              },
            ],
          },
          {
            path: BROWSER_PATH.MYPAGE,
            element: <Mypage />,
          },
          {
            path: BROWSER_PATH.INFO,
            element: <Info />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const Route: React.FC = () => {
  const locale = useSelector((state: RootState) => state.locale.locale);

  // useSuspenseQuery({queryKey: [], queryFn: () => authApi.accessTokenGet(), })

  const messages = locale === 'ko' ? koMessages : enMessages;

  //
  //
  //

  return (
    <>
      <Suspense fallback={<Loading />}>
        <IntlProvider locale={locale} messages={messages}>
          <RouterProvider router={router} />
        </IntlProvider>
      </Suspense>
    </>
  );
};

export default Route;
