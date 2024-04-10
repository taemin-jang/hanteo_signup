import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

const DEFAULT_TIME = 60;

export const setCookies = <T>(
  key: string,
  value: T,
  options?: CookieSetOptions,
) => {
  cookies.set(key, value, options);
};

export const setErrorCookies = <T>(
  key: string,
  value: T,
  options = { maxAge: DEFAULT_TIME },
) => {
  cookies.set(key, value, options);
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const removeCookies = (key: string) => {
  cookies.remove(key);
};
