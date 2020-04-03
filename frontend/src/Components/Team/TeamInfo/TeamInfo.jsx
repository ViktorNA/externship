import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {createBoard, getBoardsOfTeam, getUsersOfTeam} from '../../../utils/APIRequests/TeamRequest.jsx';
import AddUser from './AddUser.jsx';

const TeamInfo = () => {
  const {teamId} = useParams();
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [users, setUsers] = useState([]);
  const getBoardsCallback = (data)=> {
    setBoards(data);
  };
  const getUsersCallback =(data) => {
    setUsers(data);
  };
  useEffect( ()=> {
    getBoardsOfTeam(teamId, getBoardsCallback);
    getUsersOfTeam(teamId, getUsersCallback);
  }, []);
  const handleAddBoard = (e) => {
    e.preventDefault();
    createBoard({name: newBoardName}, teamId, addBoardCallback);
  };
  const addBoardCallback = (data) => {
    setBoards([...boards, data]);
    setNewBoardName('');
  };
  return (
    <div>
      <h5>Boards of team:</h5>
      <form onSubmit={handleAddBoard}>
        <input value={newBoardName} onChange={(e) => setNewBoardName(e.target.value)}/>
        <button type={'submit'}>Add board</button>
      </form>
      <div>
        {boards.map( board => <div key={board.id}><Link to={`/boards/${board.id}`} >{board.name}</Link></div>)}
      </div>
      <h5>Users of team:</h5>
      <div>
        {users.map( user => <div key={user.id}><Link to={`/users/${user.username}`} >{user.username}</Link></div>)}
      </div>
      {/*TODO:*/}
      <h5>Add user</h5>
      <AddUser members={users} teamId={teamId}/>
    </div>
  )
};

export default TeamInfo;