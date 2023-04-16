import { useState, useEffect } from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerIngredientsConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";
import {getIngredients} from "../../utils/api";
import { BurgerContext } from "../../services/BurgerContext";
import AppHeader from "../AppHeader/AppHeader";

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
      <AppHeader/>
      <main className={styles.App}>
        <BurgerIngredients />
        <BurgerIngredientsConstructor />
      </main>
    </BurgerContext.Provider>
  );
};

export default App;
