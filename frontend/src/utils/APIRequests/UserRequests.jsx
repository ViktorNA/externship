import axios from 'axios';
import {BASE_URL} from '../Constants.jsx';
import {config} from './config.jsx';

export const getUserInfoByUsername = (username, callback) => {
  axios.get(`${BASE_URL}/users/{username}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const getAllUsers = (callback) => {
  axios.get(`${BASE_URL}/users`, config())
    .then( (res) => {
      callback(res.data);
    })
};
