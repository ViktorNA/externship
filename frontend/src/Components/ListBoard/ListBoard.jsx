import React, {useState, useEffect} from 'react';
import AddListFrom from './AddList/AddListForm.jsx';
import List from './List/List.jsx';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styles from './ListBoard.scss';
import axios from 'axios';

const ListBoard = ({boardId}) => {
  const [lists, setLists] = useState([]);
  const addList = (list) => {
    setLists([...lists, list])
  };
  const deleteList = (id, index) => {
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists.map( (list) => list.index>index?{...list, index: list.index-1}:list));
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
    setLists(newLists.map( (x, i) => ({...x, index: i})));
    //TODO: remove axios to separate file
    axios.post(`http://localhost:8080/api/lists/swapIndexes?index1=${source.index}&index2=${destination.index}`)
      .then((res) => console.log(res))
  };

  useEffect(() => {
    //TODO: remove axios to separate file
    axios.get('http://localhost:8080/api/boards/boardsOfUser/1')
      .then((res) => {
          const lists = res.data[0].lists;
          console.log(lists);
          lists.sort( (a,b) => a.position - b.position);
          setLists(lists)
    })
  }, []);
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`$s{boardId}`} direction={'horizontal'}>
          {(provided) => (
            <div className={styles.Board} ref={provided.innerRef} {...provided.droppableProps}>
              {lists.map((list) => <List
                listName={list.name}
                key={list.id}
                index={list.position}
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
