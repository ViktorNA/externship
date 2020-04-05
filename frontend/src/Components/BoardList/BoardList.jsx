import React, {useEffect, useState} from 'react';
import BoardCard from './BoardCard/BoardCard.jsx';
import {Card, Icon, Input} from 'semantic-ui-react';
import styles from './BoardList.scss';
import {renameBoardById} from '../../utils/APIRequests/BoardRequests.jsx';

const BoardList = ({boards, deleteBoardHandler, addNewBoard, isLoading}) => {
  const [newBoardName, setNewBoardName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      name: newBoardName,
    };
    addNewBoard(newBoard);
    setNewBoardName('');
  };
  const handleFromKeyPressed = (e) => {
    if(e.key === 'Enter') handleFormSubmit(e);
  };
  return (
    <div>
      <div className={styles.boardCardsContainer}>
        {boards.map( (board) => <BoardCard
          key={board.id}
          board={board}
          deleteBoardHandler={deleteBoardHandler}
        />)}
        <div>
          <Card >
            <Card.Content>
              <Card.Header >
                <Input
                  fluid
                  transparent
                  value={newBoardName}
                  onKeyUp={handleFromKeyPressed}
                  onChange={ e => setNewBoardName(e.target.value)}
                  loading={isLoading}
                  icon={<Icon name="add" link onClick={handleFormSubmit} />}
                  placeholder='Add new board'>
                </Input>
              </Card.Header>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default BoardList;
