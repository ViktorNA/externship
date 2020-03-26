import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BoardsOfUser from '../Components/BoardsOfUser/BoardsOfUser.jsx';
import ListBoard from '../Components/ListBoard/ListBoard.jsx';

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/boards">
          <BoardsOfUser userId={1}/>
        </Route>
        <Route path="/boards/:boardId" >
          <ListBoard />
        </Route>
      </Switch>
    </Router>
  )
};

export default MainRouter;