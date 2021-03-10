import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingScreen from "./LandingScreen/LandingScreen";
import LoggedIn from "./LoggedIn/LoggedIn";
import TokenStorage from "./TokenStorage/TokenStorage";

function App() {
  return (
    <div className="App">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <title>GCalManager</title>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingScreen></LandingScreen>
          </Route>
          <Route exact path="/calendarScreen">
            <LoggedIn></LoggedIn>
          </Route>
          <Route exact path="/setToken">
            <TokenStorage></TokenStorage>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
