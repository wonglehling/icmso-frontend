import React, { useState, useEffect } from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModalProfile from "../components/ModalProfile";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";

import testImg from "../assets/test.jpeg";
import EditIcon from "../assets/icons/pen.svg";
import "../styles/profileDetail.css";
import useApiCall from "../hooks/useApiCall";
import { formatDate } from "../utils/stringFormatter"

const PROFILE_DATA = {
  user_first_name: "",
  user_gender: "",
  user_description: "",
  user_phone_number: "",
  user_address: "",
}

function ProfileDetails() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formBody, setFormBody] = useState(PROFILE_DATA);
  const updateApi = useApiCall("put", "/user", {}, formBody)
  const { data, loading, error, fetchData } = useApiCall("get", "/user")

  const handleModalClose = () => setShowEditModal(false);
  const handleModalShow = () => {
    setShowEditModal(true);
  };
  const handleOnChangeFormBody = (e) => {
    const { name, value } = e.target
    if (name === "resource_file") {
      setFormBody({ ...formBody, [name]: e.target.files[0] })
    } else
      setFormBody({ ...formBody, [name]: value })
  }
  const handleUpdateProfile = () => {
    updateApi.fetchData()
    console.log("profile update successful");
    window.location.reload()
  };

  useEffect(() => {
    if (data) setFormBody(data[0])
  }, [data]);

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <SideBar />
      {
        data && <div style={{ paddingLeft: "210px" }}>
          <Navbar />
          <Row>
            <Col>
              <div className="profile-detail-title">My Profile</div>
            </Col>
            <Col className="edit-icon">
              <img src={EditIcon} onClick={handleModalShow} />
            </Col>
          </Row>
          <ModalProfile
            show={showEditModal}
            formBody={formBody}
            handleOnChangeFormBody={handleOnChangeFormBody}
            handleClose={handleModalClose}
            handleUpdate={handleUpdateProfile}
          />
          <div className="flex-container">
            <div style={{ flexGrow: 1 }}>
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
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </div>
            <div
              style={{ flexGrow: 2, fontSize: "12px", textAlign: "justify" }}
              className="ms-5"
            >
              <div className="profile-name">{data[0].user_first_name} {data[0].user_last_name}</div>
              {data[0].user_description} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
              scelerisque eleifend donec pretium. Lectus sit amet est placerat in
              egestas erat. Interdum velit laoreet id donec. Scelerisque fermentum
              dui faucibus in ornare quam viverra orci. Amet commodo nulla
              facilisi nullam vehicula ipsum a. Ultrices mi tempus imperdiet
              nulla. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Sit amet
              risus nullam eget felis eget nunc lobortis mattis. Sed vulputate mi
              sit amet mauris commodo. Sem integer vitae justo eget magna
              fermentum iaculis eu non.
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
                  <div className="bold-text">Join Date</div>
                  <div className="detail-font">{formatDate(data[0].createdAt)}</div>
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
                  <div className="detail-font">{data[0].user_gender}</div>
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
                  <div className="detail-font">23</div>
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
                  <div className="detail-font">{data[0].user_phone_number}</div>
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
                  <div className="detail-font">{data[0].user_address}</div>
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
                  <div className="bold-text">Your Group</div>
                  <div className="detail-font">Group 1, Group 2</div>
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
                  <div className="detail-font">NLP, IP, CS, IT</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      }

    </>
  );
}

export default ProfileDetails;
