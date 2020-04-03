import {ACCESS_TOKEN, SAVED_USER} from './Constants.jsx';

export const setToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN);
};

export const saveUserToLocalStorage = (user) => {
  window.localStorage.setItem(SAVED_USER, JSON.stringify(user));
};

export const getSavedUserFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem(SAVED_USER));
};
