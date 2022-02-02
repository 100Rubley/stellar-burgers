import {
  HIDE_INGREDIENTS_MODAL,
  REMOVE_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENTS_ERROR,
  SET_INGREDIENTS_REQUEST,
  SET_INGREDIENTS_SUCCESS,
  SHOW_INGREDIENTS_MODAL,
} from "../../services/actions/action-types";
import { IIngredient, IItem } from "./types";

// Типы для ingredients action-creator's

export type TSetIngredientsSuccess = {
  type: typeof SET_INGREDIENTS_SUCCESS;
  ingredients: Array<IIngredient>;
};

export type TSetIngredientsRequest = {
  type: typeof SET_INGREDIENTS_REQUEST;
};

export type TSetIngredientsError = {
  type: typeof SET_INGREDIENTS_ERROR;
};

export type TSetCurrentIngredient = {
  type: typeof SET_CURRENT_INGREDIENT;
  ingredient: IIngredient;
};

export type TRemoveCurrentIngredient = {
  type: typeof REMOVE_CURRENT_INGREDIENT;
};

export type TShowIngredientsModal = {
  type: typeof SHOW_INGREDIENTS_MODAL;
};

export type THideIngredientsModal = {
  type: typeof HIDE_INGREDIENTS_MODAL;
};

export type TIngredientsAction =
  | TSetIngredientsSuccess
  | TSetIngredientsRequest
  | TSetIngredientsError
  | TSetCurrentIngredient
  | TRemoveCurrentIngredient
  | TShowIngredientsModal
  | THideIngredientsModal;

// ______________________

// Типы для ingredients reduser
export type TIngredientsReducer = {
  ingredients: Array<IIngredient>;
  ingredientsError: boolean;
  ingredientsRequest: boolean;

  currentIngredient: IItem | {};

  isModal: boolean;
};
// ____________________________
