import { hot } from 'react-hot-loader/root';
import React from "react";
import ListBoard from './ListBoard/ListBoard.jsx';
import './App.scss';
import MainRouter from '../routes/MainRouter.jsx';

const App = () => (
  <div>
    <MainRouter/>
     {/*<ListBoard boardId={'1'}/>*/}
  </div>
);
export default hot(App);
