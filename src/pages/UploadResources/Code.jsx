import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./index.css";

function Code() {
  const [fileType, setFileType] = useState("");

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
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
            <TextField
              id="code-keywords"
              label="Keywords"
              variant="outlined"
              sx={{ flexGrow: 1 }}
              className="my-4"
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
            <FormControl sx={{ width: "33%" }}>
              <InputLabel id="code-file-type-label">File Type</InputLabel>
              <Select
                labelId="code-file-type-label"
                id="code-file-type"
                value={fileType}
                label="File Type"
                onChange={handleFileTypeChange}
              >
                <MenuItem value={"ZIP"}>ZIP</MenuItem>
                <MenuItem value={"RAR"}>RAR</MenuItem>
              </Select>
            </FormControl>
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
