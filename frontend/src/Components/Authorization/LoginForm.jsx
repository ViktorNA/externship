import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {login} from '../../utils/APIRequests.jsx';
import styles from './FormStyles.scss';
import {getToken, saveUserToLocalStorage, setToken} from '../../utils/LocalStorageUtils.jsx';
import {MAIN_COLOR} from '../../utils/Constants.jsx';


const LoginForm = () => {
  const [usernameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const loginCallback = (res) => {
    setToken(res.data.accessToken);
    saveUserToLocalStorage(res.data.user);
    history.push('/boards');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login({usernameOrEmail, password}, loginCallback);
  };

  return(
    <div className={styles.Form}>
      {/*TODO: redirect*/}
      {getToken() && <Redirect to={{ pathname: "/boards"} }/>}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username or email</label>
          <input
            placeholder={' Username or email'}
            value={usernameOrEmail}
            onChange={(e) => setUserNameOrEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field >
          <label>Password</label>
          <input
            type={'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button color={MAIN_COLOR} type={'submit'} loading={isLoading}>Login</Button>
        <Button basic color={MAIN_COLOR} onClick={()=>history.push("/signup")} disabled={isLoading}>Sign Up</Button>
      </Form>
    </div>
  );
};

export default LoginForm;