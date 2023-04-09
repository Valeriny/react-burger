import React, { useState } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Order from "../Order/Order";
import styles from "./BurgerIngredientsConstructor.module.css";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../utils/prop-types.js";

const BurgerIngredientsConstructor = (props) => {
  const ingredients = props.ingredients;
  const ingredientBun =
    ingredients && ingredients.find((ingredient) => ingredient.type === "bun");
  const filteredIngredientsWithoutBuns = ingredients.filter((item) => {
    return item.type !== "bun";
  });

  const totalPrice = ingredients.reduce(
    (number, ingredients) => {
      return ingredients.type === "bun"
        ? 0 + ingredients.price * 2
        : number + ingredients.price;
    },
    0
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <section className={`${styles["burger-constructor"]}`}>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <Order />
        </Modal>
      )}
      {ingredientBun && (
        <div className={`${styles["burger-constructor__element"]} pl-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={ingredientBun.name + " (верх)"}
            price={ingredientBun.price}
            thumbnail={ingredientBun.image}
          />
        </div>
      )}
      <ul className={`${styles["burger-constructor__list"]}`}>
        {filteredIngredientsWithoutBuns.map((item) => (
          <li
            className={`${styles["burger-constructor__element"]}`}
            key={item._id}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      {ingredientBun && (
        <div className={`${styles["burger-constructor__element"]} pl-8 mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={ingredientBun.name + " (низ)"}
            price={ingredientBun.price}
            thumbnail={ingredientBun.image}
          />
        </div>
      )}
      <div className={`${styles["burger-constructor__order"]} mt-10`}>
        <div className={`${styles["burger-constructor__order-price"]}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerIngredientsConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType.isRequired).isRequired,
};

export default BurgerIngredientsConstructor;
