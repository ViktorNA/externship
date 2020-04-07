import React, {useState} from 'react';
import {Icon, Card, Input} from 'semantic-ui-react';
import styles from './BoardCard.scss';
import iconStyles from '../../Icons.scss';
import createNotification from '../../../utils/Notifications.jsx';

const BoardCardEdit = ({board, toggleEditing, renameBoard}) => {
  const [boardName, setBoardName] = useState(board.name);
  const onKeyUpHandler = (e) => {
    if(e.key === 'Enter') {
      renameBoard(boardName);
      return
    }
    if(e.key === 'Escape') {
      toggleEditing(e);
    }
  };

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>
            <div className={styles.editFormContainer}>
              <div className={styles.inputWrapper}>
                <Input
                  fluid
                  transparent
                  value={boardName}
                  onChange={ e => setBoardName(e.target.value)}
                  placeholder='Enter new name'
                  onKeyUp={onKeyUpHandler}
                />
              </div>
              <div className={iconStyles.iconBox}>
                <Icon className={iconStyles.deleteIcon} name="close" onClick={toggleEditing} link/>
                <Icon className={iconStyles.checkIcon} name="check" onClick={() => renameBoard(boardName)} link/>
              </div>

            </div>
          </Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
};

export default BoardCardEdit;
