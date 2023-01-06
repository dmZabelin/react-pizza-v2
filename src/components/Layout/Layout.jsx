import React from 'react';
import { Header } from '../Header';

export const Layout = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>{children}</div>
      </div>
    </div>
  );
};
