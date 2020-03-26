import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styles from '../ListBoard.scss';
import axios from 'axios';
import {deleteListFromBoard} from '../../../utils/APIRequests.jsx';

const List = ({listName, index, id, boardId, deleteList}) => {
  const deleteOnClick =() => {
    deleteListFromBoard(boardId, id, deleteList);
  };
  return(
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div className={styles.boardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div>
            {listName}
          </div>
          <button onClick={deleteOnClick}>Delete</button>
        </div>)}
    </Draggable>
  )
};

export default List;
