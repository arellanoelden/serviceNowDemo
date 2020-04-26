import React, { useContext, useState } from "react";
import { IncidentContext } from "../providers/IncidentProvider";
import {
  Paper,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "../styles/AddIncident.css";

const AddIncident = () => {
  const [priority, setPriority] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();
  const { addIncident } = useContext(IncidentContext);

  function submit(e) {
    e.preventDefault();
    const data = {
      priority,
      short_description,
      description,
      category,
      state: "New",
      number: Date.now(),
      sys_created_on: Date.now(),
      active: true
    };
    addIncident(data);
    history.push("/");
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
      <Paper elevation={3} className="addContainer">
        <Typography variant="h2" component="h1">
          Add Incident
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className="addForm"
          onSubmit={e => submit(e)}
        >
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <MenuItem value="1 - Critical">1 - Critical</MenuItem>
            <MenuItem value="2 - High">2 - High</MenuItem>
            <MenuItem value="3 - Moderate">3 - Moderate</MenuItem>
            <MenuItem value="4 - Low">4 - Low</MenuItem>
            <MenuItem value="5 - Planning">5 - Planning</MenuItem>
          </Select>
          <TextField
            label="Short Description"
            variant="standard"
            className="addField"
            value={short_description}
            onChange={e => setShortDescription(e.target.value)}
          />
          <TextareaAutosize
            aria-label="description"
            rowsMin={3}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <MenuItem value="Inquiry/Help">Inquiry/Help</MenuItem>
            <MenuItem value="Software">Software</MenuItem>
            <MenuItem value="Hardware">Hardware</MenuItem>
            <MenuItem value="Network">Network</MenuItem>
          </Select>
          <Button variant="contained" color="primary" type="submit">
            Create New Incident
          </Button>
        </form>
      </Paper>{" "}
    </section>
  );
};

export default AddIncident;
