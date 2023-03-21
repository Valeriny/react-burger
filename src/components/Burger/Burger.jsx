import styles from './Burger.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerIngredientsConstructor from '../BurgerIngredientsConstructor/BurgerIngredientsConstructor';
import data from '../../utils/data';

const Burger = () => {   
  return(
    <main className={styles.Burger}>
      <BurgerIngredients ingredients={data}/>
      <BurgerIngredientsConstructor  ingredients={data}/>
    </main>
  );
}



export default Burger;
