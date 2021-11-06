// тут хранятся константы для action
const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS'
const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST'
const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR'

const ADD_CURRENT_CONSTRUCTOR_INGREDIENT = 'ADD_CURRENT_CONSTRUCTOR_INGREDIENT'
// _________________________________

const initialState = {
  ingredients: [],
  ingredientsError: false,
  ingredientsRequest: false,

  currentConstructorIngredients: [],
  currentBun: {},

  currentIngredient: {},
  order: {}
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true }
    case SET_INGREDIENTS_ERROR:
      return { ...state, ingredientsError: true, ingredientsRequest: false }
    case SET_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.ingredients, ingredientsError: false, ingredientsRequest: false }

    case ADD_CURRENT_CONSTRUCTOR_INGREDIENT:
      const currentIngredient = state.ingredients.find(i => i._id === action.id)
      if (currentIngredient.type === 'bun') {
        return {
          ...state,
          currentBun: currentIngredient
        }
      } else return {
        ...state,
        currentConstructorIngredients: [...state.currentConstructorIngredients, currentIngredient]
      }

    default:
      return state
  }
}

// тут хранятся action-creators
const setIngredientsSuccess = ingredients => ({ type: SET_INGREDIENTS_SUCCESS, ingredients })
const setIngredientsRequest = () => ({ type: SET_INGREDIENTS_REQUEST })
const setIngredientsError = () => ({ type: SET_INGREDIENTS_ERROR })

export const addCurrentConstructorIngredient = (id) => ({ type: ADD_CURRENT_CONSTRUCTOR_INGREDIENT, id })
// ____________________________

// тут хранятся thunk-creators
export const getIngredients = url => dispatch => {
  dispatch(setIngredientsRequest())
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch(setIngredientsSuccess(res.data));
      }
    })
    .catch(err => {
      dispatch(setIngredientsError())
      console.log(err)
    })
};
// ___________________________
