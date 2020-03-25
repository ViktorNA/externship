import React, {useEffect, useState} from 'react';
import {getBoardsOfUser} from '../../utils/APIRequests.jsx';
import BoardCard from './BoardCard/BoardCard.jsx';

const BoardsOfUser = ({setUpperLevelBoards}) => {
  const [boards, setBoards] = useState([]);
  useEffect( () => {
    getBoardsOfUser(1)
      .then(res => {
        setBoards(res.data);
        setUpperLevelBoards(res.data);
      })
  }, []);
  return (
    <div>
      {boards.map( (board) => <BoardCard
        key={board.id}
        name={board.name}
        id={board.id}
      />)}
    </div>
  )
};

export default BoardsOfUser;