import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_ITEM,
  ADD_TO_INGREDIENTS_MAP,
  ADD_TO_BUN_MAP,
  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_ERROR,
  CLEAR_CONSTRUCTOR,
  SHOW_MODAL,
  HIDE_MODAL,
} from "./action-types";
import { checkResponse, getCookie } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";
import {
  TAddBun,
  TAddIngredient,
  TAddToBunMap,
  TAddToIngredientsMap,
  TClearConstructor,
  THideOrderModal,
  TMoveIngredient,
  TPostOrderError,
  TPostOrderRequest,
  TPostOrderSuccess,
  TRemoveItem,
  TShowOrderModal,
} from "../../utils/types/constructor-types";
import { IItem, TAppDispatch, TAppThunk } from "../../utils/types/types";

export const showOrderModal = (): TShowOrderModal => ({ type: SHOW_MODAL });
export const hideOrderModal = (): THideOrderModal => ({ type: HIDE_MODAL });

export const addBun = (item: IItem): TAddBun => ({ type: ADD_BUN, item });
export const addIngredient = (item: IItem): TAddIngredient => ({
  type: ADD_INGREDIENT,
  item,
});
export const addToIngredientsMap = (id: string): TAddToIngredientsMap => ({
  type: ADD_TO_INGREDIENTS_MAP,
  id,
});
export const addToBunMap = (id: string): TAddToBunMap => ({
  type: ADD_TO_BUN_MAP,
  id,
});

export const moveIngredient = (
  dragIndex: number,
  hoverIndex: number
): TMoveIngredient => ({
  type: MOVE_INGREDIENT,
  dragIndex,
  hoverIndex,
});
export const removeItem = (id: number): TRemoveItem => ({
  type: REMOVE_ITEM,
  id,
});
export const clearConstructor = (): TClearConstructor => ({
  type: CLEAR_CONSTRUCTOR,
});

export const postOrderSuccess = (number: number): TPostOrderSuccess => ({
  type: POST_ORDER_SUCCESS,
  number,
});
export const postOrderRequest = (): TPostOrderRequest => ({
  type: POST_ORDER_REQUEST,
});
export const postOrderError = (): TPostOrderError => ({
  type: POST_ORDER_ERROR,
});

export const addToConstructor: TAppThunk = (item: IItem) => (dispatch: TAppDispatch) => {
  if (item.type === "bun") {
    dispatch(addToBunMap(item._id));
    dispatch(addBun(item));
  } else {
    dispatch(addToIngredientsMap(item._id));
    dispatch(addIngredient(item));
  }
};

export const postOrder: TAppThunk = (data: string[]) => (dispatch: TAppDispatch) => {
  dispatch(postOrderRequest());
  fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(postOrderSuccess(res.order.number));
        dispatch(clearConstructor());
      }
    })
    .catch((err) => {
      dispatch(postOrderError());
      console.log(err);
    });
};
