import React, { useEffect, useContext } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useParams } from "react-router-dom";
import "../styles/Incident.css";
import { Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Incident = () => {
  const { incidentNumber } = useParams();
  const { getIncident, currentIncident } = useContext(IncidentContext);
  const history = useHistory();

  useEffect(() => {
    if (
      currentIncident === null ||
      (currentIncident.number && currentIncident.number !== incidentNumber)
    ) {
      getIncident(incidentNumber);
    }
  }, [getIncident, incidentNumber, currentIncident]);

  if (!currentIncident) {
    return <div>loading...</div>;
  }

  return (
    <section className="incidentContainer">
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Back
      </Button>
      <h1>Incident</h1>
      <Paper elevation={3}>
        <List className="incidentList">
          <ListItem>
            <strong>Number</strong>
            {currentIncident.number ? currentIncident.number : "N/A"}
          </ListItem>
          <ListItem>
            <strong>Priority</strong>{" "}
            {currentIncident.priority ? currentIncident.priority : "N/A"}
          </ListItem>
          <ListItem>
            <strong>Description</strong>{" "}
            {currentIncident.description ? currentIncident.description : "N/A"}
          </ListItem>
          <ListItem>
            <strong>Category</strong>{" "}
            {currentIncident.category ? currentIncident.category : "N/A"}
          </ListItem>
          <ListItem>
            <strong>State</strong>{" "}
            {currentIncident.state ? currentIncident.state : "N/A"}
          </ListItem>
          <ListItem>
            <strong>Created</strong>{" "}
            {currentIncident.sys_created_on
              ? currentIncident.sys_created_on
              : "N/A"}
          </ListItem>
        </List>
      </Paper>
    </section>
  );
};

export default Incident;
