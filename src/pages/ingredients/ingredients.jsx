import styles from "./ingredients.module.css";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

function IngredientsPage () {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  )
}

export default IngredientsPage;