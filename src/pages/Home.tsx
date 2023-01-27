import React from 'react';
import { Categories, Pagination, PizzaBlock, Skeleton, Sort, sortList } from '../components';
import { SearchContext } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { IFilterSlice, setFilters } from '../redux/slices/filterSlice';
import { fetchProductItems, TProductItem } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const { categoryId, sort } = useSelector<RootState, IFilterSlice>((state) => state.filter);
  const { items, status } = useSelector<RootState, any>((state) => state.product);

  const { searchValue } = React.useContext(SearchContext);
  const [currentPage, setCurrentPage] = React.useState(1);

  function fetchPizzas() {
    const order = sort.sortProperty.split('_')[1];
    const cat = sort.sortProperty.split('_')[0];
    const search = searchValue ? `&title=${searchValue}` : '';
    // @ts-ignore
    dispatch(fetchProductItems({ order, cat, search, categoryId, currentPage }));
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        dispatch(setFilters({ categoryId: Number(params), sort }));
      }

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
    <>
      <div className='content__top'>
        <Categories categoryId={categoryId} />
        <Sort sort={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'error' ? (
          <div>ERROR</div>
        ) : status === 'loading' ? (
          [...new Array(4)].map((_, index) => <Skeleton key={index} />)
        ) : (
          items.map((data: TProductItem, index: number) => <PizzaBlock key={index} data={data} />)
        )}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </>
  );
};

export default Home;