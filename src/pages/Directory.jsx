import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate, useParams, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import DirectoryViewTable from "../components/DirectoryViewTable";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { iconFormatter } from '../utils/iconFormatter';

import "../styles/directory.css";
import useApiCall from "../hooks/useApiCall";
import UploadResource from "./UploadResources";
import XIcon from "../assets/icons/x.svg";
import CommentList from "../components/CommentList";

const content1 = [
  { name: "Folder1", date: "1 day ago", type: "folder" },
  { name: "Folder2", date: "2 weeks ago", type: "folder" },
  { name: "File1", date: "1 month ago", type: "file" },
  { name: "File2", date: "2 months ago", type: "file" },
];
const content2 = [
  { name: "File3", date: "", type: "file" },
  { name: "PDF1", date: "", type: "file" },
  { name: "PDF2", date: "", type: "file" },
];

const EMPTY_BODY_DATA = {
  resource_title: "Untitled1",
  resource_project_id: "",
  resource_project_path: "/",
  resource_type: "folder",
}

const EMPTY_COMMENT_BODY_DATA = {
  comment_message: "",
  comment_project_id: "",
}

function DirectoryView() {
  const { project_id, project_path } = useParams()
  const navigate = useNavigate()

  const [currentPath, setCurrentPath] = useState('/');
  const [createNewFolder, setCreateNewFolder] = useState(false);
  const [uploadNewFile, setUploadNewFile] = useState(false);
  const [newContentName, setNewContentName] = useState('Untitled1');
  const [breadcrumbItem, setBreadcrumbItem] = useState([]);
  const [contents, setContents] = useState([]);
  const [bodyData, setBodyData] = useState(EMPTY_BODY_DATA);
  const [commentBodyData, setCommentBodyData] = useState({ ...EMPTY_COMMENT_BODY_DATA, comment_project_id: project_id });
  const [resourcesGetApiQuery, setResourcesGetApiQuery] = useState({ resource_project_id: project_id, resource_project_path: currentPath });

  const projectGetApi = useApiCall('get', '/project/' + project_id)
  const commentPostApi = useApiCall('post', '/comment', {}, commentBodyData)
  const resourcesGetApi = useApiCall('get', '/resource', resourcesGetApiQuery)
  const resourcesPostApi = useApiCall('post', '/resource', {}, bodyData)

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function handleClick(index) {
    const allCurrent = currentPath.split('/').filter(path => path !== "").slice(0, index + 1)
    let path = '/' + allCurrent.join("/") + '/'
    if (path === "//") {
      path = "/"
    }
    setCurrentPath(path)
    setResourcesGetApiQuery({ ...resourcesGetApiQuery, resource_project_path: path })
  }

  function handleCloseFolder() {
    setNewContentName('Untitled1')
    setCreateNewFolder(false)
  }

  const handleClickPostComment = (e) => {
    commentPostApi.executeApi()
    window.location.reload()
  }

  const handleClickCreateFolder = () => {
    setBodyData({ ...EMPTY_BODY_DATA, resource_project_path: currentPath, resource_project_id: project_id })
    setCreateNewFolder(true)
  }

  const handleClickUploadFile = () => {
    setBodyData({ ...EMPTY_BODY_DATA, resource_project_path: currentPath, resource_project_id: project_id })
    setUploadNewFile(true)
  }

  const handleCreateFolder = () => {
    setCreateNewFolder(false)
    if (newContentName === "") {
      setNewContentName('Untitled1')
      return
    }
    resourcesPostApi.executeApi()

    setBodyData({ ...EMPTY_BODY_DATA })
    setTimeout(function () {
      resourcesGetApi.executeApi()
    }, 200);
  }

  const handleChangeNewContentName = (e) => {
    setBodyData({ ...bodyData, resource_title: e.target.value })
    setNewContentName(e.target.value)
  }

  const handleChangeCommentBodyData = (e) => {
    setCommentBodyData({ ...commentBodyData, comment_message: e.target.value })
  }

  useEffect(() => {
    projectGetApi.executeApi()
    resourcesGetApi.executeApi()
  }, []);

  useEffect(() => {
    if (projectGetApi.data) {
      if (!project_path) {
        navigate('./' + projectGetApi.data.project_name)
      }
      setBodyData({ ...bodyData, resource_project_id: projectGetApi.data._id, resource_path: currentPath })
      setBreadcrumbItem([projectGetApi.data.project_name])
    }

    if (resourcesGetApi.data) {
      setContents(resourcesGetApi.data)
    }
  }, [projectGetApi.data, resourcesGetApi.data, resourcesPostApi.loading, commentPostApi.loading]);

  function handleClickContent(resource) {
    if (resource.resource_type === "folder") {
      const latestPath = currentPath + resource.resource_title + "/"
      setCurrentPath(latestPath)
      setResourcesGetApiQuery({ ...resourcesGetApiQuery, resource_project_path: latestPath })
    } else {
      navigate("/resource-detail/" + resource._id);
    }
  }

  useEffect(() => {
    resourcesGetApi.executeApi()
  }, [resourcesGetApiQuery]);

  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <Container>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/project">
                Projects
              </Link>
              {projectGetApi.data &&
                <Link
                  underline="hover"
                  color={currentPath.length === 1 ? "text.primary" : "inherit"}
                  onClick={() => handleClick(-1)}
                  aria-current="page"
                  style={{ cursor: "pointer" }}

                >
                  {projectGetApi.data.project_name}
                </Link>}
              {currentPath.length > 1 && currentPath.split('/').filter(path => path !== "").map((item, index) => {
                return (
                  <Link
                    underline="hover"
                    color={index === currentPath.split('/').filter(path => path !== "").length - 1 ? "text.primary" : "inherit"}
                    onClick={() => handleClick(index)}
                    aria-current="page"
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </Link>)
              })}
            </Breadcrumbs>
          </div>
          <div class="d-flex flex-row-reverse" style={{ gap: '1rem' }}>
            <Button
              variant="contained"
              className="me-2 my-4"
              sx={{ width: "10rem", height: "2.5rem" }}
              onClick={handleClickUploadFile}
            >
              Upload File
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="ms-2 my-4"
              sx={{ width: "10rem", height: "2.5rem" }}
              onClick={handleClickCreateFolder}
            >
              Create Folder
            </Button>

          </div>
          <Box sx={{ flexGrow: 1, width: "100%", marginTop: '0.6rem' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {createNewFolder &&
                  <ListItem
                    className="resource-item"
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          <TextField
                            required
                            id="folder_name"
                            label="Folder Name"
                            variant="outlined"
                            className="my-4"
                            onChange={handleChangeNewContentName}
                            name="folder_name"
                            onBlur={handleCreateFolder}
                            value={newContentName}
                            sx={{ width: '40%' }}
                          />
                          <img src={XIcon} style={{
                            margin: '0',
                            position: 'absolute',
                            top: '50%',
                            width: '2rem',
                            height: '2rem',
                            msTransform: 'translateY(-50%)',
                            transform: 'translateY(-50%)'
                          }} alt="close" onClick={handleCloseFolder} />
                        </>}
                    />
                  </ListItem>
                }
                {
                  // contents.resource.map((content) => (
                  //   <ListItem
                  //     onClick={() => handleClickContent(content)}
                  //     className="resource-item"
                  //   >
                  //     <ListItemIcon>
                  //       {content.resource_type === "folder" && <FolderIcon />}
                  //     </ListItemIcon>
                  //     <ListItemText
                  //       primary={content.resource_title}
                  //       secondary={content.createdAt}
                  //     />
                  //   </ListItem>

                  contents.resource && <DirectoryViewTable data={contents} handleOnClickContent={handleClickContent} />

                  // ))
                }
              </Grid>
            </Grid>
          </Box>
          <Paper>
            <div style={{ padding: '1rem', marginTop: '1rem' }}>

              {projectGetApi.data && <>
                <div>
                  <Row>
                    <Col md={2}><span>Project Name: </span></Col>
                    <Col md={10} style={{ fontWeight: 'bold' }}>{projectGetApi.data.project_name}</Col>
                  </Row>
                  <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <Col md={2}><span>Project Description: </span></Col>
                    <Col md={10} style={{ fontWeight: 'bold' }}>{projectGetApi.data.project_description}</Col>
                  </Row>
                </div>
                <Row style={{ marginBottom: '1rem' }}>
                  <Col md={2}><span>Comments: </span></Col>
                  <Col md={10} style={{ fontWeight: 'bold' }}>
                    <Input sx={{ width: '80%', marginRight: '1rem' }} placeholder="Leave a Comment" 
                  onChange={handleChangeCommentBodyData}
                  value={commentBodyData.comment_message}
                  inputProps={{ 'aria-label': 'description' }} /><Button
                    variant="outlined"
                    className="me-2 my-4"
                    sx={{ width: "10rem", height: "2.5rem" }}
                    onClick={handleClickPostComment}
                  >
                    Post Comment
                  </Button>
                  </Col>
                </Row>
                { projectGetApi.data.comments && projectGetApi.data.comments.map((comment) => {
                  return <CommentList doc_info={comment}/>
                })}
              </>}
              {/*  */}
              <Row>

              </Row>
            </div>

          </Paper>
        </Container>
      </div>
      {projectGetApi.data && <UploadResource setShowUploadResourceModal={setUploadNewFile} showUploadResourceModal={uploadNewFile} onHideUploadResourceModal={() => setUploadNewFile(false)} resource_project_path={currentPath} resource_project_id={projectGetApi.data._id} />}
    </div>
  );
}

export default DirectoryView;
