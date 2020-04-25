import React, { useEffect, useState } from "react";
import "../styles/All.css";
import IncidentCard from "./IncidentCard";
import IncidentTable from "./IncidentTable";

const All = () => {
  let statesMap = {
    Open: 0,
    "In Progress": 0,
    Resolved: 0,
    Closed: 0
  };

  const [incidents, setIncidents] = useState(null);

  // counters for each of the state an incident can have
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function getIncidents() {
      const response = await fetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents"
      );
      const incidentsJson = await response.json();

      const incidents = incidentsJson.filter(incident => {
        return statesMap[incident.state] || statesMap[incident.state] === 0;
      });

      setIncidents(incidents);
      for (let incident of incidents) {
        if (statesMap[incident.state]) {
          statesMap[incident.state]++;
        } else {
          statesMap[incident.state] = 1;
        }
      }

      setStates(Object.entries(statesMap));
    }
    if (!incidents) {
      getIncidents();
    }
  }, [incidents, statesMap, states]);

  return (
    <div>
      <section>
        <h2>At a Glance</h2>
        <div className="incidentCardsContainer">
          {states &&
            states.map(state => {
              return (
                <IncidentCard
                  key={state[0]}
                  label={state[0]}
                  count={state[1]}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h2>All Incidents</h2>
        {incidents && <IncidentTable incidents={incidents} />}
      </section>
    </div>
  );
};

export default All;
