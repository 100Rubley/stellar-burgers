import { userReducer as reducer } from './user-reducer'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    ])
  })
})
