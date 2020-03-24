import React, {useState} from 'react';
import AddListFrom from './AddList/AddListForm.jsx';
import List from './List/List.jsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styles from './ListBoard.scss';

const ListBoard = ({boardId}) => {
  const [lists, setLists] = useState([]);
  const addList = (list) => {
    setLists([...lists, list])
  };
  const deleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };
  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;
    if(!destination) return;
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    const draggableItem = lists[source.index];
    const newLists = Array.from(lists);
    newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, draggableItem);
    setLists(newLists);
  };
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardId} direction={'horizontal'}>
          {(provided) => (
            <div className={styles.Board} ref={provided.innerRef} {...provided.droppableProps}>
              {lists.map((list, index) => <List
                listName={list.name}
                key={list.id}
                index={index}
                id={list.id}
                deleteList={deleteList}
              /> )}
              <AddListFrom id={"add-list-form"} index={lists.length} addList={addList}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  )
};

export default ListBoard;