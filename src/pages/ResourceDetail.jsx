import React, { useState, useEffect, useRef } from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResourceConfirmationModal from "../components/ResourceConfirmationModal";
import ModalResource from "../components/ModalResource";

import CardMedia from "@mui/material/CardMedia";
import { Row, Col, Container } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  let reqBody = {}
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [secondsOpen, setSecondsOpen] = useState(0);
  const [selectedDocId, setSelectedDocId] = useState(0);
  const [clickFavAction, setClickFavAction] = useState('');
  const [activityReqBody, setActivityReqBody] = useState({
    duration: 0,
    "activity_to_resource_id": "",
    "activity_to_resource_category": "",
    "activity_to_project_id": ""
  });
  const activityReqBodyRef = useRef(activityReqBody);

  const favApi = useApiCall("get", `/user/recommendation/${clickFavAction}/${selectedDocId}`);
  const activityApi = useApiCall("post", `/activity`, {}, activityReqBodyRef);


  const { data, loading, error, executeApi } = useApiCall(
    "get",
    "/resource/" + id
  );
  const [formBody, setFormBody] = useState(RESOURCE_BODY);
  const updateApi = useApiCall("put", "/resource/" + id, {}, formBody)
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
    deleteApi.executeApi();
    if (!deleteApi.error) {
      toast.success("Resource Deleted Successful");
      navigate("/resources");
    }
  };
  const handleUpdateResource = () => {
    updateApi.executeApi()
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
    if (selectedDocId !== 0 && clickFavAction !== '') favApi.executeApi()
  }, [clickFavAction, selectedDocId]);

  const handleClickFavIcon = () => {
    setSelectedDocId(data._id)
    setClickFavAction(data.is_favourite ? "remove" : "add")
    data.is_favourite = !data.is_favourite
  }

  useEffect(() => {
    executeApi();
    const start = Date.now();
    setStartTime(start);

    return () => {
      // Component unmounted
      const end = Date.now();
      const duration = (end - start) / 1000; // Convert milliseconds to seconds
      setSecondsOpen(duration);
      if (duration > 0.5) {
        activityReqBodyRef.current = { ...activityReqBodyRef.current, duration: duration }
        console.log(`Component was open for ${duration} seconds, ${activityReqBody}`);
        activityApi.executeApi()
      }
    };

  }, []);


  useEffect(() => {
    setFormBody(data)
    if (data) {
      setClickFavAction(data.is_favourite ? "remove" : "add")
      reqBody = {
        "activity_to_resource_id": data._id,
        "activity_to_resource_category": data.resource_props.category,
        "activity_to_project_id": data.resource_project_id
      }
      setActivityReqBody(
        {
          ...activityReqBody,
          "activity_to_resource_id": data._id,
          "activity_to_resource_category": data.resource_props.category,
          "activity_to_project_id": data.resource_project_id,
          is_fav: data.is_favourite
        }
      )
    }
  }, [data]);

  useEffect(() => {
    activityReqBodyRef.current = activityReqBody;
  }, [activityReqBody]);

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <Container>
          {data && (
            <div>
              <Row>
                <Col>
                  <div className="resource-detail-title">
                    Document Title: {data.resource_title}
                  </div>
                </Col>
                <Col className="pd-icon">
                  <IconButton onClick={() => handleClickFavIcon(data._id, data.is_favourite)} aria-label="add to favorites" sx={data.is_favourite ? { backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'red', } : {}}>
                    <FavoriteIcon sx={{ width: 16, height: 16 }} />
                  </IconButton>
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
                  {data.resource_description}
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
                      <div className="detail-font">{data.resource_props.category}</div>
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
        </Container>
      </div>
    </>
  );
}

export default ResourceDetail;
