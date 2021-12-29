import { BASE_URL, SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_REQUEST, SET_INGREDIENTS_ERROR, SET_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } from "../../utils/constants"
import { checkResponse } from'../../utils/common'

export const setIngredientsSuccess = ingredients => ({ type: SET_INGREDIENTS_SUCCESS, ingredients })
export const setIngredientsRequest = () => ({ type: SET_INGREDIENTS_REQUEST })
export const setIngredientsError = () => ({ type: SET_INGREDIENTS_ERROR })
export const setCurrentIngredient = ingredient => ({ type: SET_CURRENT_INGREDIENT, ingredient })
export const removeCurrentIngredient = () => ({ type: REMOVE_CURRENT_INGREDIENT })

export const requestIngredients = () => dispatch => {
  dispatch(setIngredientsRequest())
  fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(setIngredientsSuccess(res.data));
      }
    })
    .catch(err => {
      dispatch(setIngredientsError())
      console.log(err)
    })
};
