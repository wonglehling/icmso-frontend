import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";

import testImg from "../assets/test.jpeg";
import "../styles/groupMemberDetail.css";
import useApiCall from "../hooks/useApiCall";
import { formatDate } from "../utils/stringFormatter";

function GroupMemberDetail() {
  const { id } = useParams();
  const { data, loading, error, executeApi } = useApiCall("get", "/user/" + id);
  // const groupApiRes = useApiCall("get", "/group", {})
  useEffect(() => {
    executeApi();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <Container>
          {data && (
            <>
              <div className="member-detail-title">Group Member Details</div>
              <div className="flex-container">
                <div style={{  }}>
                  <div
                    style={{
                      height: "160px",
                      justifyContent: "left",
                      display: "flex",
                    }}
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
                      // image={testImg}
                      src="https://t4.ftcdn.net/jpg/06/35/83/71/360_F_635837151_QaS3vQk9cP4iWX1fTOXVac11kVWvfVDl.jpg"
                      />
                  </div>
                </div>
                <div
                  style={{ flexGrow: 2, fontSize: "12px", textAlign: "justify" }}
                  className="ms-5"
                >
                  <div className="member-name">
                    {data.user_first_name} {data.user_last_name}
                  </div>
                  {data.user_description}
                </div>
              </div>
              <div
                style={{ borderTop: "solid 0.5px #D3D3D3", marginTop: "55px" }}
              >
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
                      <div className="bold-text">Registered Date</div>
                      <div className="detail-font">
                        {formatDate(data.createdAt)}
                      </div>
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
                      <div className="detail-font">{data.user_gender}</div>
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
                      <div className="detail-font">{data.user_age}</div>
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
                      <div className="detail-font">{data.user_phone_number}</div>
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
                      <div className="detail-font">{data.user_address}</div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }}>
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default GroupMemberDetail;
