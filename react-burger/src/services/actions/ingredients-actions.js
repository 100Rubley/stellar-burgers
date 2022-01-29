import { SET_INGREDIENTS_SUCCESS, SET_INGREDIENTS_REQUEST, SET_INGREDIENTS_ERROR, SET_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT, SHOW_INGREDIENTS_MODAL, HIDE_INGREDIENTS_MODAL } from "./action-types"
import { checkResponse } from '../../utils/common.ts'
import { BASE_URL } from "../../utils/constants"

export const setIngredientsSuccess = ingredients => ({ type: SET_INGREDIENTS_SUCCESS, ingredients })
export const setIngredientsRequest = () => ({ type: SET_INGREDIENTS_REQUEST })
export const setIngredientsError = () => ({ type: SET_INGREDIENTS_ERROR })
export const setCurrentIngredient = ingredient => ({ type: SET_CURRENT_INGREDIENT, ingredient })
export const removeCurrentIngredient = () => ({ type: REMOVE_CURRENT_INGREDIENT })

export const showIngredientsModal = () => ({ type: SHOW_INGREDIENTS_MODAL })
export const hideIngredientsModal = () => ({ type: HIDE_INGREDIENTS_MODAL })

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
