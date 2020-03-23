import React from 'react';
import styles from  './List.scss';
import commonStyles from '../commonStyles.scss';

function List({listName, id, deleteList}) {
  const deleteOnClick =() => {
    deleteList(id);
  };
  return(
    <div className={commonStyles.container}>
      <div>
        {listName}
      </div>
      <button onClick={deleteOnClick}>Delete</button>
    </div>
  )
}

export default List;