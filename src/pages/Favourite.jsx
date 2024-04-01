import React from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col } from "react-bootstrap";

export default function Favourite() {
  const navigate = useNavigate();

  const handleClickDocDetail = () => {
    navigate("/resource-detail");
  };
  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
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
        </Row>{" "}
      </div>
    </div>
  );
}
