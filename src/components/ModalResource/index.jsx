import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./index.css";


function ModalResource({ show, handleClose, handleSave, formBody, handleOnChangeFormBody }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-3">
          <label for="docs" class="doc-container" id="doccontainer">
            <span className="doc-title ">Drop files here</span>
            <span className="doc-title2 ">or</span>
            <input
              type="file"
              id="docs"
              accept="doc/*"
              className="doc-title1"
              required
            />
          </label>
        </div>
        <TextField
          required
          id="resource-title"
          label="Title"
          value={formBody ? formBody.resource_title : ''}
          onChange={handleOnChangeFormBody}
          name="resource_title"
          variant="outlined"
          className="my-3 me-3"
          sx={{ flexGrow: 1, width: "50%" }}
        />
        <DatePicker
          id="resource-publication-date"
          label="Publication Date"
          sx={{ flexGrow: 1, width: "46%" }}
          className="my-3"
        />
        <TextField
          required
          fullWidth
          id="resource-authors"
          label="Author(s)"
          variant="outlined"
          className="mb-3"
        />
        <TextField
          required
          fullWidth
          id="resource-address"
          label="Address"
          variant="outlined"
          className="mb-3"
        />
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          id="resource-description"
          label="Description"
          variant="outlined"
          className="mb-3"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResource;
