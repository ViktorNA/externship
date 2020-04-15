import React from 'react';
import { Icon } from 'semantic-ui-react';
import iconStyles from '../../../Icons.scss';
import styles from './Cadrd.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, deleteOnClick }) => {
  const { id, position, name } = card;
  return (
    <Draggable draggableId={`${id}`} index={position} type={'card'}>
      {(provided) => (
        <div
          className={styles.Card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {name}
          <div className={iconStyles.iconBox}>
            <Icon
              onClick={deleteOnClick}
              name={'delete'}
              link
              className={iconStyles.deleteIcon}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
