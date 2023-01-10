import React from 'react';
import { Categories, Sort, sortList } from '../components';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import { Layout } from '../components/Layout';
import { SearchContext } from '../context';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  function fetchPizzas() {
    const order = sort.sortProperty.split('_')[1];
    const cat = sort.sortProperty.split('_')[0];
    const search = searchValue ? `&title=${searchValue}` : '';

    setIsLoading(true);
    axios
      .get(
        `https://63a9b662594f75dc1dbe1f39.mockapi.io/items?page=${currentPage}&limit=4${search}${
          categoryId > 0 ? `&category=${categoryId}` : ''
        }&sortBy=${cat}&order=${!order ? 'asc' : order}`,
      )
      .then(({ data }) => {
        setPizzas(data);
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  return (
    <Layout>
      <div className='content__top'>
        <Categories />
        <Sort />
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
