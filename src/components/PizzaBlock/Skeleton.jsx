import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox='0 0 280 465'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <path d='M 0 269 h 280 v 24 H 0 z' />
    <rect x='0' y='311' rx='11' ry='11' width='280' height='88' />
    <path d='M 0 432 h 90 v 17 H 0 z' />
    <rect x='127' y='419' rx='23' ry='23' width='153' height='46' />
    <circle cx='135' cy='124' r='124' />
  </ContentLoader>
);

export default Skeleton;
