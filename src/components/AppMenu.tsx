import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import { TokenContext } from '../contexts/token';
import { AuthService } from '../services/AuthService';
import { useUser } from '../helpers/user';

function AppMenu() {
  const history = useHistory();

  const { setToken } = useContext(TokenContext);
  const user = useUser();

  function handleLogout() {
    AuthService.logout();
    setToken(null);
    history.push('/login');
  }

  return (
    <Menu theme="dark" mode="horizontal" selectable={false}>
      {user && (
        <>
          <Menu.Item key="home">
            <Link to="/">Strona główna</Link>
          </Menu.Item>
          {user.isAdmin && (
            <Menu.Item key="import">
              <Link to="/import">Wyślij</Link>
            </Menu.Item>
          )}
          <Menu.Item key="schedules">
            <Link to="/schedules">Harmonogramy</Link>
          </Menu.Item>
          {user.isAdmin && (
            <>
              <Menu.Item key="emails">
                <Link to="/emails">Emaile prowadzących</Link>
              </Menu.Item>
              <Menu.Item key="users">
                <Link to="/users">Użytkownicy</Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="logout" style={{ float: 'right' }}>
            <a onClick={handleLogout}>Wyloguj się</a>
          </Menu.Item>
        </>
      )}

      {!user && (
        <Menu.Item key="login" style={{ float: 'right' }}>
          <Link to="/login">Zaloguj się</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default AppMenu;
