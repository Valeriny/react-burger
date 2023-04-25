import { combineReducers } from "redux";
import { getIngredientsReducer } from "./BurgerIngredients";
import { burgerConstructorReducer } from "./BurgerConstructor";
import { ingredientDetailsReducer } from "./IngredientDetails";
import { orderReducer } from "./OrderDetails";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  burgerIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  numberOrder: orderReducer,
})