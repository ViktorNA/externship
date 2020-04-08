import React, { createContext, useReducer, useContext } from 'react';

const initialState = { userId: 1 };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SAVE_TEAMS': {
        return { ...state, teams: action.teams, setTeams: action.setTeams };
      }
      case 'SAVE_BOARDS': {
        return { ...state, boards: action.boards, setBoards: action.setBoards };
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
