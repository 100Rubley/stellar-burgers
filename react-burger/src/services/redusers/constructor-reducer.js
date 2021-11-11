const ADD_BUN = 'ADD_BUN'
const ADD_INGREDIENT = 'ADD_INGREDIENT'
const MOVE_INGREDIENT = 'MOVE_INGREDIENT'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_TO_INGREDIENTS_MAP = 'ADD_TO_INGREDIENTS_MAP'
const ADD_TO_BUN_MAP = 'ADD_TO_BUN_MAP'

const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
const POST_ORDER_ERROR = 'POST_ORDER_ERROR'

const initialState = {
  constructorIngredients: [],
  bun: {},

  ingredientsMap: new Map(),
  bunMap: new Map(),

  order: {},
  orderError: false,
  orderRequest: false,
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return { ...state, order: { ...action.order }, orderError: false, orderRequest: false }

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

    default:
      return state
  }
}

const addBun = item => ({ type: ADD_BUN, item })
const addIngredient = item => ({ type: ADD_INGREDIENT, item })
const addToIngredientsMap = id => ({ type: ADD_TO_INGREDIENTS_MAP, id })
const addToBunMap = id => ({ type: ADD_TO_BUN_MAP, id })

export const moveIngredient = (dragIndex, hoverIndex) => ({ type: MOVE_INGREDIENT, dragIndex, hoverIndex })
export const removeItem = id => ({ type: REMOVE_ITEM, id })

const postOrderSuccess = order => ({ type: POST_ORDER_SUCCESS, order })
const postOrderRequest = () => ({ type: POST_ORDER_REQUEST })
const postOrderError = () => ({ type: POST_ORDER_ERROR })

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
  fetch(`https://norma.nomoreparties.space/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        console.log(res)
        dispatch(postOrderSuccess(res.order.number));
      }
    })
    .catch(err => {
      dispatch(postOrderError())
      console.log(err)
    })
}

