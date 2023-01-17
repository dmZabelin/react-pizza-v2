import * as React from 'react';
import './scss/app.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SearchContext } from './context';

const App = () => {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <RouterProvider router={router} />
    </SearchContext.Provider>
  );
};

export default App;
