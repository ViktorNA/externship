import { hot } from 'react-hot-loader/root';
import React from "react";
import ListBoard from './ListBoard/ListBoard.jsx';
import './App.scss';

const App = () => (
  <div>
     <ListBoard boardId={'1'}/>
  </div>
);
export default hot(App);
