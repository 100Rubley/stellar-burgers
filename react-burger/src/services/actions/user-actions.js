import {
  BASE_URL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_ERROR,
  CANCEL_RESET_SUCCESS
} from "../../utils/constants"

export const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST })
export const resetPasswordError = () => ({ type: RESET_PASSWORD_ERROR })
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS })
export const cancelResetSuccess = () => ({ type: CANCEL_RESET_SUCCESS })

export const savePasswordSuccess = () => ({ type: SAVE_PASSWORD_SUCCESS })
export const savePasswordRequest = () => ({ type: SAVE_PASSWORD_REQUEST })
export const savePasswordError = () => ({ type: SAVE_PASSWORD_ERROR })

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
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
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
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
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
