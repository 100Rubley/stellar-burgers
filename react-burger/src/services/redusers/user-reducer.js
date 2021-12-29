import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  SAVE_PASSWORD_SUCCESS,
  SAVE_PASSWORD_REQUEST,
  SAVE_PASSWORD_ERROR,
  CANCEL_RESET_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_IN_REQUEST,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS
} from "../../utils/constants"

const initialState = {
  email: '',
  password: '',
  name: '',

  isAuth: false,

  request: false,
  error: false,

  resetPassSuccess: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return { ...state, request: false, error: false, resetPassSuccess: true }
    case RESET_PASSWORD_ERROR:
      return { ...state, error: true, request: false, resetPassSuccess: false }
    case RESET_PASSWORD_REQUEST:
      return { ...state, request: true, error: false, resetPassSuccess: false }
    case CANCEL_RESET_SUCCESS:
      return { ...state, resetPassSuccess: false }

    case SAVE_PASSWORD_SUCCESS:
      return { ...state, error: false, request: false }
    case SAVE_PASSWORD_ERROR:
      return { ...state, error: true, request: false }
    case SAVE_PASSWORD_REQUEST:
      return { ...state, error: false, request: true }

    case SIGN_UP_REQUEST:
      return { ...state, request: true, error: false }
    case SIGN_UP_ERROR:
      return { ...state, request: false, error: true }
    case SIGN_UP_SUCCESS:
      return { ...state, request: false, error: false, email: action.email, name: action.name, password: action.password }

    case LOG_IN_REQUEST:
      return { ...state, request: true, error: false }
    case LOG_IN_ERROR:
      return { ...state, request: false, error: true }
    case LOG_IN_SUCCESS:
      return { ...state, request: false, error: false, email: action.email, password: action.password }


    default:
      return state;
  }
}
