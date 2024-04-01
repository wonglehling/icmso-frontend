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

const RESOURCE_BODY = {
  resource_info: {
    resource_file_name: "",
    resource_file_type: "",
  },
  resource_title: "",
  resource_description: "",
  resource_type: "",
  resource_props: {},
  resource_group_id: [],
  resource_versions: {
    resource_version_title: "Upload Resource",
    resource_version_description: "User has uploaded new resource",
    resource_update_details: [],
  },
};

export default function UploadResource() {
  const [tabValue, setTabValue] = useState("1");
  const [formBody, setFormBody] = useState(RESOURCE_BODY);

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
            <Article />
          </TabPanel>
          <TabPanel value="2">
            <Code />
          </TabPanel>
          <TabPanel value="3">
            <Dataset />
          </TabPanel>
          <TabPanel value="4">
            <EBook />
          </TabPanel>
          <TabPanel value="5">
            <Presentation />
          </TabPanel>
          <TabPanel value="6">
            <Report />
          </TabPanel>
          <TabPanel value="7">
            <ResearchPaper />
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
}
