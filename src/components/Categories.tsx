import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFilterSlice, setCategoryId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector<RootState, IFilterSlice>((state) => state.filter);

  return (
    <div className='categories'>
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              onClick={() => dispatch(setCategoryId(index))}
              key={index}
              className={categoryId === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
