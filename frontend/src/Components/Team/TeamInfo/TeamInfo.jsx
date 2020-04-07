import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {createBoard, getBoardsOfTeam, getUsersOfTeam} from '../../../utils/APIRequests/TeamRequest.jsx';
import BoardList from '../../BoardList/BoardList.jsx';
import {deleteBoard} from '../../../utils/APIRequests/BoardRequests.jsx';

const TeamInfo = () => {
  const {teamId} = useParams();
  const [boards, setBoards] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const addBoard = (newBoard) => {
    setIsLoading(true);
    createBoard(newBoard, teamId, addBoardCallback);
  };
  const addBoardCallback = (data) => {
    setBoards([...boards, data]);
    setIsLoading(false);
  };
  const deleteBoardHandler = (boardId) => {
    deleteBoard(boardId, ()=>{});
    setBoards(boards.filter( board => board.id !== boardId));
  };
  return (
    <div>
      <h5>Boards of team:</h5>
      <BoardList
        boards={boards}
        deleteBoardHandler={deleteBoardHandler}
        addNewBoard={addBoard}
        isLoading={isLoading}
        />
    </div>
  )
};

export default TeamInfo;