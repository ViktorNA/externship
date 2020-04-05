import axios from 'axios';
import {BASE_URL} from '../Constants.jsx';
import {config} from './config.jsx';

export const deleteBoard = (boardId, callback) => {
  axios.delete(`${BASE_URL}/boards?boardId=${boardId}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const renameBoardById = (boardId, newBoard, callback) => {
  axios.put(`${BASE_URL}/boards/rename?boardId=${boardId}`, newBoard, config())
    .then( (res) => callback(res));
};
