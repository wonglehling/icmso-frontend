import React, { useState, useEffect, useRef } from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResourceConfirmationModal from "../components/ResourceConfirmationModal";
import ModalResource from "../components/ModalResource";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
import { iconFormatter } from '../utils/iconFormatter';
import {formatDate} from '../utils/stringFormatter';

const CATEGORY_MAP = [
  {key: "cs.LG", value: "Machine Learning"},
  {key: "cs.CV", value: "Computer Vision and Pattern Recognition"},
  {key: "cs.AI", value: "Artificial Intelligence"},
  {key: "cs.CL", value: "Computation and Language"},
  {key: "cs.IT", value: "Information Theory"},
  {key: "cs.CR", value: "Cryptography and Security"},
  {key: "cs.RO", value: "Robotics"},
  {key: "cs.SY", value: "Systems and Control"},
  {key: "cs.DS", value: "Data Structures and Algorithms"},
  {key: "cs.NI", value: "Networking and Internet Architecture"},
]

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  const [openDocModal, setOpenDocModal] = useState(false);
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

  const handleOpenDocModal = () => setOpenDocModal(true);
  const handleCloseDocModal = () => setOpenDocModal(false);

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

  const handleOnClickDoc = () => {
    handleOpenDocModal();
  }


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
                <div style={{}}>
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
                        maxWidth: "120px",
                        maxHeight: "120px",
                        width: "auto",
                        height: "auto",
                        marginRight: "auto",
                        marginTop: "2.5rem",
                        textAlign: "left",
                        marginLeft: "1rem",
                      }}
                      component="img"
                      height="120"
                      image={iconFormatter(data.resource_file_info.resource_file_name)}
                      onClick={handleOnClickDoc}
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
                        {data.resource_props.resource_author ? data.resource_props.resource_author : 'N/A'}
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
                        {data.resource_props.resource_publication_date? formatDate(data.resource_props.resource_publication_date) : 'N/A'}
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
                        {data.resource_props.resource_publisher? data.resource_props.resource_publisher : 'N/A'}
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
                      <div className="detail-font">
                      {data.resource_props.keywords? data.resource_props.keywords.map((keyword)=> {
                        return keyword + ", "
                      }) : 'N/A'}
                      </div>
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
                      <div className="detail-font">
                      {CATEGORY_MAP.filter((category) => category.key === data.resource_props.category)[0].value}
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
        <Modal
          open={openDocModal}
          onClose={handleCloseDocModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <iframe src="" frameborder="0"></iframe> */}
            {data?.resource_file_info?.resource_file_url1 && <iframe style={{ width: '100%', height: '500px' }} src={`https://docs.google.com/viewer?srcid=${data.resource_file_info.resource_file_url_id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`} frameborder="0"></iframe>}
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ResourceDetail;
