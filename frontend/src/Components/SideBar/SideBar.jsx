import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store.jsx';
import BoardExpandingList from './BoardExpandingList.jsx';
import { getTeamBoardsOfUser } from '../../utils/APIRequests/TeamRequest.jsx';
import TeamInfo from '../Team/TeamInfo/TeamInfo.jsx';
import TeamsOfUser from '../Team/TeamsOfUser.jsx';
import { Link } from 'react-router-dom';
import styles from '../App.scss';

const SideBar = () => {
  const [state, dispatch] = useStore();
  const { boards, teamBoards, sideBarMode } = state;
  const [userBoards, setUserBoards] = useState([]);
  const [teamBoardsOfUser, setTeamBoardsOfUser] = useState([]);
  useEffect(() => {
    setUserBoards(boards || []);
  }, [boards]);
  const getTeamBoardsOfUserCallback = (data) => {
    dispatch({ type: 'SAVE_TEAM_BOARDS', teamBoards: data });
  };
  useEffect(() => {
    getTeamBoardsOfUser(getTeamBoardsOfUserCallback);
  }, []);
  useEffect(() => {
    setTeamBoardsOfUser(teamBoards || []);
  }, [teamBoards]);
  switch (sideBarMode) {
    case 'boards':
      return (
        <div>
          <Link to={'/boards'} className={styles.menuItem}>
            <BoardExpandingList title={`Your boards:`} boards={userBoards} />
          </Link>
          {teamBoardsOfUser.map(
            (team) =>
              team.boards.length !== 0 && (
                <BoardExpandingList
                  title={`Boards of team ${team.name}`}
                  boards={team.boards}
                  key={team.id}
                />
              )
          )}
        </div>
      );
    case 'teams':
      return <TeamsOfUser />;
  }
};
export default SideBar;
