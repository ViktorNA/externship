import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from '../Components/Authorization/LoginForm.jsx';
import SignupForm from '../Components/Authorization/SignupForm.jsx';
import PageNotFound from '../Components/Error/PageNotFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Home from '../Components/Home/Home.jsx';
import About from '../Components/About/About.jsx';
import TeamInfo from '../Components/Team/TeamInfo/TeamInfo.jsx';
import Profile from '../Components/Profile/Profile.jsx';
import BoardsRouter from './BoardsRouter.jsx';
import ConfirmEmail from '../Components/Authorization/ConfirmEmail.jsx';
import EmailConfirmed from '../Components/Authorization/EmailConfirmed.jsx';

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/about">
        <About />
      </Route>

      <PrivateRoute path="/boards">
        <BoardsRouter />
      </PrivateRoute>

      <Route exact path="/login">
        <LoginForm />
      </Route>

      <Route exact path="/signup">
        <SignupForm />
      </Route>

      <PrivateRoute path="/teams">
        <BoardsRouter />
      </PrivateRoute>

      <PrivateRoute exact path="/teams/:teamId">
        <TeamInfo />
      </PrivateRoute>

      <PrivateRoute exact path="/users/:username">
        <Profile />
      </PrivateRoute>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/confirmEmail">
        <ConfirmEmail />
      </Route>

      <Route exact path="/confirm/:token">
        <EmailConfirmed />
      </Route>

      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default MainRouter;
