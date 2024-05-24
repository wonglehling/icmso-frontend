import React, { useEffect, useState } from "react";

import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Chat from "../../components/RealTimeChat";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useApiCall from "../../hooks/useApiCall";
import Button from "@mui/material/Button";
import { Col, Container, Row } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard";
import { useNavigate } from "react-router-dom";

const EMPTY_BODY_DATA = {
  project_name: '',
  project_description: '',
  project_groups: []
}

export default function NewProject() {
  const [bodyData, setBodyData] = useState(EMPTY_BODY_DATA);
  const navigate = useNavigate()
  const groupApi = useApiCall("get", "/group");
  const projectGetApi = useApiCall("get", "/project");
  const projectApi = useApiCall("post", "/project", {}, bodyData);

  useEffect(() => {
    projectGetApi.executeApi();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setBodyData({ ...bodyData, [name]: value })
  }

  const handleOnChangeGroupSelect = (event, value, reason) => {
    if (value && reason) {
      const groupIds = value.map(val => val._id)
      const e = {
        target: {
          name: 'project_groups',
          value: groupIds
        }
      }
      handleOnChange(e)
    }
  }

  const handleCreateProject = () => {
    projectApi.executeApi()
  }

  const handleClickDocDetail = (id, path) => {
    navigate("/project/" + id + "/"+ path);
  };

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: "100%" }}>
        <Navbar />
        {projectGetApi.data &&
          projectGetApi.data.map((doc, index) => {
            return (
              <Row >
                <ProjectCard
                  doc_info={doc}
                  handleClickDoc={() => handleClickDocDetail(doc._id, doc.project_name)}
                />
              </Row>
            );
          })}
        <Chat />
      </div>
    </>
  );
}
