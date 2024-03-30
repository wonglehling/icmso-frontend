import React from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col } from "react-bootstrap";

import "../styles/resource.css"

export default function Resources() {
  const navigate = useNavigate();
  
  const handleClickDocDetail = () => {
    navigate("/resource-detail");
  };
  return (
    <div>
      <SideBar />
      <div className="resource-title">Recommendation</div>
      <Row lg={4} md={3} xs={2}>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
      </Row>
      <div className="resource-title">Recent Resources</div>
      <Row lg={4} md={3} xs={2}>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
        <Col>
          <DocumentCard handleClickDoc={handleClickDocDetail} />
        </Col>
      </Row>
    </div>
  );
}
