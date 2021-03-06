import styled from "styled-components";
import Landing from "./Landing";
import store from "../state/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useCallback, useEffect } from "react";
import { storeToken, getStoredToken } from "../utils/AuthStorage";
import { checkToken } from "../state/slices/userSlice";
import { getUserNotes } from "../state/slices/notesSlice";
import NotesContainer from "./NotesContainer";

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

export const AppContainer = () => {
  const { isLoggedIn, isRegistered, userId, token } = useAppSelector(
    (state) => ({
      isLoggedIn: state.user.status === "LoggedIn",
      isRegistered: state.user.status === "Registered",
      userId: state.user.id,
      token: state.user.token,
    })
  );

  const dispatch = useAppDispatch();

  const initialLoginCheck = useCallback(() => {
    const user = getStoredToken();
    if (user?.token) {
      dispatch(checkToken(user));
    }
  }, [dispatch]);

  const getNotes = useCallback(() => {
    console.log("getting notes");
    if (isLoggedIn && userId && token) {
      dispatch(getUserNotes({ userId: userId, token: token }));
    }
  }, [isLoggedIn, dispatch, userId, token]);

  useEffect(() => {
    initialLoginCheck();
  });

  useEffect(() => {
    getNotes();
  }, [isLoggedIn, getNotes]);

  return (
    <Container>
      <Router>
        <Switch>
          {!isLoggedIn && (
            <Switch>
              <Route exact path="/">
                <Landing>
                  <LoginForm />
                </Landing>
              </Route>
              <Route exact path="/register">
                {isRegistered ? (
                  <Redirect to="/registration-successful" />
                ) : (
                  <Landing>
                    <RegistrationForm />
                  </Landing>
                )}
              </Route>
              {isRegistered && (
                <Route exact path="/registration-successful">
                  <Landing>
                    <h1>Registration successful!</h1>
                  </Landing>
                </Route>
              )}
            </Switch>
          )}
          {/* Async load notes code. If not logged in, don't even load. Wait until login form is focused maybe? */}
          {isLoggedIn && (
            <Switch>
              <Route>
                <NotesContainer />
              </Route>
            </Switch>
          )}
        </Switch>
      </Router>
    </Container>
  );
};

export default AppContainer;
