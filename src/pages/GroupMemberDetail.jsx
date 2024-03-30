import React from "react";

import SideBar from "../components/Sidebar";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";

import testImg from "../assets/test.jpeg";
import "../styles/groupMemberDetail.css";

function GroupMemberDetail() {
  return (
    <>
      <SideBar />
      <div className="member-detail-title">Group Member Details</div>
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
          <div className="member-name">John</div>
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
      <div style={{ borderTop: "solid 0.5px #D3D3D3", marginTop: "55px" }}>
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
              <div className="bold-text">Join Date</div>
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
              <div className="bold-text">Gender</div>
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
              <div className="bold-text">Age</div>
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
              <div className="bold-text">Phone Number</div>
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
              <div className="bold-text">Address</div>
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
              <div className="bold-text">Same Group</div>
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
              <div className="bold-text">Research Interests</div>
              <div className="detail-font">Wong Leh Ling</div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GroupMemberDetail;
