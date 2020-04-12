import React, { createContext, useReducer, useContext } from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SAVE_TEAMS': {
        return { ...state, teams: action.teams };
      }
      case 'SAVE_BOARDS': {
        return { ...state, boards: action.boards };
      }
      case 'SAVE_TEAM_BOARDS': {
        return { ...state, teamBoards: action.teamBoards };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useStore = () => {
  const { state, dispatch } = useContext(store);
  return [state, dispatch];
};

export { store, StateProvider, useStore };
