import React from 'react';
import { Categories, Sort, sortList } from '../components';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import { Layout } from '../components/Layout';
import { SearchContext } from '../context';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchProductItems } from '../redux/slices/productSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.product);

  const { searchValue } = React.useContext(SearchContext);
  const [currentPage, setCurrentPage] = React.useState(1);

  function fetchPizzas() {
    const order = sort.sortProperty.split('_')[1];
    const cat = sort.sortProperty.split('_')[0];
    const search = searchValue ? `&title=${searchValue}` : '';
    dispatch(fetchProductItems({ order, cat, search, categoryId, currentPage }));
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
    if (isMounted.current && categoryId !== 0) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`/?${queryString}`);
    } else {
      navigate(`/`);
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
        {status === 'error' ? (
          <div>ERROR</div>
        ) : status === 'loading' ? (
          [...new Array(4)].map((_, index) => <Skeleton key={index} />)
        ) : (
          items.map((data, index) => <PizzaBlock key={index} data={data} />)
        )}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </Layout>
  );
};
