import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {store} from '../../store/store.jsx';
import {registerNewUser} from '../../utils/APIRequests.jsx';

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const context = useContext(store);
  useEffect( () => {
    axios.get(`http://localhost:8080/api/users`)
      .then((res) => {
        setUsers(res.data)
  });
  }, []);

  const addNewUser = (newUser) => {
    setUsers([...users, newUser])
    setNewUserName('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: newUserName,
    };
    registerNewUser(newUser, addNewUser)
  };
  const handleOnLink = (userId) => {
    context.dispatch({type: "SET_USER_ID", userId: userId})
  };
  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <input value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder={'Enter new user name'}/>
        <button>Add user</button>
      </form>
      {users.map( (user) => <div key={user.id}><Link onClick={() => handleOnLink(user.id)}  to="boards">{user.username}</Link></div>)}
    </div>
  );
};

export default LoginForm;