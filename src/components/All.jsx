import React, { useEffect, useState } from "react";
import "../styles/All.css";
import IncidentCard from "./IncidentCard";
import IncidentTable from "./IncidentTable";

const All = () => {
  let statesMap = {};

  const [incidents, setIncidents] = useState(null);

  // counters for each of the state an incident can have
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function getIncidents() {
      const response = await fetch(
        "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents"
      );
      const incidents = await response.json();

      setIncidents(incidents);
      for (let incident of incidents) {
        if (statesMap[incident.state]) {
          statesMap[incident.state]++;
        } else {
          statesMap[incident.state] = 1;
        }
      }
      let statesToCheck = ["Open", "In Progress", "Resolved", "Closed"];
      statesToCheck = statesToCheck.map((stateToCheck) => [
        stateToCheck,
        statesMap[stateToCheck],
      ]);
      setStates(statesToCheck);
    }
    if (!incidents) {
      getIncidents();
    }
  }, [incidents, statesMap, states]);

  return (
    <div>
      <section className="incidentCardsContainer">
        {states &&
          states.map((state) => {
            return (
              <IncidentCard key={state[0]} label={state[0]} count={state[1]} />
            );
          })}
      </section>
      <section>{incidents && <IncidentTable incidents={incidents} />}</section>
    </div>
  );
};

export default All;
