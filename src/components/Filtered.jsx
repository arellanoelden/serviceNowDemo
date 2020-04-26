import React, { useEffect, useContext } from "react";
import IncidentTable from "./IncidentTable";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { IncidentContext } from "../providers/IncidentProvider";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import "../styles/Filtered.css";

const Filtered = () => {
  const { incidentFilterType } = useParams();
  const { filteredIncidents, getFilteredIncidents } = useContext(
    IncidentContext
  );
  const history = useHistory();

  useEffect(() => {
    if (incidentFilterType) {
      getFilteredIncidents(incidentFilterType);
    }
  }, [getFilteredIncidents, incidentFilterType]);

  if (!filteredIncidents || filteredIncidents.length === 0) {
    return <p>loading...</p>;
  }
  return (
    <section>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Back
      </Button>
      <h1>
        {incidentFilterType}
        <Chip className="incidentChip" label={filteredIncidents.length} />
      </h1>
      <IncidentTable incidents={filteredIncidents} />
    </section>
  );
};

export default Filtered;
