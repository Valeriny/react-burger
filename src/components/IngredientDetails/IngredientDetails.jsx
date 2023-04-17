import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles["modal-ingredient"]} pt-10 pb-15`}>
      <h1
        className={`${styles["modal-ingredient__header"]} text text_type_main-large`}
      >
        Детали ингредиента
      </h1>
      <img src={ingredient.image} alt={ingredient.name} className={`${styles["image"]}`}/>
      <p className="text text_type_main-medium mb-8 mt-4">
        {ingredient.name}
      </p>
      <div className={`${styles["modal-ingredient__container"]}`}>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default IngredientDetails;






