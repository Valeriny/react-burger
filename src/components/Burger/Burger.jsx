import React, { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerIngredientsConstructor from "../BurgerIngredientsConstructor/BurgerIngredientsConstructor";
import styles from "./Burger.module.css";
import getIngredients from "../../utils/api.js";

const Burger = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((res) => {
      setIngredients(res.data);
    });
  }, []);

  return (
    <main className={styles.Burger}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerIngredientsConstructor ingredients={ingredients} />
    </main>
  );
};

export default Burger;
