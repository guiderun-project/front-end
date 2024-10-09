import React, { Suspense } from 'react';

import { Stack } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import App from './App';
import {
  ErrorBoundary,
  NavBar,
  PageLayout,
  ProtectedRoute,
} from './components/shared';
import { BROWSER_PATH } from './constants/path';
import enMessages from './i18n/messages/en.json';
import koMessages from './i18n/messages/ko.json';
import { RootState } from './store';

const Admin = React.lazy(() => import('./pages/Admin'));
const AdminEvent = React.lazy(() => import('./pages/Admin/pages/AdminEvent'));
const AdminMain = React.lazy(() => import('./pages/Admin/pages/AdminMain'));
const AdminUser = React.lazy(() => import('./pages/Admin/pages/AdminUser'));
const AdminWithdraw = React.lazy(
  () => import('./pages/Admin/pages/AdminWithdraw'),
);
const AllEvent = React.lazy(() => import('./pages/Event/pages/AllEvent'));
const EditEvent = React.lazy(() => import('./pages/Event/pages/EditEvent'));
const EditEventApply = React.lazy(
  () => import('./pages/Event/pages/EditEventApply'),
);
const EventApply = React.lazy(() => import('./pages/Event/pages/EventApply'));
const EventApplyDetail = React.lazy(
  () => import('./pages/Event/pages/EventApplyDetail'),
);
const EventCalendar = React.lazy(
  () => import('./pages/Event/pages/EventCalendar'),
);
const EventDetail = React.lazy(() => import('./pages/Event/pages/EventDetail'));
const EventHistory = React.lazy(
  () => import('./pages/Event/pages/EventHistory'),
);
const EventSearch = React.lazy(() => import('./pages/Event/pages/EventSearch'));
const MyEvent = React.lazy(() => import('./pages/Event/pages/MyEvent'));
const NewEvent = React.lazy(() => import('./pages/Event/pages/NewEvent'));
const FindIdPassword = React.lazy(() => import('./pages/FindIdPassword'));
const Info = React.lazy(() => import('./pages/Info'));
const Intro = React.lazy(() => import('./pages/Intro'));
const Loading = React.lazy(() => import('./pages/Loading'));
const Login = React.lazy(() => import('./pages/Login'));
const Main = React.lazy(() => import('./pages/Main'));
const MainRoot = React.lazy(() => import('./pages/Main/MainRoot'));
const Mypage = React.lazy(() => import('./pages/Mypage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Oauth = React.lazy(() => import('./pages/Oauth'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Withdraw = React.lazy(() => import('./pages/Withdraw'));

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
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
        path: BROWSER_PATH.SIGNUP,
        element: (
          <PageLayout>
            <Signup />
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
            path: BROWSER_PATH.ADMIN.MAIN,
            element: <Admin />,
            children: [
              {
                path: BROWSER_PATH.ADMIN.MAIN,
                element: <AdminMain />,
              },
              {
                path: BROWSER_PATH.ADMIN.USER,
                element: <AdminUser />,
              },
              {
                path: BROWSER_PATH.ADMIN.WITHDRAW,
                element: <AdminWithdraw />,
              },
              {
                path: BROWSER_PATH.ADMIN.EVENT,
                element: <AdminEvent />,
              },
            ],
          },
          {
            element: (
              <PageLayout>
                <Stack padding="5rem 0" marginBottom="2.9375rem" gap="3.75rem">
                  <Outlet />
                </Stack>
                <NavBar />
              </PageLayout>
            ),
            children: [
              {
                path: BROWSER_PATH.MYPAGE,
                element: <Mypage />,
              },
              {
                path: BROWSER_PATH.EVENT.HISTORY,
                element: <EventHistory />,
              },
              {
                path: BROWSER_PATH.INFO,
                element: <Info />,
              },
              {
                path: `${BROWSER_PATH.PROFILE}/:userId`,
                element: <Profile />,
              },
              {
                path: `${BROWSER_PATH.WITHDRAW}`,
                element: <Withdraw />,
              },
              {
                path: BROWSER_PATH.EVENT.NEW,
                element: <NewEvent />,
              },
              {
                path: `${BROWSER_PATH.EVENT.EDIT}/:eventId`,
                element: <EditEvent />,
              },
              {
                path: `${BROWSER_PATH.EVENT.APPLY}/:eventId`,
                element: <EventApply />,
              },
              {
                path: `${BROWSER_PATH.EVENT.APPLY_EDIT}/:eventId`,
                element: <EditEventApply />,
              },
              {
                path: `${BROWSER_PATH.EVENT.APPLY_DETAIL}/:eventId`,
                element: <EventApplyDetail />,
              },
              {
                path: `${BROWSER_PATH.EVENT.DETAIL}/:eventId`,
                element: <EventDetail />,
              },
            ],
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
