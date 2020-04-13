import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BoardsOfUser from '../Components/BoardsOfUser/BoardsOfUser.jsx';
import ListBoard from '../Components/ListBoard/ListBoard.jsx';
import LoginForm from '../Components/Authorization/LoginForm.jsx';
import SignupForm from '../Components/Authorization/SignupForm.jsx';
import PageNotFound from '../Components/Error/PageNotFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Header from '../Components/Header/Header.jsx';
import TeamsOfUser from '../Components/Team/TeamsOfUser.jsx';
import Home from '../Components/Home/Home.jsx';
import About from '../Components/About/About.jsx';
import TeamInfo from '../Components/Team/TeamInfo/TeamInfo.jsx';
import Profile from '../Components/Profile/Profile.jsx';
import styles from '../Components/App.scss';
import MainRouter from './MainRouter.jsx';
import BoardList from '../Components/BoardList/BoardList.jsx';
import SideBar from '../Components/SideBar/SideBar.jsx';

const BoardsRouter = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Left}>
        <SideBar />
      </div>
      <div className={styles.Right}>
        <Switch>
          <Route exact path={'/boards'}>
            <BoardsOfUser />
          </Route>
          <Route exact path={'/boards/:boardId'}>
            <ListBoard />
          </Route>
          <Route exact path="/teams/:teamId">
            <TeamInfo />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default BoardsRouter;
