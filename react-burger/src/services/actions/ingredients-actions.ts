import {
  SET_INGREDIENTS_SUCCESS,
  SET_INGREDIENTS_REQUEST,
  SET_INGREDIENTS_ERROR,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  SHOW_INGREDIENTS_MODAL,
  HIDE_INGREDIENTS_MODAL,
} from "./action-types";
import { checkResponse } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";
import { IIngredient } from "../../utils/types/types";
import {
  THideIngredientsModal,
  TSetCurrentIngredient,
  TSetIngredientsError,
  TSetIngredientsRequest,
  TSetIngredientsSuccess,
  TShowIngredientsModal,
} from "../../utils/types/ingredients-typs";

export const setIngredientsSuccess = (
  ingredients: Array<IIngredient>
): TSetIngredientsSuccess => ({ type: SET_INGREDIENTS_SUCCESS, ingredients });
export const setIngredientsRequest = (): TSetIngredientsRequest => ({
  type: SET_INGREDIENTS_REQUEST,
});
export const setIngredientsError = (): TSetIngredientsError => ({
  type: SET_INGREDIENTS_ERROR,
});
export const setCurrentIngredient = (
  ingredient: IIngredient
): TSetCurrentIngredient => ({ type: SET_CURRENT_INGREDIENT, ingredient });
export const removeCurrentIngredient = () => ({
  type: REMOVE_CURRENT_INGREDIENT,
});

export const showIngredientsModal = (): TShowIngredientsModal => ({
  type: SHOW_INGREDIENTS_MODAL,
});
export const hideIngredientsModal = (): THideIngredientsModal => ({
  type: HIDE_INGREDIENTS_MODAL,
});

export const requestIngredients = () => (dispatch: any) => {
  dispatch(setIngredientsRequest());
  fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(setIngredientsSuccess(res.data));
      }
    })
    .catch((err) => {
      dispatch(setIngredientsError());
      console.log(err);
    });
};
