import React, { useEffect, useState } from "react";

import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Chat from "../../components/RealTimeChat";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useApiCall from "../../hooks/useApiCall";
import Button from "@mui/material/Button";

const EMPTY_BODY_DATA = {
  project_name: '',
  project_description: '',
  project_group: []
}

export default function NewProject() {
  const groupApi = useApiCall("get", "/group");
  const [bodyData, setBodyData] = useState({});

  useEffect(() => {
    groupApi.fetchData();
  }, []);

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setBodyData({...bodyData, [name]: value})
  }

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: "100%" }}>
        <Navbar />
        <TextField
          required
          id="ebook-title"
          label="Project Name"
          variant="outlined"
          className="my-4"
          onChange={handleOnChange}
          name="project_name"
          value={bodyData.project_name}
        />
        <TextField
          required
          id="ebook-title"
          label="Project Description"
          variant="outlined"
          className="my-4"
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
          name="project_group"
          onChange={handleOnChange}
          />
        )}
        <Button
          variant="contained"
          type="submit"
          className="mx-auto my-4"
          sx={{ width: "10rem", height: "2.5rem" }}
          onClick={()=> {console.log(bodyData)}}
        >
          Upload
        </Button>
        
        <Chat />
      </div>
    </>
  );
}
