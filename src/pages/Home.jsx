import React from 'react';
import { Categories, Sort } from '../components';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import { Layout } from '../components/Layout';
import { SearchContext } from '../context';
import Pagination from '../components/Pagination/Pagination';

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortBy, setSortBy] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const order = sortBy.sort.split('_')[1];
    const cat = sortBy.sort.split('_')[0];
    const search = searchValue ? `title=${searchValue}` : '';

    setIsLoading(true);

    fetch(
      `https://63a9b662594f75dc1dbe1f39.mockapi.io/items?page=${currentPage}&limit=4&${search}&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${cat}&order=${!order ? 'asc' : order}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortBy, searchValue, currentPage]);
  return (
    <Layout>
      <div className='content__top'>
        <Categories value={categoryId} getCategoryId={(id) => setCategoryId(id)} />
        <Sort value={sortBy} onChangeSort={(type) => setSortBy(type)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((data, index) => <PizzaBlock key={index} data={data} />)}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </Layout>
  );
};
