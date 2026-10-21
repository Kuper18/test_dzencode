import type { RouteObject } from 'react-router';
import AuthGuard from '../guards/auth-guard';
import CLIENT_ROUTES from '../constants/client-routes';
import Home from '../pages/home';
import DashboardLayout from '../components/layout/dashboard';

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [
      {
        Component: DashboardLayout,
        children: [
          {
            path: CLIENT_ROUTES.home,
            Component: Home,
          },
        ],
      },
    ],
  },
];
