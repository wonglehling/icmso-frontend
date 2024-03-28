import React from "react";

import SideBar from "../components/Sidebar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col } from "react-bootstrap";

export default function Favourite() {
  return (
    <div>
      <SideBar />
      <Row lg={4} md={3} xs={2}>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
        <Col>
          <DocumentCard />
        </Col>
      </Row>
    </div>
  );
}
