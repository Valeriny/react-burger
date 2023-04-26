import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./App.module.css";
//import { BurgerContext } from "../../services/Context/BurgerContext";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from '../../utils/api';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>     
        <AppHeader />
        <main className={styles.App}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
    </>
  );
};

export default App;
