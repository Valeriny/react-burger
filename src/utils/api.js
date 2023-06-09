export const GET_LIST_INGREDIENTS_REQUEST = "GET_LIST_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_NUMBER_ORDER = "GET_NUMBER_ORDER";
export const GET_NUMBER_ORDER_SUCCESS = "GET_NUMBER_ORDER_SUCCESS";
export const GET_NUMBER_ORDER_FAILED = "GET_NUMBER_ORDER_FAILED";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const DELETE_INFO_INGREDIENT = "DELETE_INFO_INGREDIENT";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
  return fetch(`${BURGER_API_URL}/${url}`, options).then((res) =>
    checkResponse(res)
  );
};

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_INGREDIENTS_REQUEST,
    });

    request("ingredients")
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  };
};

export const setOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_NUMBER_ORDER,
    });

    fetch(`${BURGER_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        dispatch({
          type: GET_NUMBER_ORDER_SUCCESS,
          order: res.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_NUMBER_ORDER_FAILED,
          error: err.message,
        });
      });
  };
};

export const getDetailsIngredient = (ingredient) => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
};

export const deleteDetailsIngredient = () => {
  return {
    type: DELETE_INFO_INGREDIENT,
  };
};
