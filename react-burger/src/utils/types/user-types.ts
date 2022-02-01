import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from "../../services/actions/action-types";

type TPayload = {
  [name: string]: string | boolean;
};

export type TRequest = {
  type: typeof REQUEST;
};

export type TRequestError = {
  type: typeof REQUEST_ERROR;
};

export type TRequestSuccess = {
  type: typeof REQUEST_SUCCESS;
};

export type TLogInSuccess = {
  type: typeof REQUEST_SUCCESS;
  payload: TPayload;
};

export type TSignUpSuccess = {
  type: typeof REQUEST_SUCCESS;
  payload: TPayload;
};

export type TResetPasswordSuccess = {
  type: typeof REQUEST_SUCCESS;
  payload: TPayload;
};

export type TResetPasswordError = {
  type: typeof REQUEST_ERROR;
  payload: TPayload;
};

export type TResetPasswordRequest = {
  type: typeof REQUEST;
  payload: TPayload;
};

export type TCancelResetSuccess = {
  type: typeof REQUEST;
  payload: TPayload;
};

export type TLogOutSuccess = {
  type: typeof REQUEST_SUCCESS;
  payload: TPayload;
};

export type TSetUserData = {
  type: typeof REQUEST_SUCCESS;
  payload: TPayload;
};

export type TUserTypes =
  | TRequest
  | TRequestError
  | TRequestSuccess
  | TLogInSuccess
  | TSignUpSuccess
  | TResetPasswordSuccess
  | TResetPasswordError
  | TResetPasswordRequest
  | TCancelResetSuccess
  | TLogOutSuccess
  | TSetUserData;
