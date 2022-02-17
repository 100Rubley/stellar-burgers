import { addBun, addIngredient, addToBunMap, addToIngredientsMap, clearConstructor, hideOrderModal, moveIngredient, postOrderError, postOrderRequest, postOrderSuccess, removeItem, showOrderModal } from '../actions/constructor-actions'
import { constructorReducer as reducer } from './constructor-reducer'
import { anotherFakeBun, emptyBun, fakeBun } from '../../utils/testConstants'

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        constructorIngredients: [],
        bun: emptyBun,

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    )
  })

  it('should handle showOrderModal', () => {
    const action = showOrderModal()
    const newState = reducer(undefined, action)

    expect(newState.isModal).toBe(true)
  })

  it('should handle hideOrderModal', () => {
    const action = hideOrderModal()
    const newState = reducer(undefined, action)

    expect(newState.isModal).toBe(false)
  })

  it('should handle postOrderError', () => {
    const action = postOrderError()
    const newState = reducer(undefined, action)

    expect(newState.orderError).toBe(true)
  })

  it('should handle postOrderRequest', () => {
    const action = postOrderRequest()
    const newState = reducer(undefined, action)

    expect(newState.orderRequest).toBe(true)
  })

  it('should handle postOrderSuccess', () => {
    const action = postOrderSuccess(123)
    const newState = reducer(undefined, action)

    expect(newState.order).toBe(123)
    expect(newState.orderError).toBe(false)
    expect(newState.orderRequest).toBe(false)
  })

  it('should handle clearConstructor', () => {
    const action = clearConstructor()
    const newState = reducer(undefined, action)

    expect(newState.constructorIngredients).toStrictEqual([])
    expect(newState.bunMap).toStrictEqual(new Map())
    expect(newState.ingredientsMap).toStrictEqual(new Map())
    expect(newState.bun).toStrictEqual(emptyBun)
  })

  it('should handle addToBunMap', () => {
    const action = addToBunMap(123)
    const newState = reducer(undefined, action)

    expect(newState.bunMap.has(123)).toEqual(true)
  })

  it('should handle addToIngredientsMap', () => {
    const action = addToIngredientsMap(123)
    const newState = reducer(undefined, action)

    expect(newState.ingredientsMap.has(123)).toEqual(true)
  })

  it('should handle removeItem', () => {
    const action = removeItem(123.01)
    const previousState = {
      constructorIngredients: [
        fakeBun
      ],
      bun: emptyBun,

      ingredientsMap: new Map(),
      bunMap: new Map(),

      order: Number(),
      orderError: false,
      orderRequest: false,

      isModal: false,
    }
    expect(reducer(previousState, action)).toEqual(
      {
        constructorIngredients: [
        ],
        bun: emptyBun,

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    )
  })

  it('should handle addBun', () => {
    const action = addBun(anotherFakeBun)
    const previousState = {
      constructorIngredients: [],
      bun: emptyBun,

      ingredientsMap: new Map(),
      bunMap: new Map(),

      order: Number(),
      orderError: false,
      orderRequest: false,

      isModal: false,
    }
    expect(reducer(previousState, action)).toEqual(
      {
        constructorIngredients: [],
        bun: anotherFakeBun,

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    )
  })

  it('should handle addIngredient', () => {
    const action = addIngredient(anotherFakeBun)
    const previousState = {
      constructorIngredients: [fakeBun],
      bun: emptyBun,

      ingredientsMap: new Map(),
      bunMap: new Map(),

      order: Number(),
      orderError: false,
      orderRequest: false,

      isModal: false,
    }
    expect(reducer(previousState, action)).toEqual(
      {
        constructorIngredients: [fakeBun, anotherFakeBun],
        bun: emptyBun,

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    )
  })

  it('should handle moveIngredient', () => {
    const action = moveIngredient(123.01, 123.0123)
    const previousState = {
      constructorIngredients: [fakeBun, anotherFakeBun],
      bun: emptyBun,

      ingredientsMap: new Map(),
      bunMap: new Map(),

      order: Number(),
      orderError: false,
      orderRequest: false,

      isModal: false,
    }
    expect(reducer(previousState, action)).toEqual(
      {
        constructorIngredients: [anotherFakeBun, fakeBun],
        bun: emptyBun,

        ingredientsMap: new Map(),
        bunMap: new Map(),

        order: Number(),
        orderError: false,
        orderRequest: false,

        isModal: false,
      }
    )
  })

})
