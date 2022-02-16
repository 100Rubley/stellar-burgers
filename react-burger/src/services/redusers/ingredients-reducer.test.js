import { ingredientsReducer as reducer } from './ingredients-reducer'

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        ingredients: [],
        ingredientsError: false,
        ingredientsRequest: false,

        currentIngredient: {},

        isModal: false,
      }
    ])
  })
})
