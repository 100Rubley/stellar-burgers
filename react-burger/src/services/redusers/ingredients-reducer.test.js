import { anotherFakeBun, fakeBun } from '../../utils/testConstants'
import { hideIngredientsModal, removeCurrentIngredient, setCurrentIngredient, setIngredientsError, setIngredientsRequest, setIngredientsSuccess, showIngredientsModal } from '../actions/ingredients-actions'
import { ingredientsReducer as reducer } from './ingredients-reducer'

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        ingredients: [],
        ingredientsError: false,
        ingredientsRequest: false,

        currentIngredient: {},

        isModal: false,
      }
    )
  })

  it('should handle showIngredientsModal', () => {
    const action = showIngredientsModal()
    const newState = reducer(undefined, action)

    expect(newState.isModal).toBe(true)
  })

  it('should handle hideIngredientsModal', () => {
    const action = hideIngredientsModal()
    const newState = reducer(undefined, action)

    expect(newState.isModal).toBe(false)
  })

  it('should handle setIngredientsRequest', () => {
    const action = setIngredientsRequest()
    const newState = reducer(undefined, action)

    expect(newState.ingredientsRequest).toBe(true)
  })

  it('should handle setIngredientsError', () => {
    const action = setIngredientsError()
    const newState = reducer(undefined, action)

    expect(newState.ingredientsRequest).toBe(false)
    expect(newState.ingredientsError).toBe(true)
  })

  it('should handle setIngredientsSuccess', () => {
    const action = setIngredientsSuccess([fakeBun, anotherFakeBun])
    expect(reducer(undefined, action)).toEqual(
      {
        ingredients: [fakeBun, anotherFakeBun],
        ingredientsError: false,
        ingredientsRequest: false,

        currentIngredient: {},

        isModal: false,
      }
    )
  })

  it('should handle setCurrentIngredient', () => {
    const action = setCurrentIngredient(fakeBun)
    expect(reducer(undefined, action)).toEqual(
      {
        ingredients: [],
        ingredientsError: false,
        ingredientsRequest: false,

        currentIngredient: { ...fakeBun },

        isModal: false,
      }
    )
  })

  it('should handle removeCurrentIngredient', () => {
    const action = removeCurrentIngredient()
    const previousState = {
      ingredients: [],
      ingredientsError: false,
      ingredientsRequest: false,

      currentIngredient: { ...fakeBun },

      isModal: false,
    }
    expect(reducer(previousState, action)).toEqual(
      {
        ingredients: [],
        ingredientsError: false,
        ingredientsRequest: false,

        currentIngredient: {},
        isModal: false,
      }
    )
  })

})
