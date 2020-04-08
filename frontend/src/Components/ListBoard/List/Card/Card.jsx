import React from 'react';
import { Icon } from 'semantic-ui-react';
import iconStyles from '../../../Icons.scss';
import styles from './Cadrd.scss';

const Card = ({ name, deleteOnClick }) => {
  return (
    <div className={styles.Card}>
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
  );
};

export default Card;
