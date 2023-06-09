import { GET_LIST_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../../utils/api";

const initialState = {
  data: [],
  loading: false,
}

export const getIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LIST_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        loading: false,
        data: state.data,
      };
    }
    default: return state;
  }
}