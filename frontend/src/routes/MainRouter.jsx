import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
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

const MainRouter = () => {
  return (
    <Router>
      <Header/>
      <Switch>

        <Route exact path="/about">
          <About/>
        </Route>

        <PrivateRoute exact path="/boards">
          <BoardsOfUser/>
        </PrivateRoute>

        <PrivateRoute exact path="/boards/:boardId" >
          <ListBoard />
        </PrivateRoute>

        <Route exact path='/login' >
          <LoginForm/>
        </Route>

        <Route exact path="/signup" >
          <SignupForm />
        </Route>

        <PrivateRoute exact path="/teams">
          <TeamsOfUser/>
        </PrivateRoute>

        <PrivateRoute exact path="/teams/:teamId">
          <TeamInfo/>
        </PrivateRoute>

        <PrivateRoute exact path="/users/:username">
          <Profile/>
        </PrivateRoute>

        <Route exact path="/" >
          <Home/>
        </Route>

        <Route>
          <PageNotFound/>
        </Route>

      </Switch>
    </Router>
  )
};

export default MainRouter;