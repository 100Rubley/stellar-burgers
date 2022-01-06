import {
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  REQUEST,
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
    case REQUEST:
      return { ...state, error: false, request: true, ...action.payload }
    case REQUEST_ERROR:
      return { ...state, error: true, request: false, ...action.payload }
    case REQUEST_SUCCESS:
      return { ...state, error: false, request: false, ...action.payload }
      
    default:
      return state;
  }
}
