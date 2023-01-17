import { createBrowserRouter } from 'react-router-dom';
import { Cart, Home, NotFound, SinglePizza } from './pages';
import { Layout } from './components/Layout';

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
