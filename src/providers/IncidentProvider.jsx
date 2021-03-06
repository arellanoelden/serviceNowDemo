import React, { Component, createContext } from "react";
import { withRouter } from "react-router-dom";

export const IncidentContext = createContext();

class IncidentProvider extends Component {
  state = {
    incidents: null,
    filteredIncidents: null,
    states: null,
    currentIncident: null
  };

  getAllIncidents = this.getAllIncidents.bind(this);
  getFilteredIncidents = this.getFilteredIncidents.bind(this);
  getIncident = this.getIncident.bind(this);
  addIncident = this.addIncident.bind(this);

  // this function will call the endpoint to retreive all incidents and set them
  // in our state. Will additionally set our stateMap so we know how many of each
  // state(Open, In progress, Resolved, Closed) we posess.
  async getAllIncidents() {
    try {
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

      // filter out any invalid states
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
    } catch (e) {
      this.props.history.push("/error");
    }
  }

  // this function will either call the endpoint for the filtered incident state type or if we already have loaded all
  // incidents then it will filter that list instead of making another endpoint call
  async getFilteredIncidents(incidentFilterType) {
    try {
      let filteredIncidents;
      const { incidents } = this.state;
      if (!incidents) {
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
    } catch (e) {
      this.props.history.push("/error");
    }
  }

  // this function will either call the endpoint for an indivual incident or if we have already have loaded all
  // incidents then it will find that incident from our incidents list
  async getIncident(incidentNumber) {
    try {
      const { incidents } = this.state;
      let currentIncident = null;
      if (incidents) {
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
    } catch (e) {
      this.props.history.push("/error");
    }
  }

  // this function will call the endpoint to add a new incident and append that result to our current incidents list
  async addIncident(data) {
    try {
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

      if (newIncident) {
        this.setState({
          incidents: [...this.state.incidents, newIncident.data]
        });
      }
    } catch (e) {
      this.props.history.push("/error");
    }
  }

  render() {
    const {
      incidents,
      filteredIncidents,
      states,
      currentIncident
    } = this.state;
    const { children } = this.props;

    // values that will be passed on through context
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

export default withRouter(IncidentProvider);
