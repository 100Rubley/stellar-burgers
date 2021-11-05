// тут хранятся константы для action
const SET_INGREDIENTS = 'SET_INGREDIENTS'
// _________________________________

const initialState = {
  ingredients: [],
  currentConstructorIngredients: [],
  currentIngredient: {},
  order: {}
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    default:
      return state
  }
}

// тут хранятся action-creators
const setIngredients = ingredients => ({ type: SET_INGREDIENTS, ingredients })
// ____________________________

// тут хранятся thunk-creators
export const getIngredients = url => dispatch => {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch(setIngredients(res.data));
      }
    })
    .catch(err => console.log(err))
};
// ___________________________
