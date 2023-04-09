import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredients.module.css';
import PropTypes from "prop-types"

const Ingredients = (props) => {
  return (
    <li className={styles.ingredient} onClick={props.openModal}>    
      <img src={props.image} alt={props.name} />
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={styles.price}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.title} text text_type_main-default pb-8`}>{props.name}</p>
    </li>
  )
}

Ingredients.propTypes = {
  image:PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
}

export default Ingredients;







