//Please, go back



import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../../utils/Constants.jsx';
import {config} from '../../../utils/APIRequests/config.jsx';
import {addUserToTeam} from '../../../utils/APIRequests/TeamRequest.jsx';

const AddUser = ({members = [], teamId}) => {
  const [users, setUsers] = useState([]);
  useEffect( () => {
    axios.get(`${BASE_URL}/users`, config())
      .then( (res) => {
        setUsers(res.data);
      })
  },[]);

  const addUser = (userId) => {
    addUserToTeam(teamId, userId, (res) => window.location.reload());
  };
  return (
    <div>
      {users.map( (user) =>{
        const  isInTeam = members.some(member => member.id === user.id);
        const {id}= user;
        if(!isInTeam) return (
        <button key={user.id} onClick={() => addUser(id)}>
         {user.username}
        </button>)
      })}
    </div>
  )
};

export default AddUser;