import axios from 'axios';
import {BASE_URL} from '../Constants.jsx';
import {config} from './config.jsx';

export const getTeamsOfUser = (callback) => {
  axios.get(`${BASE_URL}/teams`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const createTeam = (newTeam, callback) => {
  axios.post(`${BASE_URL}/teams`, newTeam, config())
    .then( (res) => {
      callback(res.data);
    })
};
