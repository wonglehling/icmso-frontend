import React, { useState, useEffect } from "react";
import useApiCall from "../../hooks/useApiCall";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

import "./index.css";

function Other({ formBody, handleOnChangeFormBody, handleOnCreateFormBody }) {
  const [accessibility, setAccessibility] = useState("");
  const [accessGroup, setAccessGroup] = useState("");
  const groupApi = useApiCall("get", "/group");

  useEffect(() => {
    groupApi.executeApi();
  }, []);

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
              id="other-title"
              label="Title"
              variant="outlined"
              value={formBody.resource_title}
              onChange={handleOnChangeFormBody}
              name="resource_title"
              className="my-4"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="other-authors"
              label="Author(s)"
              variant="outlined"
              className="ms-2 my-4"
              value={formBody.resource_author}
              onChange={handleOnChangeFormBody}
              name="resource_author"
              sx={{ flexGrow: 1 }}
            />
          </div>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="other-description"
            label="Description"
            variant="outlined"
            value={formBody.resource_abstract}
              onChange={handleOnChangeFormBody}
              name="resource_abstract"
          />
        </div>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-4">
          <label for="images" class="drop-container" id="dropcontainer">
            <input type="file" id="images" accept="image/*" required />
          </label>
        </div>
      </div>
      <Button
        variant="contained"
        type="submit"
        className="mx-auto my-4"
        sx={{ width: "10rem", height: "2.5rem", display: "block"}}
        onClick={handleOnCreateFormBody}
      >
        Upload
      </Button>
    </>
  );
}

export default Other;
