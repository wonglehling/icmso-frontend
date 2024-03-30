import React, { useState } from "react";

import SideBar from "../components/Sidebar";
import ResourceConfirmationModal from "../components/ResourceConfirmationModal";
import ModalResource from "../components/ModalResource";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";

import testImg from "../assets/test.jpeg";
import EditIcon from "../assets/icons/pen.svg";
import DeleteIcon from "../assets/icons/trash3.svg";
import "../styles/resourceDetail.css";

function ResourceDetail() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleModalClose = () => setShowEditModal(false);
  const handleModalShow = () => {
    setShowEditModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteResource = () => {
    console.log("Document delete successful");
  };
  const handleUpdateResource = () => {
    console.log("Document update successful");
  }

  return (
    <>
      <SideBar />
      <Row>
        <Col>
          <div className="resource-detail-title">Document Title</div>
        </Col>
        <Col className="pd-icon">
          <img src={EditIcon} className="me-3" onClick={handleModalShow} />
          <img src={DeleteIcon} onClick={handleDeleteModalShow} />
        </Col>
      </Row>
      <div className="flex-container">
        <div style={{ flexGrow: 1 }}>
          <div
            style={{ height: "160px", justifyContent: "left", display: "flex" }}
          >
            <CardMedia
              sx={{
                display: "block",
                maxWidth: "194px",
                maxHeight: "160px",
                width: "auto",
                height: "auto",
                marginRight: "auto",
                textAlign: "left",
                marginLeft: "1rem",
              }}
              component="img"
              height="194"
              image={testImg}
            />
          </div>
        </div>
        <div
          style={{ flexGrow: 2, fontSize: "12px", textAlign: "justify" }}
          className="ms-5"
        >
          <div className="description-style">Description</div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
          scelerisque eleifend donec pretium. Lectus sit amet est placerat in
          egestas erat. Interdum velit laoreet id donec. Scelerisque fermentum
          dui faucibus in ornare quam viverra orci. Amet commodo nulla facilisi
          nullam vehicula ipsum a. Ultrices mi tempus imperdiet nulla. Lorem
          dolor sed viverra ipsum nunc aliquet bibendum. Sit amet risus nullam
          eget felis eget nunc lobortis mattis. Sed vulputate mi sit amet mauris
          commodo. Sem integer vitae justo eget magna fermentum iaculis eu non.
        </div>
      </div>
      <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "55px" }}>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              <div className="bold-text">Author(s)</div>
              <div className="detail-font">Wong Leh Ling</div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              <div className="bold-text">Publication Date</div>
              <div className="detail-font">Male</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }}>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              <div className="bold-text">Publisher</div>
              <div className="detail-font">Wong Leh Ling</div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              <div className="bold-text">Publication Type</div>
              <div className="detail-font">Male</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }}>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                marginTop: "10px",
              }}
            >
              <div className="bold-text">Keywords</div>
              <div className="detail-font">Wong Leh Ling</div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              <div className="bold-text">Category</div>
              <div className="detail-font">Male</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }}>
        <Row>
          <Col>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              <div className="bold-text">Version</div>
              <div className="detail-font">Wong Leh Ling</div>
            </div>
          </Col>
        </Row>
        <ResourceConfirmationModal
          show={showDeleteModal}
          handleClose={handleDeleteModalClose}
          handleDelete={handleDeleteResource}
        />
        <ModalResource show={showEditModal} handleClose={handleModalClose} handleSave={handleUpdateResource} />
      </div>
      <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }} />
      <div className="description-style mt-5">Version History</div>
    </>
  );
}

export default ResourceDetail;
