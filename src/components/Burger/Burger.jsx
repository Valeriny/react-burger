import styles from './Burger.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerIngredientsConstructor from '../BurgerIngredientsConstructor/BurgerIngredientsConstructor';
import getIngredients from '../../utils/api';

const Burger = () => {   

  const [ingredients, setIngredients] = React.useState(getIngredients());

  return(
    <main className={styles.Burger}>
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerIngredientsConstructor  ingredients={ingredients}/>
    </main>
  );
}



export default Burger;
