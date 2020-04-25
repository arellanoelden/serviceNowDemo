import React, { Component, createContext } from "react";

export const IncidentContext = createContext();

class IncidentProvider extends Component {
  state = {
    incidents: [],
    filteredIncidents: [],
    states: []
  };
  getAllIncidents = this.getAllIncidents.bind(this);
  getFilteredIncidents = this.getFilteredIncidents.bind(this);

  async getAllIncidents() {
    let stateMap = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
      Closed: 0
    };
    const response = await fetch(
      "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents"
    );
    const incidentsJson = await response.json();
    const incidents = incidentsJson.filter(incident => {
      return stateMap[incident.state] || stateMap[incident.state] === 0;
    });

    for (let incident of incidents) {
      if (stateMap[incident.state]) {
        stateMap[incident.state]++;
      } else {
        stateMap[incident.state] = 1;
      }
    }
    this.setState({
      incidents,
      states: Object.entries(stateMap)
    });
  }

  async getFilteredIncidents(filterState) {
    let filteredIncidents;
    const { incidents } = this.state;
    if (incidents.length === 0) {
      const response = await fetch(
        `https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidentsByState?state=${filterState}`
      );
      filteredIncidents = await response.json();
    } else {
      filteredIncidents = incidents.filter(
        incident => incident.state === filterState
      );
    }
    this.setState({
      filteredIncidents
    });
  }

  render() {
    const { incidents, filteredIncidents, states } = this.state;
    const { children } = this.props;
    const value = {
      incidents,
      filteredIncidents,
      states,
      getAllIncidents: this.getAllIncidents,
      getFilteredIncidents: this.getFilteredIncidents
    };
    return (
      <IncidentContext.Provider value={value}>
        {children}
      </IncidentContext.Provider>
    );
  }
}

export default IncidentProvider;
