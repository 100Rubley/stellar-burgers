import { fakeOrder } from '../../utils/testConstants'
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetOrders, wsGetUserOrders, wsUserConnectionClosed } from '../actions/ws-actions'
import { wsReducer as reducer } from './ws-reducer'

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        userOrders: [],
        wsUserConnected: false,
      }
    )
  })

  it('should handle wsConnectionSuccess', () => {
    const action = wsConnectionSuccess()
    const newState = reducer(undefined, action)

    expect(newState.wsConnected).toBe(true)
  })

  it('should handle wsConnectionError', () => {
    const action = wsConnectionError()
    const newState = reducer(undefined, action)

    expect(newState.wsConnected).toBe(false)
  })

  it('should handle wsConnectionClosed', () => {
    const action = wsConnectionClosed()
    const newState = reducer(undefined, action)

    expect(newState.wsConnected).toBe(false)
  })

  it('should handle wsUserConnectionClosed', () => {
    const action = wsUserConnectionClosed()
    const newState = reducer(undefined, action)

    expect(newState.wsUserConnected).toBe(false)
  })

  it('should handle wsGetOrders', () => {
    const action = wsGetOrders({ orders: [fakeOrder, fakeOrder], total: 2, totalToday: 1 })
    expect(reducer(undefined, action)).toEqual(
      {
        wsConnected: false,
        orders: [fakeOrder, fakeOrder],
        total: 2,
        totalToday: 1,
        userOrders: [],
        wsUserConnected: false,
      }
    )
  })

  it('should handle wsGetUserOrders', () => {
    const action = wsGetUserOrders({ orders: [fakeOrder, fakeOrder] })
    expect(reducer(undefined, action)).toEqual(
      {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        userOrders: [fakeOrder, fakeOrder],
        wsUserConnected: false,
      }
    )
  })


})
