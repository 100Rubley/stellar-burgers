import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";
import { userReducer } from "./user-reducer";
import { ordersReducer } from "./orders-reducer";
import { wsReducer } from "./ws-reducer";

import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { websocket } from "../middleware/wsMiddleware";
import { WS_URL } from "../../utils/constants";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from "../actions/action-types";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  orders: ordersReducer,
  wsOrders: wsReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const wsMiddleware = websocket(WS_URL, {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, wsMiddleware))
);
