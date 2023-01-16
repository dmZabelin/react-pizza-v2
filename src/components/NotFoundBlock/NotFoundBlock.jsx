import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <h1 className={styles.title}>
      <span>😒</span>Ничего не найдено.
    </h1>
  );
};
