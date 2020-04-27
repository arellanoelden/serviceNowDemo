import React, { useEffect, useContext } from "react";
import "../styles/All.css";
import IncidentCard from "./IncidentCard";
import IncidentTable from "./IncidentTable";
import { IncidentContext } from "../providers/IncidentProvider";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const All = () => {
  const { incidents, getAllIncidents, states } = useContext(IncidentContext);
  const history = useHistory();

  useEffect(() => {
    if (!incidents) {
      getAllIncidents();
    }
  }, [incidents, getAllIncidents, states]);

  return (
    <div>
      <section>
        <div className="homepageHeaderContainer">
          <h1>At a Glance</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/addIncident")}
          >
            Add Incident
          </Button>
        </div>
        <div className="incidentCardsContainer">
          {states
            ? states.map(state => {
                return (
                  <IncidentCard
                    key={state[0]}
                    label={state[0]}
                    count={state[1]}
                  />
                );
              })
            : "loading..."}
        </div>
      </section>
      <section>
        <h2>All Incidents</h2>
        {incidents ? <IncidentTable incidents={incidents} /> : "loading..."}
      </section>
    </div>
  );
};

export default All;
