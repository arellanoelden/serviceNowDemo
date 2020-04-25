import React, { useState, useEffect } from "react";
import IncidentTable from "./IncidentTable";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Filtered = () => {
  const [filteredIncidents, setFilteredIncidents] = useState(null);
  const { incidentFilterType } = useParams();

  useEffect(() => {
    async function getFilteredIncidents() {
      const response = await fetch(
        `https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidentsByState?state=${incidentFilterType}`
      );
      const incidents = await response.json();
      setFilteredIncidents(incidents);
    }
    if (!filteredIncidents) {
      getFilteredIncidents();
    }
  }, [filteredIncidents, incidentFilterType]);
  if (!filteredIncidents) {
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
