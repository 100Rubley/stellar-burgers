import { BASE_URL } from "./constants";

export const getCookie: (name: string) => string | undefined = name => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const setCookie: (name: string, value: string, options?: any) => void = (name, value, options = {}) => {
  options = {
    path: '/',
    //значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export const deleteCookie: (name: string) => void = name => {
  setCookie(name, "", {
    'max-age': -1
  })
}

export const checkResponse = (res: Response) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({token: getCookie("refreshToken")}),
  }).then(checkResponse);
}

export const retriableFetch = async (url: string, options:any = {}) => {
  try {
    const res = await fetch(url, options)
    const result = await checkResponse(res)
    return result
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      setCookie('refreshToken', refreshData.refreshToken)
      setCookie('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      throw err
    }
  }
}
