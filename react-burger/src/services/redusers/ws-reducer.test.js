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
})
