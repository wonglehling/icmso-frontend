import React, { useState, useEffect } from "react";
import useApiCall from "../../hooks/useApiCall";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

import "./index.css";

function Article({ formBody, handleOnChangeFormBody, handleOnCreateFormBody }) {
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
              id="article-title"
              label="Title"
              variant="outlined"
              className="my-4"
              value={formBody.resource_title}
              onChange={handleOnChangeFormBody}
              name="resource_title"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="article-authors"
              label="Author(s)"
              variant="outlined"
              className="ms-2 my-4"
              value={formBody.resource_author}
              onChange={handleOnChangeFormBody}
              sx={{ flexGrow: 1 }}
            />
          </div>
          <DatePicker
            sx={{ width: "100%" }}
            id="article-publication-date"
            label="Publication Date"
            className="mb-4"
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="article-abstract"
            label="Abstract"
            value={formBody.resource_description}
            onChange={handleOnChangeFormBody}
            name="resource_description"
            variant="outlined"
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
            />
          </label>
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

export default Article;
