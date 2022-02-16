import { constructorReducer as reducer } from './constructor-reducer'

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        constructorIngredients: [],
        bun: {
          _id: "",
          name: "",
          type: "bun",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
          image_mobile: "",
          image_large: "",
          uniqueId: 0,
          index: 0,
        },

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    ])
  })
})
