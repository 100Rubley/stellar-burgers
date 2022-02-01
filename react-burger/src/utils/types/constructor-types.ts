import {
  ADD_BUN,
  ADD_INGREDIENT,
  ADD_TO_BUN_MAP,
  ADD_TO_INGREDIENTS_MAP,
  CLEAR_CONSTRUCTOR,
  HIDE_MODAL,
  MOVE_INGREDIENT,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  REMOVE_ITEM,
  SHOW_MODAL,
} from "../../services/actions/action-types";
import { IItem } from "./types";


// Типы для constructor action-creator's
export type TShowOrderModal = {
  type: typeof SHOW_MODAL;
};

export type THideOrderModal = {
  type: typeof HIDE_MODAL;
};

export type TAddBun = {
  type: typeof ADD_BUN;
  item: IItem;
};

export type TAddIngredient = {
  type: typeof ADD_INGREDIENT;
  item: IItem;
};

export type TAddToIngredientsMap = {
  type: typeof ADD_TO_INGREDIENTS_MAP;
  id: string;
};

export type TAddToBunMap = {
  type: typeof ADD_TO_BUN_MAP;
  id: string;
};

export type TMoveIngredient = {
  type: typeof MOVE_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
};

export type TRemoveItem = {
  type: typeof REMOVE_ITEM;
  id: number;
};

export type TClearConstructor = {
  type: typeof CLEAR_CONSTRUCTOR;
};

export type TPostOrderSuccess = {
  type: typeof POST_ORDER_SUCCESS;
  number: number;
};

export type TPostOrderError = {
  type: typeof POST_ORDER_ERROR;
};

export type TPostOrderRequest = {
  type: typeof POST_ORDER_REQUEST;
};

export type TConstructorActions =
  | TShowOrderModal
  | THideOrderModal
  | TAddBun
  | TAddIngredient
  | TAddToIngredientsMap
  | TAddToBunMap
  | TMoveIngredient
  | TRemoveItem
  | TClearConstructor
  | TPostOrderSuccess
  | TPostOrderError
  | TPostOrderRequest;

  // __________________________
