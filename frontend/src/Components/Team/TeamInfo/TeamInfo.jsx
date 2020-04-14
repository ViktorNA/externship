import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  createBoard,
  getBoardsOfTeam,
} from '../../../utils/APIRequests/TeamRequest.jsx';
import BoardList from '../../BoardList/BoardList.jsx';
import { deleteBoard } from '../../../utils/APIRequests/BoardRequests.jsx';
import { useStore } from '../../../store/store.jsx';

const TeamInfo = () => {
  const { teamId } = useParams();
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStore();
  const { teamBoards, teams } = state;

  const getBoardsCallback = (data) => {
    setBoards(data);
  };
  useEffect(() => {
    getBoardsOfTeam(teamId, getBoardsCallback);
  }, [teamId]);
  const addBoard = (newBoard) => {
    setIsLoading(true);
    createBoard(newBoard, teamId, addBoardCallback);
  };
  const addBoardCallback = (data) => {
    const newBoards = [...boards, data];
    setBoards(newBoards);
    const newTeamBoards = teamBoards.map((team) =>
      team.id === Number(teamId) ? { ...team, boards: newBoards } : team
    );
    dispatch({ type: 'SAVE_TEAM_BOARDS', teamBoards: newTeamBoards });

    const newTeams = teams.map((team) =>
      team.id === Number(teamId)
        ? { ...team, boardCount: team.boardCount + 1 }
        : team
    );
    dispatch({ type: 'SAVE_TEAMS', teams: newTeams });
    setIsLoading(false);
  };
  const deleteBoardHandler = (boardId) => {
    deleteBoard(boardId, () => {});
    const newBoards = boards.filter((board) => board.id !== boardId);
    setBoards(newBoards);
    const newTeamBoards = teamBoards.map((team) =>
      team.id === Number(teamId) ? { ...team, boards: newBoards } : team
    );
    dispatch({ type: 'SAVE_TEAM_BOARDS', teamBoards: newTeamBoards });

    const newTeams = teams.map((team) =>
      team.id === Number(teamId)
        ? { ...team, boardCount: team.boardCount - 1 }
        : team
    );
    dispatch({ type: 'SAVE_TEAMS', teams: newTeams });
  };
  return (
    <div>
      <h3>Boards of team:</h3>
      <BoardList
        boards={boards}
        deleteBoardHandler={deleteBoardHandler}
        addNewBoard={addBoard}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TeamInfo;
