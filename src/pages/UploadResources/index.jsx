import React, { useState } from "react";
import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import Code from "./Code";
import Dataset from "./Dataset";
import EBook from "./EBook";
import ResearchPaper from "./ResearchPaper";
import Article from "./Article";
import Report from "./Report";
import Presentation from "./Presentation";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useApiCall from "../../hooks/useApiCall";
import axios from 'axios'; // Import Axios library
import { useNavigate } from 'react-router-dom';

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

export default function UploadResource() {
  const [tabValue, setTabValue] = useState("1");
  const [formBody, setFormBody] = useState(RESOURCE_BODY);
  const navigate = useNavigate()

  const handleOnChangeFormBody = (e) => {
    const { name, value } = e.target
    if (name === "resource_file") {
      setFormBody({ ...formBody, [name]: e.target.files[0] })
    } else
      setFormBody({ ...formBody, [name]: value })
  }

  const handleOnCreateFormBody = () => {
    const formData = new FormData();
    formData.append("resource_title", formBody.resource_title);
    formData.append("resource_description", formBody.resource_description);
    formData.append("resource_file", formBody.resource_file);
    axios({
      method: 'post',
      url: '/resource',
      data: formData,
      options: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    })
      .then((response) => {
      })
      .catch((error) => {
        if (error.response.status === 401) navigate('/login')
        // setError("Error getting the data");
      })
      .finally(() => {
        navigate('/home')
      });
  }

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <TabContext value={tabValue}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Article" value="1" />
            <Tab label="Code" value="2" />
            <Tab label="Dataset" value="3" />
            <Tab label="eBook" value="4" />
            <Tab label="Presentation" value="5" />
            <Tab label="Report" value="6" />
            <Tab label="Research Paper" value="7" />
          </TabList>
          <TabPanel value="1">
            <Article formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="2">
            <Code formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="3">
            <Dataset formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="4">
            <EBook formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="5">
            <Presentation formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="6">
            <Report formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
          <TabPanel value="7">
            <ResearchPaper formBody={formBody} handleOnChangeFormBody={handleOnChangeFormBody} handleOnCreateFormBody={handleOnCreateFormBody} />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
}
