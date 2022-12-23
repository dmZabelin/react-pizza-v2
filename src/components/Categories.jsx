import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const [isCategoryActive, setIsCategoryActive] = React.useState(0);

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => {
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
}

export default Categories;
