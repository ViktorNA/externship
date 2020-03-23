import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';
import styles from './AddListFrom.scss';
import commonStyles from '../commonStyles.scss';

function AddListFrom({addList}) {
  const [listName, setListName] = useState('');
  const submitFrom = (e) => {
    e.preventDefault();
    addList({name: listName, id: uuid()});
    setListName('');
  };
  return (
    <div className={commonStyles.container}>
      <form className={styles.addListForm} onSubmit={submitFrom}>
        <input
          className={styles.nameInput}
          placeholder={'Enter list name...'}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button className={styles.addButton}>Add list</button>
      </form>
    </div>
  )
}

export default AddListFrom;