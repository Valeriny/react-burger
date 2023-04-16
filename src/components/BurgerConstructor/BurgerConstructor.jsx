import { useState, useContext } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import {getOrder} from "../../utils/api.js";
import { BurgerContext } from "../../services/BurgerContext.js";

const BurgerConstructor = () => {
  const { ingredients } = useContext(BurgerContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderData, setOrderData] = useState(0);

  const ingredientBun =
    ingredients && ingredients.find((ingredient) => ingredient.type === "bun");

  const ingredientsWithoutBuns = ingredients.filter((item) => {
    return item.type !== "bun";
  });

  const totalPrice = ingredients.reduce(() => {
    return (
      ingredientBun.price * 2 +
      ingredientsWithoutBuns.reduce((s, v) => s + v.price, 0)
    );
  }, 0);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setOrderData(0);
  };

  const getIngredientsId = () => {
    let ingredIds = [];
    ingredients.forEach(item => {
      ingredIds.unshift(item._id);
    })
    return ingredIds;
  };

  const placeOrder = async () => {    
    return await getOrder()
    .then((res) => setOrderData(res.order.number), openModal())
    .catch((err) =>
      console.err(err));      
  };

  return (
    <section className={`${styles["burger-constructor"]}`}>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderData={orderData} />
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
        {ingredientsWithoutBuns.map((item) => (
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
          onClick={placeOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
