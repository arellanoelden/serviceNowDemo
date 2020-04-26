import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const IncidentTable = ({ incidents }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table className="incidentTable">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Short description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`incident/${incident.number}`}>
                    {incident.number}
                  </Link>
                </TableCell>
                <TableCell>{incident.priority}</TableCell>
                <TableCell>{incident.short_description}</TableCell>
                <TableCell>{incident.category}</TableCell>
                <TableCell>{incident.state}</TableCell>
                <TableCell>{incident.sys_created_on}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncidentTable;
