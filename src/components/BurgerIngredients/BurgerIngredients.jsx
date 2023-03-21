import React, { useState } from 'react';
import styles from "./BurgerIngredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from '../Ingredients/Ingredients';

const BurgerIngredients = (props) => {

  const ingredients = props.ingredients;
 
  const [current, setCurrent] = useState('bun');

  const filterIngredientsBuns = ingredients.filter(item => {
    return item.type === "bun";
  });
  const filterIngredientsSauce = ingredients.filter(item => {
    return item.type === "sauce";
  });
  const filterIngredientsMain = ingredients.filter(item => {
    return item.type === "main";
  });
 
  return (
    <div>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles['burger-ingredients']}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filterIngredientsBuns.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filterIngredientsSauce.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles['burger-ingredients__list']}>
          {filterIngredientsMain.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}


export default BurgerIngredients;