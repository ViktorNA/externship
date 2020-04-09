import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store.jsx';
import BoardCard from '../BoardList/BoardCard/BoardCard.jsx';
import styles from './SideBar.scss';

const SideBar = () => {
  const [state, dispatch] = useStore();
  const { boards } = state;
  const [userBoards, setUserBoards] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    setUserBoards(boards || []);
  }, [boards, isExpanded]);
  const expandOnClick = (e) => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <h3> Your boards:</h3>
      {userBoards.slice(0, isExpanded ? userBoards.length : 3).map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
      {userBoards.length > 3 && (
        <div className={styles.expandLink} onClick={expandOnClick}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </div>
      )}
    </div>
  );
};
export default SideBar;
