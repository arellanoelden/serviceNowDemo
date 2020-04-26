import React, { Component, createContext } from "react";

export const IncidentContext = createContext();

class IncidentProvider extends Component {
  state = {
    incidents: [],
    filteredIncidents: [],
    states: [],
    currentIncident: null
  };
  getAllIncidents = this.getAllIncidents.bind(this);
  getFilteredIncidents = this.getFilteredIncidents.bind(this);
  getIncident = this.getIncident.bind(this);
  addIncident = this.addIncident.bind(this);

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

  async getFilteredIncidents(incidentFilterType) {
    let filteredIncidents;
    const { incidents } = this.state;
    if (incidents.length === 0) {
      const response = await fetch(
        `https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidentsByState?state=${incidentFilterType}`
      );
      filteredIncidents = await response.json();
    } else {
      filteredIncidents = incidents.filter(
        incident => incident.state === incidentFilterType
      );
    }
    this.setState({
      filteredIncidents
    });
  }

  async getIncident(incidentNumber) {
    const { incidents } = this.state;
    let currentIncident = null;
    if (incidents.length > 0) {
      currentIncident = incidents.find(
        incident => incident.number === incidentNumber
      );
      if (currentIncident) {
        this.setState({
          currentIncident
        });
        return;
      }
    }
    const response = await fetch(
      `https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidentByNumber?number=${incidentNumber}`
    );
    currentIncident = await response.json();
    this.setState({
      currentIncident
    });
  }

  async addIncident(data) {
    const response = await fetch(
      "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/insertIncident",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const newIncident = await response.json();

    this.setState({
      incidents: [...this.state.incidents, newIncident.data]
    });
  }
  render() {
    const {
      incidents,
      filteredIncidents,
      states,
      currentIncident
    } = this.state;
    const { children } = this.props;
    const value = {
      incidents,
      filteredIncidents,
      states,
      currentIncident,
      getAllIncidents: this.getAllIncidents,
      getFilteredIncidents: this.getFilteredIncidents,
      getIncident: this.getIncident,
      addIncident: this.addIncident
    };
    return (
      <IncidentContext.Provider value={value}>
        {children}
      </IncidentContext.Provider>
    );
  }
}

export default IncidentProvider;
