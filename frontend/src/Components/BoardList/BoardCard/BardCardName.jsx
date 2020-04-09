import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card } from 'semantic-ui-react';
import classNames from 'classnames';
import appStyles from '../../App.scss';
import iconStyles from '../../Icons.scss';

const BoardCardName = ({ board, deleteBoardHandler, toggleEditing }) => {
  const deleteOnClick = (e) => {
    e.preventDefault();
    deleteBoardHandler(board.id);
  };
  return (
    <Link to={`/boards/${board.id}`} className={appStyles.menuItem}>
      <Card>
        <Card.Content>
          <Card.Header>
            {board.name}
            {deleteBoardHandler && (
              <div className={iconStyles.iconBox}>
                <Icon
                  className={classNames(iconStyles.Icon, iconStyles.deleteIcon)}
                  onClick={deleteOnClick}
                  name="delete"
                />
                <Icon
                  className={classNames(iconStyles.Icon, iconStyles.editIcon)}
                  name="pencil"
                  onClick={toggleEditing}
                />
              </div>
            )}
          </Card.Header>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default BoardCardName;
