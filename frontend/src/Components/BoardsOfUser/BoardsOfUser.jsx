import React, {useEffect, useState, useContext} from 'react';
import {addBoardToUser, getBoardsOfUser} from '../../utils/APIRequests.jsx';
import {store} from '../../store/store.jsx'
import {deleteBoard} from '../../utils/APIRequests/BoardRequests.jsx';
import BoardList from '../BoardList/BoardList.jsx';

const BoardsOfUser = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(store);
  const {userId} = context.state;

  const addNewBoardCallback = (newBoard) => {
    setBoards([...boards, newBoard]);
    setIsLoading(false);
  };

  const addNewBoard = (newBoard) => {
    setIsLoading(true);
    addBoardToUser(newBoard, userId, addNewBoardCallback)
  };

  const deleteBoardCallback = (res) => {
    console.log(res);
  };

  const deleteBoardHandler = (boardId) => {
    deleteBoard(boardId, deleteBoardCallback);
    setBoards(boards.filter( board => board.id !== boardId));
  };
  useEffect( () => {
    getBoardsOfUser(setBoards);
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