import React, { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerIngredientsConstructor from "../BurgerIngredientsConstructor/BurgerIngredientsConstructor";
import styles from "./App.module.css";
import getIngredients from "../../utils/api.js";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((res) => {
      setIngredients(res.data);
    });
  }, []);

  return (
    <main className={styles.App}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerIngredientsConstructor ingredients={ingredients} />
    </main>
  );
};

export default App;
