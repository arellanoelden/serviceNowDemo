import React from "react";
import All from "./components/All";
import Filtered from "./components/Filtered";
import Incident from "./components/Incident";
import AddIncident from "./components/AddIncident";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="AppContainer">
      <Router>
        <Switch>
          <Route path="/state/:incidentFilterType">
            <Filtered />
          </Route>
          <Route path="/incident/:incidentNumber">
            <Incident />
          </Route>
          <Route path="/addIncident">
            <AddIncident />
          </Route>
          <Route path="/">
            <All />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
