import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useApiCall from "../../hooks/useApiCall";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EMPTY_BODY_DATA = {
  project_name: '',
  project_description: '',
  project_groups: []
}

export default function NewProject() {
  const navigate = useNavigate();
  const [bodyData, setBodyData] = useState(EMPTY_BODY_DATA);
  const groupApi = useApiCall("get", "/group");
  const projectApi = useApiCall("post", "/project", {}, bodyData);

  useEffect(() => {
    groupApi.executeApi();
  }, []);

  useEffect(() => {
    if (groupApi.data) {
      toast.success("New Project Created!");
      navigate("/project/" + projectApi.data.project._id);
    }

  }, [projectApi.data]);

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

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: "100%" }}>
        <Navbar />
        <Container>
          <TextField
            required
            fullWidth
            id="new-project-title"
            label="Project Name"
            variant="outlined"
            className="my-4"
            onChange={handleOnChange}
            name="project_name"
            value={bodyData.project_name}
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="new-project-description"
            label="Project Description"
            variant="outlined"
            className="mb-4"
            sx={{ flexGrow: 1 }}
            onChange={handleOnChange}
            name="project_description"
            value={bodyData.project_description}

          />
          {groupApi.data && (
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-group"
              options={groupApi.data}
              getOptionLabel={(option) => option.group_name}
              defaultValue={[]}
              renderInput={(params) => (
                <TextField {...params} label="Access Group" />
              )}
              name="project_groups"
              onChange={handleOnChangeGroupSelect}
            />
          )}
          <Button
            variant="contained"
            type="submit"
            className="mx-auto my-4"
            sx={{ width: "10rem", height: "2.5rem", display: "block"}}
            onClick={handleCreateProject}
          >
            Create
          </Button>
        </Container>
      </div>
    </>
  );
}
