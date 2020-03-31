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

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/boards">
          <BoardsOfUser/>
        </Route>
        <Route exact path="/boards/:boardId" >
          <ListBoard />
        </Route>
        <Route exact path="/signup" >
          <SignupForm />
        </Route>
        <Route expact path="/">
          <LoginForm/>
        </Route>
      </Switch>
    </Router>
  )
};

export default MainRouter;