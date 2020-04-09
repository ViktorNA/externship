import { hot } from 'react-hot-loader/root';
import React from 'react';
import MainRouter from '../routes/MainRouter.jsx';
import { StateProvider } from '../store/store.jsx';
import 'semantic-ui-css/semantic.min.css';
import styles from './App.scss';
import Header from './Header/Header.jsx';
import { BrowserRouter } from 'react-router-dom';
import TeamsOfUser from './Team/TeamsOfUser.jsx';

const App = () => (
  <StateProvider>
    <BrowserRouter>
      <Header />
      <MainRouter />
    </BrowserRouter>
  </StateProvider>
);
export default hot(App);
