import { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getDetailsIngredient, deleteDetailsIngredient } from "../../utils/api";

function BurgerIngredients() {
  const [isOpenModal, setisOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setisOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setisOpenModal(false);
  }, []);

  const ingredients = useSelector((store) => store.ingredients.data);

  const [currentTypeTab, setCurrentTypeTab] = useState("bun");
  const container = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();

  const dispatch = useDispatch();

  const filterIngredientsBuns = ingredients.filter((item) => {
    return item.type === "bun";
  });
  const filterIngredientsSauce = ingredients.filter((item) => {
    return item.type === "sauce";
  });
  const filterIngredientsMain = ingredients.filter((item) => {
    return item.type === "main";
  });

  const showModal = (element) => {
    dispatch(getDetailsIngredient(element));
    openModal();
  };

  const hideModal = () => {
    dispatch(deleteDetailsIngredient());
    closeModal();
  };

  const handleScroll = () => {
    if (
      container.current.getBoundingClientRect().top >
      bunsRef.current.getBoundingClientRect().top
    ) {
      setCurrentTypeTab("bun");
    }
    if (
      container.current.getBoundingClientRect().top >
      saucesRef.current.getBoundingClientRect().top
    ) {
      setCurrentTypeTab("sauce");
    }
    if (
      container.current.getBoundingClientRect().top >
      mainRef.current.getBoundingClientRect().top
    ) {
      setCurrentTypeTab("main");
    }
  };

  const setTab = (state, element) => {
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {isOpenModal && (
        <Modal closeModal={hideModal}>
          <IngredientDetails />
        </Modal>
      )}
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={currentTypeTab === "bun"}
          onClick={(e) => {
            setTab(e, bunsRef);
          }}
          id={"bun"}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTypeTab === "sauce"}
          onClick={(e) => {
            setTab(e, saucesRef);
          }}
          id={"sauce"}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTypeTab === "main"}
          onClick={(e) => {
            setTab(e, mainRef);
          }}
          id={"main"}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={styles["burger__ingredients"]}
        ref={container}
        onScroll={handleScroll}
      >
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
          Булки
        </h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsBuns.map((item) => {
            return (
              <Ingredient
                key={item._id}
                {...item}
                openModal={() => showModal(item)}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          Соусы
        </h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsSauce.map((item) => {
            return (
              <Ingredient
                key={item._id}
                {...item}
                openModal={() => showModal(item)}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
          Начинки
        </h2>
        <ul className={styles["burger__ingredients-list"]}>
          {filterIngredientsMain.map((item) => {
            return (
              <Ingredient
                key={item._id}
                {...item}
                openModal={() => showModal(item)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngredients;
