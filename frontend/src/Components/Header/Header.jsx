import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import {Link, useHistory, useLocation} from 'react-router-dom';
import {getSavedUserFromLocalStorage, getToken} from '../../utils/LocalStorageUtils.jsx';
import styles from './Header.scss';


const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const RightMenu = () => {
    if(getToken()){
      const {name} = getSavedUserFromLocalStorage();
      return (
        <Menu.Item>
          <Dropdown
            text={name}
            pointing='top right'
            icon={null}
          >
            <Dropdown.Menu>
              <Link to={'/users/me'} className={styles.menuItem}>
                <Dropdown.Item
                  icon={'user'}
                  text='Profile'
                />
              </Link>
              <Dropdown.Item
                icon={'sign out'}
                text='Sign out'
                onClick={handleLogout}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    }
    return (
      <Link to={'/login'} className={styles.menuItem}>
        <Menu.Item
          name='login'
        />
      </Link>
    )
  };

  const menuItemsForAuthUser = () => {
    if(getToken())
      return (
        <>
          <Link to={'/boards'} className={styles.menuItem}>
            <Menu.Item
              name='boards'
              active={location.pathname.startsWith('/boards')}
            />
          </Link>

          <Link to={'/teams'} className={styles.menuItem}>
            <Menu.Item
              name='teams'
              active={location.pathname.startsWith('/teams')}
            />
          </Link>
        </>
      );
  };

  const handleLogout = (e) => {
    window.localStorage.clear();
    history.push('/');
  };

  const isHomeActive = () => {

    //TODO: better way
    return location.pathname === '/';
  };
  return (
    <div className={styles.Header}>
      <Menu pointing secondary>

        <Link to={'/'} className={styles.menuItem}>
          <Menu.Item
            name='home'
            active={isHomeActive()}
          />
        </Link>

        {menuItemsForAuthUser()}

        <Link to={'/about'} className={styles.menuItem}>
          <Menu.Item
            name='about'
            active={location.pathname.startsWith('/about')}
          />
        </Link>

        <Menu.Menu position='right'>
          {RightMenu()}
        </Menu.Menu>
      </Menu>
    </div>
  )
};

export default Header;
