import React, {useState} from 'react';
import AddListFrom from './AddList/AddListForm.jsx';
import List from './List/List.jsx';
import styles from './ListBoard.scss';

const ListBoard = () => {
  const [lists, setLists] = useState([]);
  const addList = (list) => {
    setLists([...lists, list])
  };
  const deleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };
  return (
    <div className={styles.Board}>
      {lists.map((list) => <List listName={list.name} key={list.id} id={list.id} deleteList={deleteList}/> )}
      <AddListFrom addList={addList}/>
    </div>
  )
};

export default ListBoard;