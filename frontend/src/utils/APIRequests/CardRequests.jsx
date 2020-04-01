import axios from 'axios';
import {BASE_URL} from '../Constants.jsx';
import {config} from './config.jsx';

export const getCardsOfList = (listId, callback) => {
  axios.get(`${BASE_URL}/cards?listId=${listId}`, config())
    .then( (res) => {
      callback(res.data);
    })
};

export const addCardToList = (listId, card, callback) => {
  axios.post(`${BASE_URL}/cards?listId=${listId}`, card, config())
    .then( (res) => {
      callback(res.data);
    })
}