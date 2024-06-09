import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

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
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate, useParams, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/directory.css";
import useApiCall from "../hooks/useApiCall";
import { TextField } from "@mui/material";
import UploadResource from "./UploadResources";

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
  const [resourcesGetApiQuery, setResourcesGetApiQuery] = useState({ resource_project_id: project_id, resource_project_path: currentPath });

  const projectGetApi = useApiCall('get', '/project/' + project_id)
  const resourcesGetApi = useApiCall('get', '/resource', resourcesGetApiQuery)
  const resourcesPostApi = useApiCall('post', '/resource', {}, bodyData)

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function handleClick(index) {
    const allCurrent = currentPath.split('/').filter(path => path !== "").slice(0, index + 1)
    const path = '/' + allCurrent.join("/") + '/'
    setCurrentPath(path)
    setResourcesGetApiQuery({ ...resourcesGetApiQuery, resource_project_path: path })
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
    resourcesPostApi.executeApi()

    setCreateNewFolder(false)
    setBodyData({ ...EMPTY_BODY_DATA })
    setNewContentName('Untitled1')
    setTimeout(function () {
      resourcesGetApi.executeApi()
    }, 200);
  }

  const handleChangeNewContentName = (e) => {
    setBodyData({ ...bodyData, resource_title: e.target.value })
    setNewContentName(e.target.value)
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
  }, [projectGetApi.data, resourcesGetApi.data, resourcesPostApi.loading]);

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
                  >
                    {item}
                  </Link>)
              })}
            </Breadcrumbs>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="mx-auto my-4"
            sx={{ width: "10rem", height: "2.5rem" }}
            onClick={handleClickCreateFolder}
          >
            Create Folder
          </Button>
          <Button
            variant="contained"
            className="mx-auto my-4"
            sx={{ width: "10rem", height: "2.5rem" }}
            onClick={handleClickUploadFile}
          >
            Upload File
          </Button>
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
                      primary={<TextField
                        required
                        id="folder_name"
                        label="Folder Name"
                        variant="outlined"
                        className="my-4"
                        onChange={handleChangeNewContentName}
                        name="folder_name"
                        onBlur={handleCreateFolder}
                        value={newContentName}
                      />}
                    />
                  </ListItem>
                }
                {contents?.resource?.map((content) => {
                  return (
                    <ListItem
                      onClick={() => handleClickContent(content)}
                      className="resource-item"
                    >
                      <ListItemIcon>
                        {content.resource_type === "folder" && <FolderIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={content.resource_title}
                        secondary={content.createdAt}
                      />
                    </ListItem>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      {projectGetApi.data && <UploadResource setShowUploadResourceModal={setUploadNewFile} showUploadResourceModal={uploadNewFile} onHideUploadResourceModal={() => setUploadNewFile(false)} resource_project_path={currentPath} resource_project_id={projectGetApi.data._id} />}
    </div>
  );
}

export default DirectoryView;
