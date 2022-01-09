import {
  BASE_URL,
  USER_REGISTER_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_INFO_URL,

  REQUEST_ERROR,
  REQUEST_SUCCESS,
  REQUEST
} from "../../utils/constants"
import { checkResponse, setCookie, getCookie } from '../../utils/common'
import { deleteCookie } from "../../utils/common"
import { retriableFetch } from "../../utils/common"

export const request = () => ({ type: REQUEST })
export const requestError = () => ({ type: REQUEST_ERROR })
export const requestSuccess = () => ({ type: REQUEST_SUCCESS })

export const logInSuccess = (email, password) => ({ type: REQUEST_SUCCESS, payload: { email, password, isAuth: true } }) //надо isAuth где-то еще доставать, так не дело

export const signUpSuccess = (email, name) => ({ type: REQUEST_SUCCESS, payload: { email, name } })

export const resetPasswordSuccess = () => ({ type: REQUEST_SUCCESS, payload: { resetPassSuccess: true } })
export const resetPasswordError = () => ({ type: REQUEST_ERROR, payload: { resetPassSuccess: false } })
export const resetPasswordRequest = () => ({ type: REQUEST, payload: { resetPassSuccess: false } })
export const cancelResetSuccess = () => ({ type: REQUEST, payload: { resetPassSuccess: false } })

export const logOutSuccess = () => ({
  type: REQUEST_SUCCESS,
  payload: { email: '', password: '', isAuth: false }
})

export const setUserData = (email, name) => ({ type: REQUEST_SUCCESS, payload: { email, name } })

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

  fetch(`${USER_REGISTER_URL}`, {
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

  fetch(`${USER_LOGIN_URL}`, {
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
        dispatch(logInSuccess(email, password));
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

  fetch(`${USER_LOGOUT_URL}`, {
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
  const accessToken = getCookie('accessToken')
  dispatch(request())

  retriableFetch(USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + accessToken
    }
  })
    .then(res => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name))
        console.log(res)
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}

export const refreshUserData = (email, name, password) => dispatch => {
  const accessToken = getCookie('accessToken')
  dispatch(request())

  retriableFetch(USER_INFO_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({email, name, password})
  })
    .then(res => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name))
        console.log(res)
      }
    })
    .catch(err => {
      dispatch(requestError())
      console.log(err)
    })
}
