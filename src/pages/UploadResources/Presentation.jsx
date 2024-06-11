import React, { useState, useEffect } from "react";
import useApiCall from "../../hooks/useApiCall";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from 'dayjs';

import "./index.css";

function Presentation({ formBody, handleOnChangeFormBody, handleOnCreateFormBody }) {
  const [accessibility, setAccessibility] = useState("");
  const [accessGroup, setAccessGroup] = useState("");
  const groupApi = useApiCall("get", "/group");

  useEffect(() => {
    groupApi.executeApi();
  }, []);

  const onChangeDatetime = (value) => {
    const newDatetimeEvent = {
      target: {
        name: "resource_presentation_date",
        value: value.$d,
        id: "resource_presentation_date"
      }
    }
    handleOnChangeFormBody(newDatetimeEvent)
  }

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
              id="presentation-title"
              label="Title"
              variant="outlined"
              className="my-4"
              value={formBody.resource_title}
              onChange={handleOnChangeFormBody}
              name="resource_title"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="presentation-presenter"
              label="Presenter(s)"
              variant="outlined"
              className="ms-2 my-4"
              value={formBody.resource_presenter}
              onChange={handleOnChangeFormBody}
              name="resource_presenter"
              sx={{ flexGrow: 1 }}
            />
          </div>
          <DatePicker
            sx={{ width: "100%" }}
            id="presentation-date"
            label="Presentation Date"
            className="mb-4"
            name="resource_presentation_date"
            value={formBody.resource_presentation_date !== "" ? dayjs(formBody.resource_presentation_date) : undefined}
            onChange={(value) => { onChangeDatetime(value) }}
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="presentation-description"
            label="Description"
            variant="outlined"
            value={formBody.resource_abstract}
              onChange={handleOnChangeFormBody}
              name="resource_abstract"
          />
        </div>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-4">
          <label for="images" class="drop-container" id="dropcontainer">
<input
              type="file"
              id="files"
              name="resource_file"
              onChange={handleOnChangeFormBody}
              required
            />          </label>
        </div>
      </div>
      <Button
        variant="contained"
        type="submit"
        className="mx-auto my-4"
        sx={{ width: "10rem", height: "2.5rem", display: "block" }}
        onClick={handleOnCreateFormBody}
      >
        Upload
      </Button>
    </>
  );
}

export default Presentation;
