import React, {useEffect, useState, useContext} from 'react';
import {addBoardToUser, getBoardsOfUser} from '../../utils/APIRequests.jsx';
import BoardCard from './BoardCard/BoardCard.jsx';
import {store} from '../../store/store.jsx'

const BoardsOfUser = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const context = useContext(store);
  const {userId} = context.state;
  const addNewBoard = (newBoard) => {
    setBoards([...boards, newBoard]);
    setNewBoardName('');
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      name: newBoardName,
    };
    addBoardToUser(newBoard, userId, addNewBoard)
  };
  useEffect( () => {
    getBoardsOfUser(userId, setBoards);
  }, []);
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)} placeholder={'Enter board name'}/>
        <button>Add board</button>
      </form>
      <div>
        {boards.map( (board) => <BoardCard
          key={board.id}
          name={board.name}
          id={board.id}
        />)}
      </div>
    </div>
  )
};

export default BoardsOfUser;