import React, { useState, useEffect } from "react";
import useApiCall from "../../hooks/useApiCall";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from 'dayjs';

import "./index.css";

function Report({ formBody, handleOnChangeFormBody, handleOnCreateFormBody }) {
  const [accessibility, setAccessibility] = useState("");
  const [accessGroup, setAccessGroup] = useState("");
  const groupApi = useApiCall("get", "/group");
  const onChangeDatetime = (value) => {
    const newDatetimeEvent = {
      target: {
        name: "resource_publication_date",
        value: value.$d,
        id: "resource_publication_date"
      }
    }
    handleOnChangeFormBody(newDatetimeEvent)
  }
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
              id="report-title"
              label="Title"
              variant="outlined"
              className="my-4"
              value={formBody.resource_title}
              onChange={handleOnChangeFormBody}
              name="resource_title"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="report-authors"
              label="Author(s)"
              variant="outlined"
              value={formBody.resource_author}
              onChange={handleOnChangeFormBody}
              name="resource_author"
              className="ms-2 my-4"
              sx={{ flexGrow: 1 }}
            />
          </div>
          <DatePicker
            id="report-publication-date"
            label="Publication Date"
            className="me-2 mb-4"
            sx={{ width: "100%" }}
            name="resource_publication_date"
            value={formBody.resource_publication_date !== "" ? dayjs(formBody.resource_publication_date) : undefined}
            onChange={(value) => { onChangeDatetime(value) }}
          />
          <TextField
            fullWidth
            id="report-organization"
            label="Organization"
            variant="outlined"
            className="mb-4"
            value={formBody.resource_organization}
              onChange={handleOnChangeFormBody}
              name="resource_organization"
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="report-abstract"
            label="Abstract"
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

export default Report;
