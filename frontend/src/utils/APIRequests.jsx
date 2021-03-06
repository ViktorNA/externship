import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { BASE_URL } from './Constants.jsx';
import { getToken } from './LocalStorageUtils.jsx';

const config = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

export const getBoardsOfUser = (callback) => {
  axios.get(`${BASE_URL}/boards`, config()).then((res) => {
    callback(res.data);
  });
};

export const getBoardById = (boardId, callback, errorCallback) => {
  axios
    .get(`${BASE_URL}/boards/${boardId}`, config())
    .then((res) => {
      const lists = res.data;
      lists.sort((a, b) => a.position - b.position);
      callback(lists);
    })
    .catch((error) => errorCallback(error));
};

export const addListToBoard = (boardId, list, callback) => {
  axios
    .post(`${BASE_URL}/lists?boardId=${boardId}`, list, config())
    .then((res) => {
      if (res.status === 200) {
        callback(res.data);
      }
    });
};

export const deleteListFromBoard = (boardId, listId, callback) => {
  axios
    .delete(`${BASE_URL}/lists?listId=${listId}&boardId=${boardId}`, config())
    .then((res) => {
      callback(listId);
    });
};

export const changeListsPositions = (
  sourcePosition,
  destinationPosition,
  boardId,
  callback
) => {
  axios
    .put(
      `${BASE_URL}/lists/changePosition?sourcePosition=${sourcePosition}&destinationPosition=${destinationPosition}&boardId=${boardId}`,
      {},
      config()
    )
    .then((res) => {
      callback(res.data);
    });
};

export const addBoardToUser = (newBoard, callback) => {
  axios.post(`${BASE_URL}/boards`, newBoard, config()).then((res) => {
    callback(res.data);
  });
};
