import { ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_ITEM, ADD_TO_INGREDIENTS_MAP, ADD_TO_BUN_MAP, POST_ORDER_SUCCESS, POST_ORDER_REQUEST, POST_ORDER_ERROR } from "../../utils/constants"

export const addBun = item => ({ type: ADD_BUN, item })
export const addIngredient = item => ({ type: ADD_INGREDIENT, item })
export const addToIngredientsMap = id => ({ type: ADD_TO_INGREDIENTS_MAP, id })
export const addToBunMap = id => ({ type: ADD_TO_BUN_MAP, id })

export const moveIngredient = (dragIndex, hoverIndex) => ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })
export const removeItem = id => ({ type: REMOVE_ITEM, id })

export const postOrderSuccess = order => ({ type: POST_ORDER_SUCCESS, order })
export const postOrderRequest = () => ({ type: POST_ORDER_REQUEST })
export const postOrderError = () => ({ type: POST_ORDER_ERROR })
