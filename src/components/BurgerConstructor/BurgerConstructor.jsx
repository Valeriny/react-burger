import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { setOrder, ADD_INGREDIENT, ADD_BUN, MOVE_INGREDIENT } from "../../utils/api";
import BurgerConstructorSorted from "../BurgerConstructorSorted/BurgerConstructorSorted";
import { v4 as uuidv4 } from 'uuid';


function BurgerConstructor() {

  const [isOpenModal, setisOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setisOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setisOpenModal(false);
  }, []);


  const dispatch = useDispatch();
  
  const ingredients = useSelector(store => store.burgerIngredients.ingredients); 
  const bun = useSelector(store => store.burgerIngredients.bun); 
  const buns = bun.slice(bun.length - 1); 
  const orderData = useSelector(store => store.orderData.order); 
  const burger = [...buns, ...ingredients];

  const [disabled, setDisabled] = useState(true);

  const checkBurger = () => {
    if(bun.length > 0 && ingredients.length > 0) {
      setDisabled(false)
    }
  }

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.props.type === 'bun') {
        dispatch({
          type: ADD_BUN,
          data: item.props,
        })
      } 
      else {
        addIngredient(item, uuidv4());
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  })

  const outlineColor = isHover ? 'lightgreen' : '#131316';

  const addIngredient = (ing) => {
    const uuid = uuidv4();
    dispatch({
      type: ADD_INGREDIENT,
      data: ing.props,
      uuid: uuid,
    })
    checkBurger();
  }

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      itemFrom: dragIndex,
      itemTo: hoverIndex,
    })
  }, [ingredients]);

  const showModal = () => { 
    dispatch(setOrder(burger.map(item => item._id)));
    openModal();
  }

  const hideModal = () => { 
    closeModal();
    setDisabled(true)
  }

  const numberBun = 0; 
  const priceBuns = buns[numberBun]?.price * 2; 

  const totalPrice = (ingredients.length > 0 && buns.length > 0) && 
  ingredients.reduce((s, v) => s + v.price, priceBuns).toString();

  const bunUpper = buns.map((item) => { 
    return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={item.name + '\n(верх)'}
          price={item.price}
          thumbnail={item.image}
        />
      )
    })

  const bunBottom = buns.map((item) => { 
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name + '\n(низ)'}
        price={item.price}
        thumbnail={item.image}
      />
    )
  })

  return(
    <div className={styles["burger-constructor"]} ref={dropRef} style={{outlineColor}}>
         {isOpenModal && (
        <Modal closeModal={hideModal}>
          <OrderDetails orderData={orderData}/>
        </Modal>
      )}
      <div className={styles["burger-constructor__element-border"]}>
        {bunUpper[numberBun]}
      </div>
      <ul className={styles["burger-constructor-element__list"]}>
        {ingredients.map((ing, index) => {
          ing.index = index;
          return (
            <li key={ing.uuid} className={styles["burger-constructor__element"]}>
              <BurgerConstructorSorted ing={ing} index={index} moveIngredient={moveIngredient} />
            </li> 
          )
        })}
      </ul>
      <div className="pl-8 mt-4">
        {bunBottom[numberBun]}
      </div>
      <div className={styles["burger-constructor__order"]}>
        <div className={styles["burger-constructor__order-result"]}>
          {burger.length > 0 && (
            <>
              <p className="text text_type_digits-medium">{totalPrice}</p>
            </>
          )}
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => {showModal()}} disabled={disabled}>
          Оформить заказ
        </Button>
      </div>   
    </div>
  )
}

export default BurgerConstructor;