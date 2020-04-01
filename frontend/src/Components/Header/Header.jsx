import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {useHistory, useLocation} from 'react-router-dom';
import styles from './Header.scss';


const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const handleLogout = (e) => {
    window.localStorage.clear();
    history.push('/');
  };
  const onClickBoards = () => {
    history.push('/boards');
  };
  const onClickHome = () => {
    history.push('/');
  };
  const onClickTeams = () => {
    history.push('/teams');
  };
  const isHomeActive = () => {
    //TODO: better way
    return !(location.pathname.startsWith('/boards') || location.pathname.startsWith('/teams'));
  };
  return (
    <div className={styles.Header}>
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          active={isHomeActive()}
          onClick={onClickHome}
        />
        <Menu.Item
          name='boards'
          active={location.pathname.startsWith('/boards')}
          onClick={onClickBoards}
        />
        <Menu.Item
          name='teams'
          active={location.pathname.startsWith('/teams')}
          onClick={onClickTeams}
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={handleLogout}
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
};

export default Header;
