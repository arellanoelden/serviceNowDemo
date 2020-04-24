import React from "react";
import "../styles/IncidentCard.css";

const IncidentCard = ({ label, count }) => {
  return (
    <div className="incidentCard">
      <label htmlFor={label}>{label}</label>
      <p name={label}>{count}</p>
    </div>
  );
};

export default IncidentCard;
