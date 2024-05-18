import React, { useState, useEffect } from "react";
import useApiCall from "../../hooks/useApiCall";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

import "./index.css";

function Article({ formBody, handleOnChangeFormBody, handleOnCreateFormBody }) {
  const [accessibility, setAccessibility] = useState("");
  const [accessGroup, setAccessGroup] = useState("");
  const groupApi = useApiCall("get", "/group");

  useEffect(() => {
    groupApi.fetchData();
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
              required
              id="article-authors"
              label="Author(s)"
              variant="outlined"
              className="mx-2 my-4"
              sx={{ flexGrow: 1 }}
            />
            <DatePicker
              id="article-publication-date"
              label="Publication Date"
              sx={{ flexGrow: 1 }}
              className="my-4"
            />
          </div>
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
          <TextField
            required
            fullWidth
            id="article-keyword"
            label="Keywords"
            onChange={handleOnChangeFormBody}
            name="resource_keyword"
            variant="outlined"
            className="mt-4"
          />
          <FormControl fullWidth className="my-4">
            <InputLabel id="article-accessibility-label">
              Accessibility
            </InputLabel>
            <Select
              labelId="article-accessibility-label"
              id="article-accessibility"
              value={accessibility}
              label="Accessibility"
              onChange={handleAccessibilityChange}
            >
              <MenuItem value={"Public"}>Public</MenuItem>
              <MenuItem value={"Private"}>Private</MenuItem>
            </Select>
          </FormControl>
          {groupApi.data && (
            <Autocomplete
              multiple
              fullWidth
              limitTags={3}
              id="multiple-group"
              options={groupApi.data}
              getOptionLabel={(option) => option.group_name}
              defaultValue={[]}
              renderInput={(params) => (
                <TextField {...params} label="Access Group" />
              )}
            />
          )}
        </div>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-4">
          <label for="images" class="drop-container" id="dropcontainer">
            <span className="drop-title ">Drop files here</span>
            or
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
        sx={{ width: "10rem", height: "2.5rem" }}
        onClick={handleOnCreateFormBody}
      >
        Upload
      </Button>
    </>
  );
}

export default Article;
