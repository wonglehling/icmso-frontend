import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./index.css";

function Code() {
  const [accessibility, setAccessibility] = useState("");
  const [accessGroup, setAccessGroup] = useState("");

  const handleAccessibilityChange = (event) => {
    setAccessibility(event.target.value);
  };

  const handleAccessGroupChange = (event) => {
    setAccessGroup(event.target.value);
  };

  return (
    <>
      <div className="flex-container">
        <div style={{ flexGrow: 2 }}>
          <div className="flex-container">
            <TextField
              required
              id="code-title"
              label="Title"
              variant="outlined"
              className="my-4"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              required
              id="code-authors"
              label="Author(s)"
              variant="outlined"
              className="mx-2 my-4"
              sx={{ flexGrow: 1 }}
            />
          </div>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="code-description"
            label="Description"
            variant="outlined"
          />
          <div className="flex-container my-4">
            <div style={{ flexGrow: 1, marginRight: "0.5rem" }}>
              <FormControl fullWidth>
                <InputLabel id="code-accessibility-label">
                  Accessibility
                </InputLabel>
                <Select
                  labelId="code-accessibility-label"
                  id="code-accessibility"
                  value={accessibility}
                  label="Accessibility"
                  onChange={handleAccessibilityChange}
                >
                  <MenuItem value={"Public"}>Public</MenuItem>
                  <MenuItem value={"Private"}>Private</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ flexGrow: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="code-access-group-label">
                  Access Group
                </InputLabel>
                <Select
                  labelId="code-access-group-label"
                  id="code-access-group"
                  value={accessGroup}
                  label="Access Group"
                  onChange={handleAccessGroupChange}
                >
                  <MenuItem value={"Group 2"}>Group 2</MenuItem>
                  <MenuItem value={"Group 3"}>Group 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-4">
          <label for="images" class="drop-container" id="dropcontainer">
            <span className="drop-title ">Drop files here</span>
            or
            <input type="file" id="images" accept="image/*" required />
          </label>
        </div>
      </div>
      <Button variant="contained" type="submit" className="mx-auto my-4">
        Upload
      </Button>
    </>
  );
}

export default Code;
