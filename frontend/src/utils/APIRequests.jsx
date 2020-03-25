import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios';
import {BASE_URL} from './Constants.jsx';

export const getBoardsOfUser = async (id) => {
  return axios.get(`${BASE_URL}/boards/boardsOfUser/${id}`);
};
