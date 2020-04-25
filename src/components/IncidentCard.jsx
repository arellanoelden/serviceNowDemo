import React from "react";
import "../styles/IncidentCard.css";
import { Link } from "react-router-dom";

const IncidentCard = ({ label, count }) => {
  return (
    <Link to={`/state/${label}`}>
      <div className="incidentCard">
        <label htmlFor={label}>{label}</label>
        <p name={label}>{count}</p>
      </div>
    </Link>
  );
};

export default IncidentCard;
