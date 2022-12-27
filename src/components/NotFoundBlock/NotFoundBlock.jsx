import React from 'react';
import styles from './NotFoundBlock.module.scss';
import { Layout } from '../Layout';

const NotFoundBlock = () => {
  return (
    <Layout>
      <h1 className={styles.title}>
        <span>😒</span>Ничего не найдено.
      </h1>
    </Layout>
  );
};

export default NotFoundBlock;
