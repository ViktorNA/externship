import React, {useEffect, useState, useContext} from 'react';
import {addBoardToUser, getBoardsOfUser} from '../../utils/APIRequests.jsx';
import {useStore} from '../../store/store.jsx'
import {deleteBoard} from '../../utils/APIRequests/BoardRequests.jsx';
import BoardList from '../BoardList/BoardList.jsx';
import createNotification from '../../utils/Notifications.jsx';

const BoardsOfUser = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStore();

  const addNewBoardCallback = (newBoard) => {
    setBoards([...boards, newBoard]);
    setIsLoading(false);
  };

  const addNewBoard = (newBoard) => {
    const boardName = newBoard.name;
    if(!boardName) {
      createNotification('error')('Name can not be empty');
      return;
    }
    setIsLoading(true);
    addBoardToUser(newBoard, addNewBoardCallback)
  };

  const deleteBoardCallback = (res) => {
  };

  const deleteBoardHandler = (boardId) => {
    deleteBoard(boardId, deleteBoardCallback);
    setBoards(boards.filter( board => board.id !== boardId));
  };
  const getBoardsOfUserCallback = (data) => {
    setBoards(data);
    dispatch({type: 'SAVE_BOARDS', boards: data, setBoards});
  };
  useEffect( () => {
    getBoardsOfUser(getBoardsOfUserCallback);
  }, []);
  return (
    <BoardList
      boards={boards}
      deleteBoardHandler={deleteBoardHandler}
      addNewBoard={addNewBoard}
      isLoading={isLoading}
    />
  )
};

export default BoardsOfUser;