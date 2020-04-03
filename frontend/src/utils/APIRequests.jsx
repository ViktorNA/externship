import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import {BASE_URL} from './Constants.jsx';
import {getToken} from './LocalStorageUtils.jsx';

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
};

export const getBoardsOfUser = (callback) => {
  axios.get(`${BASE_URL}/boards`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const getBoardById = (boardId, callback) => {
  axios.get(`${BASE_URL}/lists/${boardId}`, config())
    .then((res) => {
      const lists = res.data;
      lists.sort( (a,b) => a.position - b.position);
      callback(lists)
    })
};

export const addListToBoard = (boardId, list, callback) => {
  axios.post(`${BASE_URL}/lists?boardId=${boardId}`, list, config())
    .then( (res) => {
      if(res.status === 200) {
        callback(res.data);
      }
    });
};

export const deleteListFromBoard = (boardId, listId, callback) => {
  axios.delete(`${BASE_URL}/lists?listId=${listId}&boardId=${boardId}`, config())
    .then( (res) => {
      callback(listId);
    });
};

export const changeListsPositions = (sourcePosition, destinationPosition, boardId, callback) => {
  axios.put(
    `${BASE_URL}/lists/changePosition?sourcePosition=${sourcePosition}&destinationPosition=${destinationPosition}&boardId=${boardId}`,
    {},
    config()
  )
    .then( (res) => {
      callback(res.data);
    })
};

export const addBoardToUser = (newBoard, userId, callback) => {
  axios.post(`${BASE_URL}/boards?userId=${userId}`, newBoard, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const registerNewUser = (newUser, callback) => {
  axios.post(`${BASE_URL}/auth/signup`, newUser)
    .then( (res) => callback(res.data))
};

export const login = (user, callback) => {
  axios.post(`${BASE_URL}/auth/signin`, user)
    .then(res => callback(res));
};

export const signUp = (newUser, callback) => {
  axios.post(`${BASE_URL}/auth/signup`, newUser)
    .then(res => callback(res));
};
