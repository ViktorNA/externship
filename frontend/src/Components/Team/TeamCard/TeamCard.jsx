import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import styles from '../../App.scss';

const TeamCard = ({team}) => {
  const {name, creator={}, memberCount, boardCount, id} = team;
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to={`teams/${id}`} className={styles.menuItem}>
            {name}
          </Link>
        </Card.Header>
        <Card.Meta>
            <span className='date'>Created by {creator.name}</span>
        </Card.Meta>
        <Card.Description>
          Here will be description
          <br/>
          {boardCount} board(s) here
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user'/>
          {memberCount} Member(s)
        </a>
      </Card.Content>
    </Card>
  );
};

export default TeamCard;