import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styles from '../ListBoard.scss';
import axios from 'axios';

const List = ({listName, index, id, deleteList}) => {
  const deleteOnClick =() => {
    //TODO: remove axios to separate file
    axios.delete(`http://localhost:8080/api/lists/${id}`)
      .then( (res) => {
        console.log(res);
        deleteList(id, index);
      });
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
