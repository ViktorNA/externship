import React, { useState, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
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
import { useStore } from '../../../store/store.jsx';

const List = ({ listName, index, id, boardId, deleteList }) => {
  const [newCardName, setNewCardName] = useState('');
  const [state, dispatch] = useStore();
  const cards = state.lists.find((list) => list.id === id).cards || [];
  const setCards = (newCards) => {
    const { lists } = state;
    const newLists = lists.map((list) =>
      list.id === id ? { ...list, cards: newCards } : list
    );
    dispatch({ type: 'SAVE_LISTS', lists: newLists });
  };

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
    <Draggable draggableId={`board-${id}`} index={index} type={'board'}>
      {(provided) => (
        <div
          className={styles.boardItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <span className={listStyles.listName}>{listName}</span>
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
          <Droppable droppableId={`${id}`} type={'card'}>
            {(provided) => (
              <div
                className={listStyles.cardsContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card) => (
                  <Card
                    key={`card-${card.id}`}
                    card={card}
                    deleteOnClick={() => deleteCard(card.id)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
