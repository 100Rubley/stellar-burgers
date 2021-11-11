// тут хранятся константы для action
const SET_INGREDIENTS_SUCCESS = 'SET_INGREDIENTS_SUCCESS'
const SET_INGREDIENTS_REQUEST = 'SET_INGREDIENTS_REQUEST'
const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR'
const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT'
const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT'
// _________________________________

const initialState = {
  ingredients: [],
  ingredientsError: false,
  ingredientsRequest: false,

  currentIngredient: {},
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true }
    case SET_INGREDIENTS_ERROR:
      return { ...state, ingredientsError: true, ingredientsRequest: false }
    case SET_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.ingredients, ingredientsError: false, ingredientsRequest: false }


    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: { ...action.ingredient } }
    case REMOVE_CURRENT_INGREDIENT:
      return {...state, currentIngredient: {}}
    default:
      return state
  }
}

// тут хранятся action-creators
const setIngredientsSuccess = ingredients => ({ type: SET_INGREDIENTS_SUCCESS, ingredients })
const setIngredientsRequest = () => ({ type: SET_INGREDIENTS_REQUEST })
const setIngredientsError = () => ({ type: SET_INGREDIENTS_ERROR })
export const setCurrentIngredient = ingredient => ({ type: SET_CURRENT_INGREDIENT, ingredient })
export const removeCurrentIngredient = () => ({ type: REMOVE_CURRENT_INGREDIENT })
// ____________________________

// тут хранятся thunk-creators
export const requestIngredients = url => dispatch => {
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
