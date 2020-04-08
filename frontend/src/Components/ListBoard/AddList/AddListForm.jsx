import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { addListToBoard } from '../../../utils/APIRequests.jsx';
import createNotification from '../../../utils/Notifications.jsx';
import { Button } from 'semantic-ui-react';
import boarStyles from '../ListBoard.scss';
import styles from './AddListFrom.scss';

const AddListFrom = ({ addList, id, index, boardId }) => {
  const [listName, setListName] = useState('');
  const addListCallback = (data) => {
    addList(data);
    setListName('');
  };
  const submitFrom = (e) => {
    e.preventDefault();
    if (!listName) {
      createNotification('error')('List name can not be empty');
    }
    const list = { name: listName, index: index };
    addListToBoard(boardId, list, addListCallback);
  };
  return (
    <Draggable draggableId={`${id}`} index={index} isDragDisabled={true}>
      {(provided) => (
        <div
          className={boarStyles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form className={styles.addListForm} onSubmit={submitFrom}>
            <input
              className={styles.nameInput}
              placeholder={'Enter list name...'}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className={styles.addButton}>
              <Button color={'green'}>Add list</Button>
            </div>
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default AddListFrom;
