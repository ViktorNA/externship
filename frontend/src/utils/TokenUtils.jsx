import {ACCESS_TOKEN} from './Constants.jsx';

export const setToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN);
};
