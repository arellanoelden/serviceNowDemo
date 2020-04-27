import React from "react";
import { Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../styles/Error.css";

const Error = () => {
  const history = useHistory();
  return (
    <section className="errorContainer">
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Back Home
      </Button>
      <Paper elevation={3} className="paperContainer">
        It seems there was an issue processing your request. If the problem
        persists please try again later
      </Paper>
    </section>
  );
};

export default Error;
