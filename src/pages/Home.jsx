import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { Layout } from '../components/Layout';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63a9b662594f75dc1dbe1f39.mockapi.io/items')
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, []);
  return (
    <Layout>
      <div className='content__top'>
        <Categories />
        <Sort />
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
