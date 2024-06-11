import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";

import "./index.css"

function ModalEditGroup({ show, handleClose, handleSave, formBody, handleOnChangeFormBody }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-3">
        </div>
        <TextField
          required
          fullWidth
          id="group-name"
          value={formBody ? formBody.group_name : ''}
          onChange={handleOnChangeFormBody}
          name="group_name"
          label="Group Name"
          variant="outlined"
          className="mb-4 me-3"
        />
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          id="group-description"
          value={formBody ? formBody.group_description : ''}
          onChange={handleOnChangeFormBody}
          name="group_description"
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
