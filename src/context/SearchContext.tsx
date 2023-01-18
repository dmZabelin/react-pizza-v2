import React from 'react';

interface ISearchContext {
  searchValue: string;
  setSearchValue: (str: string) => void;
}

export const SearchContext = React.createContext<ISearchContext>({
  searchValue: '',
  setSearchValue: (str) => {
  },
});
