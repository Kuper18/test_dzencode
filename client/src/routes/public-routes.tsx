import { type RouteObject } from 'react-router';

import PublicGuard from '../guards/public-guard';

import CLIENT_ROUTES from '../constants/client-routes';
import Login from '../pages/login';
import Signup from '../pages/signup';
import AnimatedLayout from '../components/layout/animeted';

export const publicRoutes: RouteObject[] = [
  {
    Component: AnimatedLayout,
    children: [
      {
        Component: PublicGuard,
        children: [
          {
            path: CLIENT_ROUTES.login,
            Component: Login,
          },
          {
            path: CLIENT_ROUTES.signup,
            Component: Signup,
          },
        ],
      },
    ],
  },
];
