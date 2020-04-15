import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AddListFrom from './AddList/AddListForm.jsx';
import List from './List/List.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  changeListsPositions,
  getBoardById,
} from '../../utils/APIRequests.jsx';
import { Card } from 'semantic-ui-react';
import styles from './ListBoard.scss';
import { useStore } from '../../store/store.jsx';
import { changeCardsPositions } from '../../utils/APIRequests/CardRequests.jsx';

const ListBoard = () => {
  const { boardId } = useParams();
  const history = useHistory();
  const [state, dispatch] = useStore();
  const { lists } = state;
  const setLists = (lists) => {
    dispatch({ type: 'SAVE_LISTS', lists });
  };
  const addList = (list) => {
    setLists([...lists, list]);
  };
  const deleteList = (id) => {
    const position = lists.findIndex((list) => list.id === id);
    const newLists = lists.filter((list) => list.id !== id);
    setLists(
      newLists.map((list) =>
        list.position > position
          ? { ...list, position: list.position - 1 }
          : list
      )
    );
  };
  const handleCardDnD = (result) => {
    const { destination, source } = result;
    const sourceListId = Number(source.droppableId);
    const destinationListId = Number(destination.droppableId);
    const draggableCardId = Number(result.draggableId);
    const destinationCardPosition = destination.index;

    const sourceList = lists.find((list) => list.id === sourceListId);
    const sourceListCards = sourceList.cards;
    const draggableCard = sourceListCards.find(
      (card) => card.id === draggableCardId
    );

    if (source.droppableId === destination.droppableId) {
      sourceListCards.splice(draggableCard.position, 1);
      sourceListCards.splice(destinationCardPosition, 0, draggableCard);
      const newListCards = sourceListCards.map((card, index) => ({
        ...card,
        position: index,
      }));
      const newLists = lists.map((list) =>
        list.id === destinationListId ? { ...list, cards: newListCards } : list
      );
      console.log('asd');
      changeCardsPositions(
        draggableCard.position,
        destinationCardPosition,
        sourceListId,
        () => {}
      );
      setLists(newLists);
      return;
    }

    const newSourceListCards = sourceListCards
      .filter((card) => card.id !== draggableCardId)
      .map((card) =>
        card.position > draggableCard.position
          ? { ...card, position: card.position - 1 }
          : card
      );
    const newSourceList = { ...sourceList, cards: newSourceListCards };

    const destinationList = lists.find((list) => list.id === destinationListId);
    const destinationListCards = destinationList.cards;
    const newDestinationListCards = destinationListCards
      .filter((card) => card.id !== draggableCardId)
      .map((card) =>
        card.position >= destinationCardPosition
          ? { ...card, position: card.position + 1 }
          : card
      );
    draggableCard.position = destinationCardPosition;
    const newDestinationList = {
      ...destinationList,
      cards: [...newDestinationListCards, draggableCard].sort(
        (a, b) => a.position - b.position
      ),
    };

    if (source.droppableId !== destination.droppableId) {
      const newLists = lists.map((list) => {
        if (list.id === destinationListId) return newDestinationList;
        if (list.id === sourceListId) return newSourceList;
        return list;
      });
      setLists(newLists);
    }
  };
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (result.type === 'card') {
      handleCardDnD(result);
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const draggableItem = lists[source.index];
    const newLists = Array.from(lists);
    newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, draggableItem);
    setLists(newLists.map((x, i) => ({ ...x, position: i })));
    changeListsPositions(source.index, destination.index, boardId, () => {});
  };

  const getBoardErrorCallback = (err) => {
    history.push('/pageNoFound');
  };

  useEffect(() => {
    getBoardById(boardId, setLists, getBoardErrorCallback);
  }, [boardId]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`board-${boardId}`}
        direction={'horizontal'}
        type={'board'}
      >
        {(provided) => (
          <div
            className={styles.Board}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((list) => (
              <List
                boardId={boardId}
                listName={list.name}
                key={list.id}
                index={list.position}
                id={list.id}
                cards={list.cards}
                deleteList={deleteList}
              />
            ))}
            <AddListFrom
              boardId={boardId}
              id={'add-list-form'}
              index={lists.length}
              addList={addList}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListBoard;
