import React, {useState, useEffect} from 'react';
import {createTeam, getTeamsOfUser} from '../../utils/APIRequests/TeamRequest.jsx';

const TeamsOfUser = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);

  const createTeamCallback = (newTeam) => {
    setTeams([...teams, newTeam]);
    setTeamName('');
  };
  const handleCreateTeam = (e) => {
    e.preventDefault();
    createTeam({name: teamName}, createTeamCallback);
  };
  useEffect( () => {
    getTeamsOfUser(setTeams);
  }, []);
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
      <div>
        {teams.map( (team) => <div key={team.id}> {team.name}</div>)}
      </div>
    </div>
  )
};

export default TeamsOfUser;