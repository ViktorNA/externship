import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { deleteListFromBoard } from '../../../utils/APIRequests.jsx';
import {
  addCardToList,
  deleteCardById,
  getCardsOfList,
} from '../../../utils/APIRequests/CardRequests.jsx';
import { Icon, Button, Input } from 'semantic-ui-react';
import createNotification from '../../../utils/Notifications.jsx';
import Card from './Card/Card.jsx';
import listStyles from './List.scss';
import styles from '../ListBoard.scss';
import iconStyles from '../../Icons.scss';

const List = ({ listName, index, id, boardId, deleteList }) => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  useEffect(() => {
    getCardsOfList(id, setCards);
  }, []);

  const addCardCallback = (newCard) => {
    setCards([...cards, newCard]);
  };
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardName) {
      createNotification('error')('Card name can not be empty');
      return;
    }
    addCardToList(id, { name: newCardName }, addCardCallback);
    setNewCardName('');
  };

  const deleteOnClick = () => {
    deleteListFromBoard(boardId, id, deleteList);
  };
  const deleteCardCallback = (cardId) => () => {
    setCards(cards.filter((card) => card.id !== cardId));
  };
  const deleteCard = (cardId) => {
    deleteCardById(id, cardId, deleteCardCallback(cardId));
  };
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className={styles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            {listName}
            <div className={iconStyles.iconBox}>
              <Icon
                onClick={deleteOnClick}
                name={'delete'}
                link
                className={iconStyles.deleteIcon}
              />
            </div>
          </div>
          <form onSubmit={handleAddCard}>
            <Input
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              className={listStyles.cardNameInput}
              placeholder={'Enter card name'}
            />
            <div className={listStyles.addButton}>
              <Button basic color={'green'} type={'submit'}>
                Add
              </Button>
            </div>
          </form>
          {cards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              deleteOnClick={() => deleteCard(card.id)}
            />
          ))}
        </div>
      )}
    </Draggable>
  );
};

export default List;
