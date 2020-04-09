import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import EditModal from '../EditModal/EditModal.jsx';
import styles from '../../App.scss';
import iconStyles from '../../Icons.scss';
import { getSavedUserFromLocalStorage } from '../../../utils/LocalStorageUtils.jsx';
import { deleteUserFromTeam } from '../../../utils/APIRequests/TeamRequest.jsx';
import { useStore } from '../../../store/store.jsx';

const TeamCard = ({ team, handleDeleteTeam }) => {
  const { name, creator = {}, memberCount, boardCount, description, id } = team;
  const userId = getSavedUserFromLocalStorage().id;
  const [state] = useStore();
  const { teams, setTeams } = state;

  const handleDeleteOnClick = (e) => {
    e.preventDefault();
    handleDeleteTeam(id);
  };
  const leaveTeamCallback = () => {
    setTeams(teams.filter((team) => team.id !== id));
  };
  const leaveTeam = (e) => {
    e.preventDefault();
    deleteUserFromTeam(id, userId, leaveTeamCallback(userId));
  };
  const getIcons = () => {
    if (creator.id === userId) {
      return (
        <>
          <Icon
            name={'delete'}
            className={classNames(iconStyles.deleteIcon, iconStyles.Icon)}
            onClick={handleDeleteOnClick}
          />
          <EditModal
            trigger={
              <Icon
                name={'pencil'}
                className={classNames(iconStyles.editIcon, iconStyles.Icon)}
              />
            }
            name={name}
            description={description}
            id={id}
          />
        </>
      );
    }
    return (
      <Icon
        name={'sign out'}
        className={classNames(iconStyles.deleteIcon, iconStyles.Icon)}
        onClick={leaveTeam}
      />
    );
  };

  return (
    <Link to={`/teams/${id}`} className={styles.menuItem}>
      <Card>
        <Card.Content>
          <Card.Header>
            {name}
            <div className={iconStyles.iconBox}>{getIcons()}</div>
          </Card.Header>
          <Card.Meta>
            <span className="date">Created by {creator.name}</span>
          </Card.Meta>
          <Card.Description>
            {description || `Description will be here`}
            <br />
            {boardCount} board(s) here
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span>
            <Icon name="user" />
            {memberCount} Member(s)
          </span>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default TeamCard;
