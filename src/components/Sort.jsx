import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'цене (по убыванию)', sortProperty: 'price_desc' },
  { name: 'цене (по возрастанию)', sortProperty: 'price_asc' },
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'алфавиту', sortProperty: 'title' },
];

export const Sort = () => {
  const dispatch = useDispatch();

  const sortRef = React.useRef(null);

  const [isVisible, setIsVisible] = React.useState(false);
  const { sort } = useSelector((state) => state.filter);
  const sortedBy = sort.name;

  function closeSortDropdown(event) {
    if (!sortRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', closeSortDropdown);
    return () => {
      document.removeEventListener('click', closeSortDropdown);
    };
  }, []);

  function handleItemClick(sort) {
    dispatch(setSortBy(sort));
    setIsVisible(false);
  }

  return (
    <div className='sort' ref={sortRef}>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible((prev) => !prev)}>{sortedBy}</span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleItemClick(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'selected' : ''}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
