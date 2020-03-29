import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import {BASE_URL} from './Constants.jsx';

export const getBoardsOfUser = (id, callback) => {
  axios.get(`${BASE_URL}/boards/boardsOfUser/${id}`)
    .then( (res) => {
      callback(res.data);
    })
};

export const getBoardById = (boardId, callback) => {
  axios.get(`${BASE_URL}/boards/${boardId}`)
    .then((res) => {
      const lists = res.data.lists;
      lists.sort( (a,b) => a.position - b.position);
      callback(lists)
    })
};

export const addListToBoard = (boardId, list, callback) => {
  axios.post(`${BASE_URL}/lists?boardId=${boardId}`, list)
    .then( (res) => {
      if(res.status === 200) {
        callback(res.data);
      }
    });
};

export const deleteListFromBoard = (boardId, listId, callback) => {
  axios.delete(`${BASE_URL}/lists?listId=${listId}&boardId=${boardId}`)
    .then( (res) => {
      callback(listId);
    });
};

export const changeListsPositions = (sourcePosition, destinationPosition, boardId, callback) => {
  axios.put(`${BASE_URL}/lists/changePosition?sourcePosition=${sourcePosition}&destinationPosition=${destinationPosition}&boardId=${boardId}`)
    .then( (res) => {
      callback(res.data);
    })
};

export const addBoardToUser = (newBoard, userId, callback) => {
  axios.post(`${BASE_URL}/boards?userId=${userId}`, newBoard)
    .then( (res) => {
      callback(res.data);
    })
};

export const registerNewUser = (newUser, callback) => {
  axios.post(`${BASE_URL}/users`, newUser)
    .then( (res) => callback(res.data))
}
