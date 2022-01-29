import {
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  REQUEST
} from "./action-types"
import { checkResponse, setCookie, getCookie } from '../../utils/common.ts'
import { deleteCookie } from "../../utils/common.ts"
import { retriableFetch } from "../../utils/common.ts"
import { BASE_URL } from "../../utils/constants"

export const request = () => ({ type: REQUEST })
export const requestError = () => ({ type: REQUEST_ERROR })
export const requestSuccess = () => ({ type: REQUEST_SUCCESS })

export const logInSuccess = (email, name) => ({ type: REQUEST_SUCCESS, payload: { email, name, isAuth: true } }) //надо isAuth где-то еще доставать, так не дело

export const signUpSuccess = (email, name) => ({ type: REQUEST_SUCCESS, payload: { email, name, isAuth: true } })

export const resetPasswordSuccess = () => ({ type: REQUEST_SUCCESS, payload: { resetPassSuccess: true } })
export const resetPasswordError = () => ({ type: REQUEST_ERROR, payload: { resetPassSuccess: false } })
export const resetPasswordRequest = () => ({ type: REQUEST, payload: { resetPassSuccess: false } })
export const cancelResetSuccess = () => ({ type: REQUEST, payload: { resetPassSuccess: false } })

export const logOutSuccess = () => ({
  type: REQUEST_SUCCESS,
  payload: { email: '', password: '', isAuth: false }
})

export const setUserData = (email, name) => ({ type: REQUEST_SUCCESS, payload: { email, name, isAuth: true } })

export const resetPassword = email => dispatch => {
  dispatch(resetPasswordRequest())
  fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email
    }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(resetPasswordSuccess());
      }
    })
    .catch(err => {
      dispatch(resetPasswordError())
      console.log(err)
    })
}

export const savePassword = (newPassword, token) => dispatch => {
  dispatch(request())

  fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "password": newPassword,
      "token": token
    }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(requestSuccess());
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}

export const signUp = (email, password, name) => dispatch => {
  dispatch(request())

  fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        setCookie('refreshToken', res.refreshToken)
        let accessToken = res.accessToken.split('Bearer ')[1]
        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        dispatch(signUpSuccess(email, name));
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}

export const logIn = (email, password) => dispatch => {
  dispatch(request())

  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        setCookie('refreshToken', res.refreshToken)
        let accessToken = res.accessToken.split('Bearer ')[1]
        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        dispatch(logInSuccess(res.user.email, res.user.name));
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}

export const logOut = () => dispatch => {
  const refreshToken = getCookie('refreshToken')
  dispatch(request())

  fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(logOutSuccess());
        deleteCookie('refreshToken')
        deleteCookie('accessToken')
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}


export const getUserData = () => dispatch => {
  dispatch(request())

  retriableFetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getCookie('accessToken')}`
    }
  })
    .then(res => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name))
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}

export const refreshUserData = (email, name) => dispatch => {
  dispatch(request())

  retriableFetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getCookie('accessToken')}`
    },
    body: JSON.stringify({ email, name })
  })
    .then(res => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name))
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}
