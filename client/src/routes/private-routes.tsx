import type { RouteObject } from 'react-router';
import AuthGuard from '../guards/auth-guard';
import CLIENT_ROUTES from '../constants/client-routes';
import ProductPage from '../pages/product';
import DashboardLayout from '../components/layout/dashboard';
import Order from '../pages/order';
import AnimatedLayout from '../components/layout/animeted';

export const privateRoutes: RouteObject[] = [
  {
    Component: AnimatedLayout,
    children: [
      {
        Component: AuthGuard,
        children: [
          {
            Component: DashboardLayout,
            children: [
              {
                path: CLIENT_ROUTES.home,
                Component: Order,
              },
              {
                path: CLIENT_ROUTES.products,
                Component: ProductPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
