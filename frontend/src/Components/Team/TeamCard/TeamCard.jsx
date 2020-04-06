import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import styles from '../../App.scss';
import iconStyles from '../../Icons.scss';
import EditModal from '../EditModal/EditModal.jsx';

const TeamCard = ({team, handleDeleteTeam}) => {
  const {name, creator={}, memberCount, boardCount, description, id} = team;
  const handleMembersOnClick = (e) => {
    e.preventDefault();
  };
  const handleDeleteOnClick = (e) => {
    e.preventDefault();
    handleDeleteTeam(id);
  };
  return (
    <Link to={`teams/${id}`} className={styles.menuItem}>
      <Card>
        <Card.Content>
          <Card.Header>
              {name}
              <div className={iconStyles.iconBox}>
                <Icon
                  name={'delete'}
                  className={classNames(iconStyles.deleteIcon, iconStyles.Icon)}
                  onClick={handleDeleteOnClick}
                />
                <EditModal
                  trigger={<Icon name={'pencil'} className={classNames(iconStyles.editIcon, iconStyles.Icon)}/>}
                  name={name}
                  description={description}
                  id={id}
                />
              </div>
          </Card.Header>
          <Card.Meta>
            <span className='date'>Created by {creator.name}</span>
          </Card.Meta>
          <Card.Description>
            {description || `Description will be here`}
            <br/>
            {boardCount} board(s) here
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a onClick={handleMembersOnClick}>
            <Icon name='user'/>
            {memberCount} Member(s)
          </a>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default TeamCard;