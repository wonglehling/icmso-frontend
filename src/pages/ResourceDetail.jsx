import React, { useEffect } from "react";

import SideBar from "../components/Sidebar";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { useParams } from "react-router-dom";

import testImg from "../assets/test.jpeg";
import "../styles/resourceDetail.css"

function ResourceDetail() {
  let { id } = useParams();

  const { data, loading, error, fetchData } = useApiCall("get", '/resource/' + id);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SideBar />
      {data && <div>
        <div className="resource-detail-title">Document Title: {data.resource_title}</div>
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
                <div className="detail-font">{data.resource_props.author}</div>
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
                <div className="detail-font">{data.resource_props.publication_date}</div>
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
                <div className="detail-font">{data.resource_uploader_id.user_first_name} {data.resource_uploader_id.user_last_name}</div>
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
                <div className="detail-font">{data.resource_type}</div>
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
                <div className="detail-font">AI, CE, IC, IP</div>
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
                <div className="detail-font">Computer Science</div>
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
                <div className="detail-font">v1.0</div>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }} />
        <div className="description-style mt-5">Version History</div>
      </div>}
    </>
  );
}

export default ResourceDetail;
