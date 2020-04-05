import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Icon, Card, Input} from 'semantic-ui-react';
import classNames from 'classnames';
import appStyles from '../../App.scss';
import styles from './BoardCard.scss';

const BoardCard = ({board, deleteBoardHandler}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState(board.name);

  const deleteOnClick = (e) => {
    e.preventDefault();
    deleteBoardHandler(board.id);
  };
  const toggleEditing = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setBoardName(board.name);
  };


  if(!isEditing) return(
    <Link to={`/boards/${board.id}`} className={appStyles.menuItem}>
      <Card>
        <Card.Content>
          <Card.Header>
            {board.name}
            <div className={styles.iconBox}>
              <Icon
                className={classNames(styles.Icon, styles.deleteIcon)}
                onClick={deleteOnClick}
                name='delete'
              />
              <Icon
                className={classNames(styles.Icon, styles.editIcon)}
                name='pencil'
                onClick={toggleEditing}
              />
            </div>
          </Card.Header>
        </Card.Content>
      </Card>
    </Link>
    );
  else return (
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
                  placeholder='Add new board'/>
              </div>
              <div className={styles.iconBox}>
                <Icon className={styles.deleteIcon} name="close" onClick={toggleEditing} link/>
                <Icon className={styles.checkIcon} name="check" link/>
              </div>

            </div>
          </Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
};

export default BoardCard;