import axios from 'axios';
import {BASE_URL} from '../Constants.jsx';

export const login = (user, callback, errorCallback) => {
  axios.post(`${BASE_URL}/auth/signin`, user)
    .then(res => callback(res))
    .catch(error => errorCallback(error));
};

export const signUp = (newUser, callback, errorCallback) => {
  axios.post(`${BASE_URL}/auth/signup`, newUser)
    .then(res => callback(res))
    .catch(error => errorCallback(error));
};

export const validateUsername = (username, callback) => {
  axios.get(`${BASE_URL}/auth/isExistByUsername/${username}`)
    .then( res => callback(res.data));
};

export const validateEmail = (email, callback) => {
  axios.get(`${BASE_URL}/auth/isExistByEmail/${email}`)
    .then( res => callback(res.data));
};
