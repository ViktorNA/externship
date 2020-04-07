import React, {useState} from 'react';
import BoardCardEdit from './BoardCardEdit.jsx';
import BoardCardName from './BardCardName.jsx';
import {renameBoardById} from '../../../utils/APIRequests/BoardRequests.jsx';
import {useStore} from '../../../store/store.jsx';
import createNotification from '../../../utils/Notifications.jsx';

const BoardCard = ({board, deleteBoardHandler}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state]= useStore();
  const {boards, setBoards} = state;

  const renameBoardCallback = (boardName) => (data) => {
    const newBoards = boards.filter( (newBoard) => newBoard.id !== board.id);
    setBoards([...newBoards, {...board, name: boardName}]);
    setIsEditing(!isEditing);
  };
  const renameBoard = (boardName) => {
    if(!boardName) {
      createNotification('error')('Board name can not be blank');
      return;
    }
    renameBoardById(board.id, {...board, name: boardName}, renameBoardCallback(boardName));
  };

  const toggleEditing = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };
  return isEditing ?
    (<BoardCardEdit board={board} toggleEditing={toggleEditing} renameBoard={renameBoard}/>) :
    (<BoardCardName board={board} toggleEditing={toggleEditing} deleteBoardHandler={deleteBoardHandler}/>);
};

export default BoardCard;
