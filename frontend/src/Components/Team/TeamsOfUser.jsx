import React, {useState, useEffect, useContext} from 'react';
import {createTeam, deleteTeam, getTeamsOfUser} from '../../utils/APIRequests/TeamRequest.jsx';
import TeamCard from './TeamCard/TeamCard.jsx';
import {useStore} from '../../store/store.jsx';
import styles from './TeamsOfUser.scss';
import createNotification from '../../utils/Notifications.jsx';

const TeamsOfUser = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [state, dispatch] = useStore();
  const createErrorNotification = createNotification('error');

  const createTeamCallback = (newTeam) => {
    setTeams([...teams, newTeam]);
    setTeamName('');
  };
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if(!teamName) {
      createErrorNotification("Name can't be empty");
      return;
    }
    createTeam({name: teamName}, createTeamCallback);
  };
  const handleDeleteTeam = (teamId) => {
    deleteTeam(teamId, () => {});
    setTeams(teams.filter( (team) => team.id !== teamId));
  };
  useEffect( () => {
    getTeamsOfUser(setTeams);
  }, []);
  useEffect( () => {
    dispatch({type: 'SAVE_TEAMS', teams: teams, setTeams});
  }, [teams]);
  return (
    <div>
      <form onSubmit={handleCreateTeam}>
        <input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder={'Enter team name'}
        />
        <button type={'submit'}>Create team</button>
      </form>
      <h5>Your teams:</h5>
      <div className={styles.teamListContainer}>
        {teams.map( (team) => <TeamCard key={team.id} team={team} handleDeleteTeam={handleDeleteTeam}/>)}
      </div>
    </div>
  )
};

export default TeamsOfUser;