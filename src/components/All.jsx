import React, { useEffect, useContext } from "react";
import "../styles/All.css";
import IncidentCard from "./IncidentCard";
import IncidentTable from "./IncidentTable";
import { IncidentContext } from "../providers/IncidentProvider";

const All = () => {
  const { incidents, getAllIncidents, states } = useContext(IncidentContext);

  useEffect(() => {
    if (incidents.length === 0) {
      getAllIncidents();
    }
  }, [incidents, getAllIncidents, states]);

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
