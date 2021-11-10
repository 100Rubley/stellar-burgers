const ADD_BUN = 'ADD_BUN'
const ADD_INGREDIENT = 'ADD_INGREDIENT'
const MOVE_INGREDIENT = 'MOVE_INGREDIENT'

const initialState = {
  constructorIngredients: [],
  bun: {},

  currentIngredient: {},
  order: {}
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.item
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.item]
      }
    case MOVE_INGREDIENT: {
      const dragIngredient = state.constructorIngredients.find(i => i.uniqueId === action.dragIndex)
      const dragIndex = state.constructorIngredients.findIndex(i => i.uniqueId === action.dragIndex)
      const hoverIngredient = state.constructorIngredients.findIndex(i => i.uniqueId === action.hoverIndex)
      const newIngredients = [...state.constructorIngredients]

      newIngredients.splice(dragIndex, 1)
      newIngredients.splice(hoverIngredient, 0, dragIngredient)
      return { ...state, constructorIngredients: newIngredients }
    }
    default:
      return state
  }
}

const addBun = item => ({ type: ADD_BUN, item })
const addIngredient = item => ({ type: ADD_INGREDIENT, item })
export const moveIngredient = (dragIndex, hoverIndex) => ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })

export const addToConstructor = item => dispatch => {
  if (item.type === 'bun') {
    dispatch(addBun(item))
  } else {
    dispatch(addIngredient(item))
  }
}

