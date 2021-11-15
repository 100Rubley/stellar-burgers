import { SET_CURRENT_INGREDIENT, SET_INGREDIENTS_ERROR, SET_INGREDIENTS_REQUEST, SET_INGREDIENTS_SUCCESS, REMOVE_CURRENT_INGREDIENT, BASE_URL } from "../../utils/constants"

const initialState = {
  ingredients: [],
  ingredientsError: false,
  ingredientsRequest: false,

  currentIngredient: {},
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true }
    case SET_INGREDIENTS_ERROR:
      return { ...state, ingredientsError: true, ingredientsRequest: false }
    case SET_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.ingredients, ingredientsError: false, ingredientsRequest: false }

    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: { ...action.ingredient } }
    case REMOVE_CURRENT_INGREDIENT:
      return {...state, currentIngredient: {}}
    default:
      return state
  }
}


