import React, { useState } from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Order from '../Order/Order';
import styles from "./BurgerIngredientsConstructor.module.css";
import Modal from '../Modal/Modal';
import PropTypes from "prop-types";
import {ingredientsPropType} from '../../utils/prop-types.js';



const BurgerIngredientsConstructor = (props) => {

  const ingredients = props.ingredients;
  const filteredIngredientsBuns = ingredients.filter((item) => {
    return item.type === "bun";
  });
  const filteredIngredientsWithoutBuns = ingredients.filter((item) => {
    return item.type !== "bun";
  });

  const totalPrice = ingredients.reduce(
    (number, ingredients) => {     
      return ingredients.type === "bun"      
        ? 1255 * 2
        : number + ingredients.price;
    },
    0
  );

  const [isOpenModal, setIsOpenModal] = useState(false);


  const OpenModal = () => {  
    setIsOpenModal(true);  
  }

  const CloseModal = () => {
    setIsOpenModal(false); 
  }

  
  return (
    <section className={`${styles["burger-constructor"]}`}>
      {isOpenModal &&
        <Modal CloseModal={CloseModal}>
          <Order/>
        </Modal>
      }
      {filteredIngredientsBuns.length > 0 && (
        <div className={`${styles["burger-constructor__element"]} pl-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + "\n(верх)"}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}
      <ul className={`${styles['burger-constructor__list']}`}>
        {filteredIngredientsWithoutBuns.map((item) => (
          <li className={`${styles['burger-constructor__element']}`} key={item._id} >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      {filteredIngredientsBuns.length >= 1 && (
        <div className={`${styles['burger-constructor__element']} pl-8 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={filteredIngredientsBuns[0].name + '\n(низ)'}
            price={filteredIngredientsBuns[0].price}
            thumbnail={filteredIngredientsBuns[0].image}
          />
        </div>
      )}
      < div className={`${styles['burger-constructor__order']} mt-10`}>
        <div className={`${styles['burger-constructor__order-price']}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={OpenModal}>
          Оформить заказ
        </Button>
      </div>

    </section>
  );
}

BurgerIngredientsConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType).isRequired,
};

export default BurgerIngredientsConstructor;
