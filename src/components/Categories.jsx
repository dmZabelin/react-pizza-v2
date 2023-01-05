import React from 'react';

const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ value, getCategoryId }) => {
  return (
    <div className='categories'>
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              onClick={() => getCategoryId(index)}
              key={index}
              className={value === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
