import { ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_ITEM, ADD_TO_INGREDIENTS_MAP, ADD_TO_BUN_MAP, POST_ORDER_SUCCESS, POST_ORDER_REQUEST, POST_ORDER_ERROR, CLEAR_CONSTRUCTOR, SHOW_MODAL, HIDE_MODAL } from "../actions/action-types"

const initialState = {
  constructorIngredients: [],
  bun: {},

  ingredientsMap: new Map(),
  bunMap: new Map(),

  order: Number(),
  orderError: false,
  orderRequest: false,

  isModal: false,
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModal: true }
    case HIDE_MODAL:
      return { ...state, isModal: false }

    case ADD_BUN:
      return { ...state, bun: action.item }
    case ADD_INGREDIENT:
      return { ...state, constructorIngredients: [...state.constructorIngredients, action.item] }

    case ADD_TO_INGREDIENTS_MAP:
      const mapI = state.ingredientsMap
      const current = action.id
      if (mapI.has(current)) {
        mapI.set(current, mapI.get(current) + 1)
      } else {
        mapI.set(current, 1)
      }
      return { ...state, ingredientsMap: mapI }
    case ADD_TO_BUN_MAP:
      const mapB = state.bunMap
      const currentBun = action.id
      if (!mapB.has(currentBun)) {
        mapB.clear()
        mapB.set(currentBun, 1)
      }
      return { ...state, bunMap: mapB }

    case POST_ORDER_REQUEST:
      return { ...state, orderRequest: true }
    case POST_ORDER_ERROR:
      return { ...state, orderError: true, orderRequest: false }
    case POST_ORDER_SUCCESS:
      return { ...state, order: action.number, orderError: false, orderRequest: false }

    case MOVE_INGREDIENT: {
      const dragIngredient = state.constructorIngredients.find(i => i.uniqueId === action.dragIndex)
      const dragIndex = state.constructorIngredients.findIndex(i => i.uniqueId === action.dragIndex)
      const hoverIngredient = state.constructorIngredients.findIndex(i => i.uniqueId === action.hoverIndex)
      const newIngredients = [...state.constructorIngredients]

      newIngredients.splice(dragIndex, 1)
      newIngredients.splice(hoverIngredient, 0, dragIngredient)
      return { ...state, constructorIngredients: newIngredients }
    }
    case REMOVE_ITEM: {
      const removedIndex = state.constructorIngredients.findIndex(i => i.uniqueId === action.id)
      const newIngredients = [...state.constructorIngredients]
      newIngredients.splice(removedIndex, 1)
      const removedId = state.constructorIngredients[removedIndex]._id
      const itemsMap = state.ingredientsMap
      if (itemsMap.has(removedId)) {
        itemsMap.set(removedId, itemsMap.get(removedId) - 1)
      }

      return { ...state, constructorIngredients: newIngredients, ingredientsMap: itemsMap }
    }

    case CLEAR_CONSTRUCTOR:
      return { ...state, constructorIngredients: [], bun: {}, bunMap: new Map(), ingredientsMap: new Map() }

    default:
      return state
  }
}
