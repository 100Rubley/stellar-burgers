import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from "../../services/actions/action-types";

export enum STATUS {
  DONE = "done",
  CREATED = "created",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export type TServerOrder = {
  ingredients: ReadonlyArray<string>;
  _id: string;
  status: STATUS;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderResponce = {
  orders: ReadonlyArray<TServerOrder>;
  total: number;
  totalToday: number;
};

export type TOrdersReducer = {
  list: ReadonlyArray<TServerOrder>;
  total: number;
  totalToday: number;
  request: boolean;
  error: boolean;
};

type TPayload = {
  [name: string]: ReadonlyArray<TServerOrder> | boolean | number;
};

export type TRequest = {
  type: typeof REQUEST;
  payload?: TPayload;
};

export type TRequestError = {
  type: typeof REQUEST_ERROR;
  payload?: TPayload;
};

export type TRequestSuccess = {
  type: typeof REQUEST_SUCCESS;
  payload?: TPayload;
};

export type TOrderActions = TRequest | TRequestError | TRequestSuccess;
