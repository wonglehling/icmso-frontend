import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import PlusIcon from "../../assets/icons/plus.svg";
import HomeIcon from "../../assets/icons/house.svg"
import ResourcesIcon from "../../assets/icons/folder2.svg"
import GroupIcon from "../../assets/icons/people.svg"
import LoveIcon from "../../assets/icons/heart.svg"
import SettingIcon from "../../assets/icons/gear.svg"

const drawerWidth = 240;

export default function SideBar() {
  const navigate = useNavigate();
  function handleClickNav(item) {
    switch (item) {
      case "Home":
        navigate("/home");
        break;
      case "Resources":
        navigate("/resources");
        break;
      case "Group":
        navigate("/group");
        break;
      case "Favourite":
        navigate("/favourite");
        break;
      case "Setting":
        navigate("/setting");
        break;
      case "Upload":
        navigate("/upload");
        break;
      default:
        break;
    }
  }

  const showCorrectIcon = (item) => {
    switch (item) {
      case "Home":
        return <img src={HomeIcon} className="ms-2"/>;
        break;
      case "Resources":
        return <img src={ResourcesIcon} className="ms-2" />;
        break;
      case "Group":
        return <img src={GroupIcon} className="ms-2" />;
        break;
      case "Favourite":
        return <img src={LoveIcon} className="ms-2" />;
        break;
      case "Setting":
        return <img src={SettingIcon} className="ms-2" />;
        break;
      default:
        break;
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Home
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <Button
          variant="contained"
          type="submit"
          className="mx-auto my-4"
          onClick={() => handleClickNav("Upload")}
        >
          <img src={`${PlusIcon}`} className="me-2"/>
          Upload
        </Button>
        <List>
          {["Home", "Resources", "Group", "Favourite", "Setting"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleClickNav(text)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {showCorrectIcon(text)}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}
