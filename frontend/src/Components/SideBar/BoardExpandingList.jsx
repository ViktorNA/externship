import React, { useState } from 'react';
import BoardCard from '../BoardList/BoardCard/BoardCard.jsx';
import styles from './SideBar.scss';

const BoardExpandingList = ({ boards, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandOnClick = (e) => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <h3>{title}</h3>
      {boards.slice(0, isExpanded ? boards.length : 3).map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
      {boards.length > 3 && (
        <div className={styles.expandLink} onClick={expandOnClick}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </div>
      )}
      <br />
    </div>
  );
};
export default BoardExpandingList;
