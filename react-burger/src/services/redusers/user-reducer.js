import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_ERROR,
  CANCEL_RESET_SUCCESS
} from "../../utils/constants"

const initialState = {
  email: '',
  password: '',

  passwordRequest: false,
  passwordRequestError: false,
  resetPassSuccess: false,

  savePassRequest: false,
  savePassRequestError: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return { ...state, passwordRequestError: false, passwordRequest: false, resetPassSuccess: true }
    case RESET_PASSWORD_ERROR:
      return { ...state, passwordRequestError: true, passwordRequest: false, resetPassSuccess: false }
    case RESET_PASSWORD_REQUEST:
      return { ...state, passwordRequest: true, resetPassSuccess: false }
    case CANCEL_RESET_SUCCESS:
      return { ...state, resetPassSuccess: false }

    case SAVE_PASSWORD_SUCCESS:
      return { ...state, savePassRequestError: false, savePassRequest: false }
    case SAVE_PASSWORD_ERROR:
      return { ...state, savePassRequestError: true, savePassRequest: false }
    case SAVE_PASSWORD_REQUEST:
      return { ...state, savePassRequest: true }

    default:
      return state;
  }
}
