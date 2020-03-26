import React from 'react';
import {Link} from 'react-router-dom';

const BoardCard = ({name, id}) => {

  return(
    <div>
      <h5>{name}</h5>
      <Link to={`${id}`}>Go to board</Link>
    </div>
  )
};

export default BoardCard;