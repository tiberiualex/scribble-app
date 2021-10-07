import styled from "styled-components";
import Landing from "./Landing";
import store from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #e9f0ed, #ddebe3, #e9f0ed);
  height: 100vh;
  width: 100vw;
`;

const AppContainer = () => {
  const isLoggedIn = useAppSelector(
    (state) => state.user.status === "LoggedIn"
  );

  return (
    <Container>
      <Router>
        <Switch>
          {!isLoggedIn && (
            <Route path="/">
              <Landing />
            </Route>
          )}
        </Switch>
      </Router>
    </Container>
  );
};

export default AppContainer;