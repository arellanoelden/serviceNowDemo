import React, { useState, useEffect, useContext } from "react";
import IncidentTable from "./IncidentTable";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IncidentContext } from "../providers/IncidentProvider";

const Filtered = () => {
  const { incidentFilterType } = useParams();
  const { filteredIncidents, getFilteredIncidents } = useContext(
    IncidentContext
  );
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
      <Link to="/">Back</Link>
      <h2>
        {incidentFilterType} {filteredIncidents.length}
      </h2>
      <IncidentTable incidents={filteredIncidents} />
    </section>
  );
};

export default Filtered;
