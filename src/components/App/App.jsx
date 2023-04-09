import { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerIngredientsConstructor from "../BurgerIngredientsConstructor/BurgerIngredientsConstructor";
import styles from "./App.module.css";
import getIngredients from "../../utils/api.js";
import { BurgerContext } from "../services/BurgerContext";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BurgerContext.Provider value={{ ingredients }}>
      <main className={styles.App}>
        <BurgerIngredients />
        <BurgerIngredientsConstructor />
      </main>
    </BurgerContext.Provider>
  );
};

export default App;
