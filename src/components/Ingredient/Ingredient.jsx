import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { useNavigate, useMatch } from 'react-router-dom';

function Ingredient(props) {
  const { name, price, image, openModal, _id, type } = props;
  const navigate = useNavigate();
  const match = useMatch('ingredients/:id');
  const { id } = match?.params || {};

  let countIngredients = useSelector(
    (store) =>
      store.burgerIngredients.ingredients.filter((ing) => ing._id === _id)
        .length
  );
  const bun = useSelector((store) => store.burgerIngredients.bun);
  const buns = bun.slice(bun.length - 1);
  let countBun = buns.filter((ing) => ing._id === _id).length * 2;

  const count = type === "bun" ? countBun : countIngredients;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { props },
  });

  return (
    <li className={styles.Ingredient} onClick={() => {
      if(id !== _id) {
        navigate(`/ingredients/${_id}`, { state: { background: true } });
      }
      openModal();
    }} draggable ref={dragRef}>
      
      <img src={image} alt={name} />
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={styles.price}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.title} text text_type_main-default pb-8`}>
        {name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Ingredient;
