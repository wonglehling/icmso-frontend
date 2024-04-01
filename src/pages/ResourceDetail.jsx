import React, { useState, useEffect } from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResourceConfirmationModal from "../components/ResourceConfirmationModal";
import ModalResource from "../components/ModalResource";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import testImg from "../assets/test.jpeg";
import EditIcon from "../assets/icons/pen.svg";
import DeleteIcon from "../assets/icons/trash3.svg";
import "../styles/resourceDetail.css";

const RESOURCE_BODY = {
  // resource_info: {
  //   resource_file_name: "",
  //   resource_file_type: "",
  // },
  resource_file: null,
  resource_title: "",
  resource_description: "",
  // resource_type: "",
  // resource_props: {},
  // resource_group_id: [],
  // resource_versions: {
  //   resource_version_title: "Upload Resource",
  //   resource_version_description: "User has uploaded new resource",
  //   resource_update_details: [],
  // },
};

function ResourceDetail() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, loading, error, fetchData } = useApiCall(
    "get",
    "/resource/" + id
  );
  const [formBody, setFormBody] = useState(RESOURCE_BODY);
  const updateApi = useApiCall("put", "/resource/"+id, {}, formBody)
  const deleteApi = useApiCall("delete", "/resource/" + id);

  const handleModalClose = () => setShowEditModal(false);
  const handleModalShow = () => {
    setShowEditModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteResource = () => {
    deleteApi.fetchData();
    if (!deleteApi.error) {
      toast.success("Resource Deleted Successful");
      navigate("/resources");
    }
  };
  const handleUpdateResource = () => {
    updateApi.fetchData()
    toast.success("Resource Updated Successful");
    navigate("/resources");
  };

  const handleOnChangeFormBody = (e) => {
    const { name, value } = e.target
    if (name === "resource_file") {
      setFormBody({ ...formBody, [name]: e.target.files[0] })
    } else
      setFormBody({ ...formBody, [name]: value })
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFormBody(data)
    console.log(data);
  }, [data]);

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        {data && (
          <div>
            <Row>
              <Col>
                <div className="resource-detail-title">
                  Document Title: {data.resource_title}
                </div>
              </Col>
              <Col className="pd-icon">
                <img
                  src={EditIcon}
                  className="me-3"
                  onClick={handleModalShow}
                />
                <img src={DeleteIcon} onClick={handleDeleteModalShow} />
              </Col>
            </Row>
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
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Faucibus scelerisque eleifend donec pretium. Lectus sit amet est
                placerat in egestas erat. Interdum velit laoreet id donec.
                Scelerisque fermentum dui faucibus in ornare quam viverra orci.
                Amet commodo nulla facilisi nullam vehicula ipsum a. Ultrices mi
                tempus imperdiet nulla. Lorem dolor sed viverra ipsum nunc
                aliquet bibendum. Sit amet risus nullam eget felis eget nunc
                lobortis mattis. Sed vulputate mi sit amet mauris commodo. Sem
                integer vitae justo eget magna fermentum iaculis eu non.
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
                    <div className="detail-font">
                      {data.resource_props.author}
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
                    <div className="bold-text">Publication Date</div>
                    <div className="detail-font">
                      {data.resource_props.publication_date}
                    </div>
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
                    <div className="detail-font">
                      {data.resource_uploader_id.user_first_name}{" "}
                      {data.resource_uploader_id.user_last_name}
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
            <div
              style={{ borderTop: "solid 1px #D3D3D3", marginTop: "10px" }}
            />
            <div className="description-style mt-5">Version History</div>{" "}
            <ResourceConfirmationModal
              show={showDeleteModal}
              handleClose={handleDeleteModalClose}
              handleDelete={handleDeleteResource}
            />
            <ModalResource
              show={showEditModal}
              formBody={formBody} 
              handleOnChangeFormBody={handleOnChangeFormBody} 
              handleClose={handleModalClose}
              handleSave={handleUpdateResource}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ResourceDetail;
