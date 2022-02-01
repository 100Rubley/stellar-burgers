
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
  index?: number | undefined;
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
  | "ingredient"
  | "history"
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword";

export type TRoutes = { [name in TRoutesNames]: IInnerRoutes };


