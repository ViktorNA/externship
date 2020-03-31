import React, {useState} from 'react';
import styles from './FormStyles.scss';
import {Button, Form} from 'semantic-ui-react';
import {MAIN_COLOR} from '../../utils/Constants.jsx';
import {signUp} from '../../utils/APIRequests.jsx';
import {useHistory} from 'react-router-dom';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const signupCallback = (res) => {
    history.push('/')
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({name, username, email, password}, signupCallback);
  };
  return(
    <div className={styles.Form}>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder={'Enter username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Full name</label>
          <input
            placeholder={'Enter full name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder={'Enter email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button color={MAIN_COLOR} type={'submit'}>Sign Up</Button>
      </Form>
    </div>
  )
};

export default SignupForm;