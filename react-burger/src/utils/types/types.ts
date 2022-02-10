import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { store } from "../../services/redusers";
import { TConstructorActions } from "./constructor-types";
import { TIngredientsActions } from "./ingredients-types";
import { TUserActions } from "./user-types";

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TConstructorActions
  | TUserActions
  | TIngredientsActions;

export type TAppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;

export type TAppDispatch = typeof store.dispatch;

export interface ILocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: {} | null | undefined;
  background: any;
}

export type TIngredientType = "bun" | "sauce" | "main";

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredientType;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile?: string;
  readonly image_large: string;
}

export interface IItem extends IIngredient {
  uniqueId: number;
  index?: number;
}

export type TIcon =
  | "CurrencyIcon"
  | "BurgerIcon"
  | "LockIcon"
  | "DragIcon"
  | "CloseIcon"
  | "CheckMarkIcon"
  | "ListIcon"
  | "ProfileIcon"
  | "EditIcon"
  | "InfoIcon"
  | "ShowIcon"
  | "HideIcon"
  | "LogoutIcon"
  | "DeleteIcon"
  | "ArrowUpIcon"
  | "ArrowDownIcon"
  | "MenuIcon"
  | undefined;

export interface IInput {
  name: string;
  value: string;
}

export interface IInnerRoutes {
  readonly title: string;
  readonly path: string;
}

export type TRoutesNames =
  | "home"
  | "orders"
  | "profile"
  | "profileOrders"
  | "profileOrderPage"
  | "ingredient"
  | "history"
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "orderPage";

export type TRoutes = { [name in TRoutesNames]: IInnerRoutes };

export type TTab = {
  readonly displayName: string;
  readonly type: string;
};
