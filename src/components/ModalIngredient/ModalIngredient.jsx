import PropTypes from "prop-types";
import styles from "./ModalIngredient.module.css";

const ModalIngredient = (props) => {
  return (
    <div className={`${styles["modal-ingredient"]} pt-10 pb-15`}>
      <h1
        className={`${styles["modal-ingredient__header"]} text text_type_main-large`}
      >
        Детали ингредиента
      </h1>
      <img src={props.ingredient.image_large} alt={props.ingredient.name} />
      <p className="text text_type_main-medium mb-8 mt-4">
        {props.ingredient.name}
      </p>
      <div className={`${styles["modal-ingredient__container"]}`}>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.calories}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.proteins}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.fat}
          </p>
        </div>
        <div className={`${styles["modal-ingredient__nutrients"]}`}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

ModalIngredient.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.string,
  proteins: PropTypes.string,
  fat: PropTypes.string,
  carbohydrates: PropTypes.string,
};

export default ModalIngredient;
