import { TRoutes, TTab } from "./types/types";

export const BASE_URL: "https://norma.nomoreparties.space/api" =
  "https://norma.nomoreparties.space/api";

// Надо типизировать
export const BUN: "bun" = "bun";
export const SAUCE: "sauce" = "sauce";
export const MAIN: "main" = "main";

export const TABS: Array<TTab> = [
  { displayName: "Булки", type: BUN },
  { displayName: "Соусы", type: SAUCE },
  { displayName: "Начинки", type: MAIN },
];
// ----------------

export const ROUTES: TRoutes = {
  home: { title: "Конструктор", path: "/" },
  orders: { title: "Лента заказов", path: "/orders" },
  profile: { title: "Личный кабинет", path: "/profile" },

  ingredient: { title: "Ингредиент", path: "/ingredients/:ingredientId" },
  history: { title: "", path: "/profile/orders" },

  login: { title: "Вход", path: "/login" },
  register: { title: "Регистрация", path: "/register" },
  forgotPassword: { title: "Восстановление пароля", path: "/forgot-password" },
  resetPassword: { title: "Восстановление пароля", path: "/reset-password" },
};

// Удалять не стал, оставил как шпоргалку
export const USER_LOGIN_URL: string =
  "https://norma.nomoreparties.space/api/auth/login"; // <---- token
export const USER_REGISTER_URL: string =
  "https://norma.nomoreparties.space/api/auth/register"; // <---- token
export const USER_LOGOUT_URL: string =
  "https://norma.nomoreparties.space/api/auth/logout";
export const REFRESH_TOKEN_URL: string =
  "https://norma.nomoreparties.space/api/auth/token";
export const USER_INFO_URL: string =
  "https://norma.nomoreparties.space/api/auth/user"; // <-- get/patch
// --------------------------------------
