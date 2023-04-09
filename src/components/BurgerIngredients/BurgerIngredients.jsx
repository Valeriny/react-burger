import React, { useContext } from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../Ingredients/Ingredients";
import Modal from "../Modal/Modal";
import ModalIngredient from "../ModalIngredient/ModalIngredient";
import PropTypes from "prop-types";
import { ingredientsPropType } from "../../utils/prop-types.js";
import { BurgerContext } from "../services/BurgerContext.js";

const BurgerIngredients = () => {
  const { ingredients } = useContext(BurgerContext);

  const [currentTypeTab, setCurrentTypeTab] = React.useState("bun");
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [ingredient, setIngredient] = React.useState("");

  const openModal = (item) => {
    setIsOpenModal(true);
    setIngredient(item);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const filterIngredientsBuns = ingredients.filter((item) => {
    return item.type === "bun";
  });
  const filterIngredientsSauce = ingredients.filter((item) => {
    return item.type === "sauce";
  });
  const filterIngredientsMain = ingredients.filter((item) => {
    return item.type === "main";
  });

  return (
    <div>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <ModalIngredient ingredient={ingredient} />
        </Modal>
      )}
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={currentTypeTab === "bun"}
          onClick={setCurrentTypeTab}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTypeTab === "sauce"}
          onClick={setCurrentTypeTab}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTypeTab === "main"}
          onClick={setCurrentTypeTab}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles["burger__ingredients"]}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsBuns.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              openModal={() => openModal(item)}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsSauce.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              openModal={() => openModal(item)}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsMain.map((item) => (
            <Ingredients
              key={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              openModal={() => openModal(item)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropType.isRequired).isRequired,
};

export default BurgerIngredients;
