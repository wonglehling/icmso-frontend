import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";

import "./index.css"

function ModalEditGroup({ show, handleClose, handleSave }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-3">
          <label for="images" class="groups-container" id="imagecontainer">
            <span className="groups-title ">Drop files here</span>
            <span className="groups-title2 ">or</span>
            <input
              type="file"
              id="images"
              accept="image/*"
              className="groups-title1"
              required
            />
          </label>
        </div>
        <TextField
          required
          fullWidth
          id="group-name"
          label="Group Name"
          variant="outlined"
          className="my-3 me-3"
        />
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          id="group-description"
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

export default ModalEditGroup;
