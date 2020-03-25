import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BoardsOfUser from '../Components/BoardsOfUser/BoardsOfUser.jsx';
import ListBoard from '../Components/ListBoard/ListBoard.jsx';

const MainRouter = () => {
  const [upperLevelBoards, setUpperLevelBoards] = useState([]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <ListBoard boardId={1}/>
        </Route>
      </Switch>
    </Router>
  )
};

export default MainRouter;