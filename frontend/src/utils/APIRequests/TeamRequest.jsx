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

export const getBoardsOfTeam = (teamId, callback) => {
  axios.get(`${BASE_URL}/teams/boardsOfTeam/${teamId}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const createBoard = (board, teamId, callback) => {
  axios.post(`${BASE_URL}/teams/createBoard?teamId=${teamId}`, board, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const getUsersOfTeam = (teamId, callback) => {
  axios.get(`${BASE_URL}/teams/usersOfTeam/${teamId}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const addUserToTeam = (teamId, userId, callback) => {
  axios.put(`${BASE_URL}/teams/addUserToTeam?teamId=${teamId}&userId=${userId}`, {}, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const deleteUserFromTeam = (teamId, userId, callback) => {
  axios.put(`${BASE_URL}/teams/deleteUserFromTeam?teamId=${teamId}&userId=${userId}`, {}, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const deleteTeam = (teamId, callback) => {
  axios.delete(`${BASE_URL}/teams?teamId=${teamId}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const updateTeam = (teamId, newTeam, callback) => {
  axios.put(`${BASE_URL}/teams/update?teamId=${teamId}`, newTeam, config())
    .then( (res) => {
      callback(res.data);
    })
};
