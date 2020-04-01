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

const MainRouter = () => {
  return (
    <Router>
      <Header/>
      <Switch>

        <PrivateRoute exact path="/boards">
          <BoardsOfUser/>
        </PrivateRoute>

        <PrivateRoute exact path="/boards/:boardId" >
          <ListBoard />
        </PrivateRoute>

        <Route exact path="/signup" >
          <SignupForm />
        </Route>

        <PrivateRoute exact path="/teams">
          <TeamsOfUser/>
        </PrivateRoute>

        <Route exact path="/" >
          <LoginForm/>
        </Route>

        <Route>
          <PageNotFound/>
        </Route>

      </Switch>
    </Router>
  )
};

export default MainRouter;