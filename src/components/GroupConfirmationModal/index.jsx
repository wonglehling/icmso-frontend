import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GroupConfirmationModal({ show, handleClose, handleDelete }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this group from the system?
        This action cannot be undone and will permanently remove all associated
        data and permissions.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete} >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroupConfirmationModal;
