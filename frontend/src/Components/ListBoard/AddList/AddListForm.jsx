import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';
import boarStyles from '../ListBoard.scss';
import styles from './AddListFrom.scss';
import {Draggable} from 'react-beautiful-dnd';
import axios from 'axios';
import {addListToBoard} from '../../../utils/APIRequests.jsx';

const AddListFrom = ({addList, id, index, boardId}) => {
  const [listName, setListName] = useState('');
  const addListCallback = (data) => {
    addList(data);
    setListName('');
  };
  const submitFrom = (e) => {
    e.preventDefault();
    const list = {name: listName, index: index};
    addListToBoard(boardId, list, addListCallback);
  };
  return (
    <Draggable draggableId={`${id}`} index={index} isDragDisabled={true}>
    {(provided) => (
    <div className={boarStyles.boardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
      <form className={styles.addListForm} onSubmit={submitFrom}>
        <input
          className={styles.nameInput}
          placeholder={'Enter list name...'}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button className={styles.addButton}>Add list</button>
      </form>
    </div>)}
</Draggable>
  )
};

export default AddListFrom;