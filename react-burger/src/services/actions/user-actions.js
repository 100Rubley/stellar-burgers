import {
  BASE_URL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_ERROR,
  CANCEL_RESET_SUCCESS,
  SIGN_UP_REQUEST,
  USER_REGISTER_URL,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  USER_LOGIN_URL,
  LOG_IN_REQUEST,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  USER_LOGOUT_URL,
  LOG_OUT_ERROR,
  LOG_OUT_SUCCESS
} from "../../utils/constants"
import { checkResponse, setCookie, getCookie } from '../../utils/common'


export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST })
export const resetPasswordError = () => ({ type: RESET_PASSWORD_ERROR })
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
export const cancelResetSuccess = () => ({ type: CANCEL_RESET_SUCCESS })

export const savePasswordSuccess = () => ({ type: SAVE_PASSWORD_SUCCESS })
export const savePasswordRequest = () => ({ type: SAVE_PASSWORD_REQUEST })
export const savePasswordError = () => ({ type: SAVE_PASSWORD_ERROR })

export const signUpRequest = () => ({ type: SIGN_UP_REQUEST })
export const signUpSuccess = (email, password, name) => ({ type: SIGN_UP_SUCCESS, email, password, name })
export const signUpError = () => ({ type: SIGN_UP_ERROR })

export const logInError = () => ({ type: LOG_IN_ERROR })
export const logInRequest = () => ({ type: LOG_IN_REQUEST })
export const logInSuccess = (email, password) => ({ type: LOG_IN_SUCCESS, email, password })

export const logOutSuccess = () => ({ type: LOG_OUT_SUCCESS })
export const logOutError = () => ({ type: LOG_OUT_ERROR })

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
        console.log(res)
        dispatch(resetPasswordSuccess());
      }
    })
    .catch(err => {
      dispatch(resetPasswordError())
      console.log(err)
    })
}

export const savePassword = (newPassword, token) => dispatch => {
  dispatch(savePasswordRequest())

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
        dispatch(savePasswordSuccess());
        console.log(res)
      }
    })
    .catch(err => {
      dispatch(savePasswordError())
      console.log(err)
    })
}

export const signUp = (email, password, name) => dispatch => {
  dispatch(signUpRequest())

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
        console.log(res)
        setCookie('refreshToken', res.refreshToken)
        let accessToken = res.accessToken.split('Bearer ')[1]
        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        dispatch(signUpSuccess(email, password, name));
      }
    })
    .catch(err => {
      dispatch(signUpError())
      console.log(err)
    })
}

export const logIn = (email, password) => dispatch => {
  dispatch(logInRequest())

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
        console.log(res)
        setCookie('refreshToken', res.refreshToken)
        let accessToken = res.accessToken.split('Bearer ')[1]
        if (accessToken) {
          setCookie('accessToken', accessToken);
        }
        dispatch(logInSuccess(email, password));
      }
    })
    .catch(err => {
      dispatch(logInError())
      console.log(err)
    })
}

export const logOut = () => dispatch => {
  const refreshToken = getCookie('refreshToken')

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
        console.log(res)
        dispatch(logOutSuccess());
      }
    })
    .catch(err => {
      dispatch(logOutError())
      console.log(err)
    })
}

