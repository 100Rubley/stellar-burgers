import { SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_REQUEST, SET_INGREDIENTS_ERROR, SET_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from "../../utils/constants"

export const setIngredientsSuccess = ingredients => ({ type: SET_INGREDIENTS_SUCCESS, ingredients })
export const setIngredientsRequest = () => ({ type: SET_INGREDIENTS_REQUEST })
export const setIngredientsError = () => ({ type: SET_INGREDIENTS_ERROR })
export const setCurrentIngredient = ingredient => ({ type: SET_CURRENT_INGREDIENT, ingredient })
export const removeCurrentIngredient = () => ({ type: REMOVE_CURRENT_INGREDIENT })
