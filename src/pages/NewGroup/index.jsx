import React from 'react';
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useApiCall from "../../hooks/useApiCall";
import Button from "@mui/material/Button";

const EMPTY_BODY_DATA = {
  group_name: '',
  group_description: '',
  group_groups: []
}

export default function NewGroup() {
  const [bodyData, setBodyData] = useState(EMPTY_BODY_DATA);
  const groupApi = useApiCall("post", "/group", {}, bodyData);
  const navigate = useNavigate();

  // useEffect(() => {
  //   groupApi.executeApi();
  // }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setBodyData({ ...bodyData, [name]: value })
  }

  const handleOnChangeGroupSelect = (event, value, reason) => {
    if (value && reason) {
      const groupIds = value.map(val => val._id)
      const e = {
        target: {
          name: 'group_groups',
          value: groupIds
        }
      }
      handleOnChange(e)
    }
  }

  const handleCreateGroup = () => {
    groupApi.executeApi()
  }

  useEffect(() => {
    if (groupApi.data) {
      toast.success("New Group Created!");
      console.log("oo", groupApi.data);
      navigate("/group/" + groupApi.data.group._id);
    }

  }, [groupApi.data]);

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: "100%" }}>
        <Navbar />
        <Container>
          <TextField
            required
            fullWidth
            id="new-group-title"
            label="Group Name"
            variant="outlined"
            className="my-4"
            onChange={handleOnChange}
            name="group_name"
            value={bodyData.group_name}
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            id="new-group-description"
            label="Group Description"
            variant="outlined"
            className="mb-4"
            sx={{ flexGrow: 1 }}
            onChange={handleOnChange}
            name="group_description"
            value={bodyData.group_description}

          />
          <Button
            variant="contained"
            type="submit"
            className="mx-auto"
            sx={{ width: "10rem", height: "2.5rem", display: "block" }}
            onClick={handleCreateGroup}
          >
            Create
          </Button>
        </Container>
      </div>
    </>
  );
}