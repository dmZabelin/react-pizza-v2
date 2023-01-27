import React from 'react';
import { setCategoryId } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export function Categories({ categoryId }: { categoryId: number }) {
  const dispatch = useAppDispatch();
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
