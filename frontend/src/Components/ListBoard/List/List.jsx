import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styles from '../ListBoard.scss';

const List = ({listName, index, id, deleteList}) => {
  const deleteOnClick =() => {
    deleteList(id);
  };
  return(
    <Draggable draggableId={id} index={index}>
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