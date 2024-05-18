import React, { useState } from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";

import "../styles/directory.css";

function DirectoryView() {
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
  const [contents, setContents] = useState(content1);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  function handleClickContent() {
    setContents(content2);
  }

  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              href="/material-ui/react-breadcrumbs/"
              aria-current="page"
            >
              Breadcrumbs
            </Link>
          </Breadcrumbs>
        </div>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Demo>
                {contents.map((content) => {
                  return (
                    <ListItem
                      onClick={handleClickContent}
                      className="resource-item"
                    >
                      <ListItemIcon>
                        {content.type === "folder" && <FolderIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={content.name}
                        secondary={content.date}
                      />
                    </ListItem>
                  );
                })}
              </Demo>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default DirectoryView;
