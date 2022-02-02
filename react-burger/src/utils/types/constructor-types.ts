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
import { IIngredient, IItem } from "./types";

// Типы для constructor action-creator's
export type TShowOrderModal = {
  readonly type: typeof SHOW_MODAL;
};

export type THideOrderModal = {
  readonly type: typeof HIDE_MODAL;
};

export type TAddBun = {
  readonly type: typeof ADD_BUN;
  item: IItem;
};

export type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  item: IItem;
};

export type TAddToIngredientsMap = {
  readonly type: typeof ADD_TO_INGREDIENTS_MAP;
  id: string;
};

export type TAddToBunMap = {
  readonly type: typeof ADD_TO_BUN_MAP;
  id: string;
};

export type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
};

export type TRemoveItem = {
  readonly type: typeof REMOVE_ITEM;
  id: number;
};

export type TClearConstructor = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TPostOrderSuccess = {
  readonly type: typeof POST_ORDER_SUCCESS;
  number: number;
};

export type TPostOrderError = {
  readonly type: typeof POST_ORDER_ERROR;
};

export type TPostOrderRequest = {
  readonly type: typeof POST_ORDER_REQUEST;
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

// Типы для constructor reduser
export type TConstructorReducer = {
  constructorIngredients: Array<IItem>;
  bun: IItem | {};

  ingredientsMap: any;
  bunMap: any;

  order: number;
  orderError: boolean;
  orderRequest: boolean;

  isModal: boolean;
};
// ____________________________
