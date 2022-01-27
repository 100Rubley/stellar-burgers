import { ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_ITEM, ADD_TO_INGREDIENTS_MAP, ADD_TO_BUN_MAP, POST_ORDER_SUCCESS, POST_ORDER_REQUEST, POST_ORDER_ERROR, CLEAR_CONSTRUCTOR, SHOW_MODAL, HIDE_MODAL } from "./action-types"
import { checkResponse } from '../../utils/common.ts'
import { BASE_URL } from "../../utils/constants"

export const showOrderModal = () => ({ type: SHOW_MODAL })
export const hideOrderModal = () => ({ type: HIDE_MODAL })

export const addBun = item => ({ type: ADD_BUN, item })
export const addIngredient = item => ({ type: ADD_INGREDIENT, item })
export const addToIngredientsMap = id => ({ type: ADD_TO_INGREDIENTS_MAP, id })
export const addToBunMap = id => ({ type: ADD_TO_BUN_MAP, id })

export const moveIngredient = (dragIndex, hoverIndex) => ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })
export const removeItem = id => ({ type: REMOVE_ITEM, id })
export const clearConstructor = () => ({ type: CLEAR_CONSTRUCTOR })

export const postOrderSuccess = number => ({ type: POST_ORDER_SUCCESS, number })
export const postOrderRequest = () => ({ type: POST_ORDER_REQUEST })
export const postOrderError = () => ({ type: POST_ORDER_ERROR })

export const addToConstructor = item => dispatch => {
  if (item.type === 'bun') {
    dispatch(addToBunMap(item._id))
    dispatch(addBun(item))
  } else {
    dispatch(addToIngredientsMap(item._id))
    dispatch(addIngredient(item))
  }
}

export const postOrder = data => dispatch => {
  dispatch(postOrderRequest())
  fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'ingredients': data
    }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(postOrderSuccess(res.order.number));
        dispatch(clearConstructor())
      }
    })
    .catch(err => {
      dispatch(postOrderError())
      console.log(err)
    })
}
