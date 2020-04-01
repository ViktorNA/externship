import React, {useState, useEffect} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {deleteListFromBoard} from '../../../utils/APIRequests.jsx';
import {addCardToList, getCardsOfList} from '../../../utils/APIRequests/CardRequests.jsx';
import Card from './Card/Card.jsx';
import listStyles from './List.scss';
import styles from '../ListBoard.scss';

const List = ({listName, index, id, boardId, deleteList}) => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  useEffect( () => {
    getCardsOfList(id, setCards);
  }, []);

  const addCardCallback = (newCard) => {
    setCards([...cards, newCard]);
  };
  const handleAddCard = (e) => {
    e.preventDefault();
    addCardToList(id, {name: newCardName}, addCardCallback);
    setNewCardName('')
  };

  const deleteOnClick =() => {
    deleteListFromBoard(boardId, id, deleteList);
  };
  return(
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div className={styles.boardItem} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div>
            {listName}
          </div>
          <button onClick={deleteOnClick}>Delete</button>
          <form onSubmit={handleAddCard}>
            <input
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              className={listStyles.cardNameInput}
              placeholder={'Enter card name'}
            />
            <button type={'submit'}>Add</button>
          </form>
          {cards.map( card => <Card key={card.id} name={card.name}/>)}
        </div>)}
    </Draggable>
  )
};

export default List;
