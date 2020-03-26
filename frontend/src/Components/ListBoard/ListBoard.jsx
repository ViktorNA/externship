import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import AddListFrom from './AddList/AddListForm.jsx';
import List from './List/List.jsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styles from './ListBoard.scss';
import axios from 'axios';
import {changeListsPositions, getBoardById} from '../../utils/APIRequests.jsx';

const ListBoard = () => {
  const [lists, setLists] = useState([]);
  const {boardId} = useParams();
  const addList = (list) => {
    setLists([...lists, list])
  };
  const deleteList = (id) => {
    const position = lists.findIndex((list) => list.id === id);
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists.map( (list) => list.position>position?{...list, position: list.position-1}:list));
  };
  const onDragEnd = (result) => {
    const {destination, source} = result;
    if(!destination) return;
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    const draggableItem = lists[source.index];
    const newLists = Array.from(lists);
    newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, draggableItem);
    setLists(newLists.map( (x, i) => ({...x, position: i})));
    changeListsPositions(source.index, destination.index, boardId, ()=>{});
  };

  useEffect(() => {
    getBoardById(boardId, setLists);
  }, []);
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`$s{boardId}`} direction={'horizontal'}>
          {(provided) => (
            <div className={styles.Board} ref={provided.innerRef} {...provided.droppableProps}>
              {lists.map((list) => <List
                boardId={boardId}
                listName={list.name}
                key={list.id}
                index={list.position}
                id={list.id}
                deleteList={deleteList}
              /> )}
              <AddListFrom boardId={boardId} id={"add-list-form"} index={lists.length} addList={addList}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  )
};

export default ListBoard;
