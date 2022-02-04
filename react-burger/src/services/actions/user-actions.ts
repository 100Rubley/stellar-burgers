import { REQUEST_ERROR, REQUEST_SUCCESS, REQUEST } from "./action-types";
import { checkResponse, setCookie, getCookie } from "../../utils/common";
import { deleteCookie } from "../../utils/common";
import { retriableFetch } from "../../utils/common";
import { BASE_URL } from "../../utils/constants";
import {
  TCancelResetSuccess,
  TLogInSuccess,
  TLogOutSuccess,
  TRequest,
  TRequestError,
  TRequestSuccess,
  TResetPasswordError,
  TResetPasswordRequest,
  TResetPasswordSuccess,
  TSetUserData,
  TSignUpSuccess,
} from "../../utils/types/user-types";
import { TAppDispatch, TAppThunk } from "../../utils/types/types";

export const request = (): TRequest => ({ type: REQUEST });
export const requestError = (): TRequestError => ({ type: REQUEST_ERROR });
export const requestSuccess = (): TRequestSuccess => ({
  type: REQUEST_SUCCESS,
});

export const logInSuccess = (email: string, name: string): TLogInSuccess => ({
  type: REQUEST_SUCCESS,
  payload: { email, name, isAuth: true },
});

export const signUpSuccess = (email: string, name: string): TSignUpSuccess => ({
  type: REQUEST_SUCCESS,
  payload: { email, name, isAuth: true },
});

export const resetPasswordSuccess = (): TResetPasswordSuccess => ({
  type: REQUEST_SUCCESS,
  payload: { resetPassSuccess: true },
});
export const resetPasswordError = (): TResetPasswordError => ({
  type: REQUEST_ERROR,
  payload: { resetPassSuccess: false },
});
export const resetPasswordRequest = (): TResetPasswordRequest => ({
  type: REQUEST,
  payload: { resetPassSuccess: false },
});
export const cancelResetSuccess = (): TCancelResetSuccess => ({
  type: REQUEST,
  payload: { resetPassSuccess: false },
});

export const logOutSuccess = (): TLogOutSuccess => ({
  type: REQUEST_SUCCESS,
  payload: { email: "", password: "", isAuth: false },
});

export const setUserData = (email: string, name: string): TSetUserData => ({
  type: REQUEST_SUCCESS,
  payload: { email, name, isAuth: true },
});

export const resetPassword: TAppThunk = (email: string) => (
  dispatch: TAppDispatch
) => {
  dispatch(resetPasswordRequest());
  fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(resetPasswordSuccess());
      }
    })
    .catch((err) => {
      dispatch(resetPasswordError());
      console.log(err);
    });
};

export const savePassword: TAppThunk = (newPassword: string, token: string) => (
  dispatch: TAppDispatch
) => {
  dispatch(request());

  fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPassword,
      token: token,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(requestSuccess());
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};

export const signUp: TAppThunk = (
  email: string,
  password: string,
  name: string
) => (dispatch: TAppDispatch) => {
  dispatch(request());

  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        setCookie("refreshToken", res.refreshToken);
        let accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken);
        }
        dispatch(signUpSuccess(email, name));
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};

export const logIn: TAppThunk = (email: string, password: string) => (
  dispatch: TAppDispatch
) => {
  dispatch(request());

  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        setCookie("refreshToken", res.refreshToken);
        let accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken);
        }
        dispatch(logInSuccess(res.user.email, res.user.name));
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};

export const logOut: TAppThunk = () => (dispatch: TAppDispatch) => {
  const refreshToken = getCookie("refreshToken");
  dispatch(request());

  fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        dispatch(logOutSuccess());
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};

export const getUserData: TAppThunk = () => (dispatch: TAppDispatch) => {
  dispatch(request());

  retriableFetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  })
    .then((res) => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name));
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};

export const refreshUserData: TAppThunk = (email: string, name: string) => (
  dispatch: TAppDispatch
) => {
  dispatch(request());

  retriableFetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({ email, name }),
  })
    .then((res) => {
      if (res && res.success) {
        dispatch(setUserData(res.user.email, res.user.name));
      }
    })
    .catch((err) => {
      dispatch(requestError());
      console.log(err);
    });
};
