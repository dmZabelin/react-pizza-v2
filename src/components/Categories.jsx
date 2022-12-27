import React from 'react';

const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
  const [isCategoryActive, setIsCategoryActive] = React.useState(0);

  return (
    <div className='categories'>
      <ul>
        {categoriesArr.map((item, index) => {
          return (
            <li
              onClick={() => setIsCategoryActive(index)}
              key={index}
              className={isCategoryActive === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
