import { hot } from 'react-hot-loader/root';
import React from "react";
import MainRouter from '../routes/MainRouter.jsx';
import {StateProvider} from '../store/store.jsx';
import './App.scss';

const App = () => (
  <StateProvider>
    <MainRouter/>
  </StateProvider>
);
export default hot(App);
