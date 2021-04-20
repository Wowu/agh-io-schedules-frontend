import { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import Home from './pages/Home';
import ScheduleList from './pages/ScheduleList';
import ImportForm from './pages/ImportForm';
import LoginForm from './pages/LoginForm';
import Schedule from './pages/Schedule';
import NotificationSettings from './pages/NotificationSettings';
import { UserContext } from './contexts/user';
import PrivateRoute from './components/PrivateRoute';
import { AuthService } from './services/AuthService';
import AppMenu from './components/AppMenu';
import history from "./history";

const { Header, Content, Footer } = Layout;

const Container = styled(Content)`
  padding: 0 30px;
  width: 100%;
  margin: 20px auto 0 auto;
  max-width: 1400px;
`;

const AppContent = styled.div`
  min-height: 500px;
  padding: 24px;
  background: #fff;
`;

function App() {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router history={history}>
        <Layout>
          <Header>
            <AppMenu />
          </Header>

          <Container>
            <AppContent>
              <Switch>
                <PrivateRoute exact path="/">
                  <Home />
                </PrivateRoute>
                <PrivateRoute path="/schedules">
                  <ScheduleList />
                </PrivateRoute>
                <PrivateRoute path="/import">
                  <ImportForm />
                </PrivateRoute>
                <PrivateRoute path="/schedule">
                  <Schedule />
                </PrivateRoute>
                <PrivateRoute path="/notification-settings">
                  <NotificationSettings />
                </PrivateRoute>

                <Route path="/login">
                  <LoginForm />
                </Route>
              </Switch>
            </AppContent>
          </Container>

          <Footer style={{ textAlign: 'center' }}>
            Schedules &copy; {new Date().getFullYear()} Game of Threads, AGH
          </Footer>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
