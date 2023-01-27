import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './components';
import { lazy } from 'react';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const SinglePizza = lazy(() => import(/* webpackChunkName: "SinglePizza" */ './pages/SinglePizza'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'product/:id',
        element: <SinglePizza />,
      },
    ],
  },
]);
