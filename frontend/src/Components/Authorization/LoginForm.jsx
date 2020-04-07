import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react'
import {login} from '../../utils/APIRequests/AuthRequests.jsx';
import styles from './FormStyles.scss';
import {getToken, saveUserToLocalStorage, setToken} from '../../utils/LocalStorageUtils.jsx';
import {MAIN_COLOR} from '../../utils/Constants.jsx';


const LoginForm = () => {
  const [usernameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Unknown error');
  const history = useHistory();
  const loginCallback = (res) => {
    setToken(res.data.accessToken);
    saveUserToLocalStorage(res.data.user);
    history.push('/boards');
  };
  const loginErrorCallback = (error) => {
    setIsError(true);
    setErrorMessage(error.response.data.message);
    setIsLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    if(!usernameOrEmail) {
      setIsLoginError(true);
      return;
    }
    if(!password) {
      setIsPasswordError(true);
      return;
    }
    setIsLoading(true);
    login({usernameOrEmail, password}, loginCallback, loginErrorCallback);
  };
  const usernameOrEmailOnChange =(e) => {
    setIsLoginError(false);
    setUserNameOrEmail(e.target.value);
  };
  const passwordOnChange =(e) => {
    setIsPasswordError(false);
    setPassword(e.target.value);
  };
  return(
    <div className={styles.Form}>
      {/*TODO: redirect*/}
      {getToken() && <Redirect to={{ pathname: "/boards"} }/>}
      <Form onSubmit={handleSubmit}>
        <Form.Field error={isLoginError}>
          <label>Username or email</label>
          <Input
            placeholder={'Username or email'}
            value={usernameOrEmail}
            onChange={usernameOrEmailOnChange}
          />
        </Form.Field>
        <Form.Field error={isPasswordError}>
          <label>Password</label>
          <Input
            type={'password'}
            placeholder='Password'
            value={password}
            onChange={passwordOnChange}
            error
          />
        </Form.Field>
        <Button color={MAIN_COLOR} type={'submit'} loading={isLoading}>Login</Button>
        <Button basic color={MAIN_COLOR} onClick={()=>history.push("/signup")} disabled={isLoading}>Sign Up</Button>
      </Form>
      <p className={styles.errorMessage}>{isError && `Error: ${errorMessage}`}</p>
    </div>
  );
};

export default LoginForm;