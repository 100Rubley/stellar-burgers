import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { cancelResetSuccess, logInSuccess, logOutSuccess, request, requestError, requestSuccess, resetPassword, resetPasswordError, resetPasswordRequest, resetPasswordSuccess, setUserData, signUpSuccess } from '../actions/user-actions'
import { userReducer as reducer } from './user-reducer'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle REQUEST', () => {
    const action = request()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: true,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle REQUEST_ERROR', () => {
    const action = requestError()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: true,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle REQUEST_SUCCESS', () => {
    const action = requestSuccess()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle logInSuccess', () => {
    const action = logInSuccess('antoha@test.com', 'antoha')

    expect(reducer(undefined, action)).toEqual(
      {
        email: "antoha@test.com",
        password: "",
        name: "antoha",

        isAuth: true,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle signUpSuccess', () => {
    const action = signUpSuccess('antoha@test.com', 'antoha')

    expect(reducer(undefined, action)).toEqual(
      {
        email: "antoha@test.com",
        password: "",
        name: "antoha",

        isAuth: true,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle resetPasswordSuccess', () => {
    const action = resetPasswordSuccess()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: false,

        resetPassSuccess: true,
      }
    )
  })

  it('should handle resetPasswordError', () => {
    const action = resetPasswordError()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: true,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle resetPasswordRequest', () => {
    const action = resetPasswordRequest()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: true,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle cancelResetSuccess', () => {
    const action = cancelResetSuccess()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: true,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle logOutSuccess', () => {
    const action = logOutSuccess()

    expect(reducer(undefined, action)).toEqual(
      {
        email: "",
        password: "",
        name: "",

        isAuth: false,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

  it('should handle setUserData', () => {
    const action = setUserData("email", "name")

    expect(reducer(undefined, action)).toEqual(
      {
        email: "email",
        password: "",
        name: "name",

        isAuth: true,

        request: false,
        error: false,

        resetPassSuccess: false,
      }
    )
  })

})
