import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Layout } from '../components/Layout';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortBy, setSortBy] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63a9b662594f75dc1dbe1f39.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy.sort}&order=desc`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortBy]);
  return (
    <Layout>
      <div className='content__top'>
        <Categories value={categoryId} getCategoryId={(id) => setCategoryId(id)} />
        <Sort value={sortBy} onChangeSort={(type) => setSortBy(type)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((data, index) => <PizzaBlock key={index} data={data} />)}
      </div>
    </Layout>
  );
};
