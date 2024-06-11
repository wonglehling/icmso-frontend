import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from '@mui/material';
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
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import PlusIcon from "../../assets/icons/plus.svg";
import HomeIcon from "../../assets/icons/house.svg";
import ResourcesIcon from "../../assets/icons/folder2.svg";
import GroupIcon from "../../assets/icons/people.svg";
import LoveIcon from "../../assets/icons/heart.svg";
import Logo from "../../../public/logo.svg";
import useApiCall from "../../hooks/useApiCall";

const drawerWidth = 240;

export default function SideBar() {
  const { data, loading, error, executeApi } = useApiCall("get", "/group", { self: true });

  React.useEffect(() => {
    executeApi();
  }, []);

  const navigate = useNavigate();
  const [openGroupCollapse, setOpenGroupCollapse] = React.useState(false);

  function handleOpenSettings() {
    setOpenGroupCollapse(!openGroupCollapse);
  }
  function handleClickNav(item, id = "") {
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
      case "Upload":
        navigate("/upload");
        break;
      case "Projects":
        navigate("/project");
        break;
      case "NewProject":
        navigate("/new-project");
        break;
      case "GroupDetail":
        navigate(`/group/${id}`);
        break;
      default:
        break;
    }
  }

  const showCorrectIcon = (item) => {
    switch (item) {
      case "Home":
        return <img src={HomeIcon} className="ms-2" />;
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
      default:
        break;
    }
  };

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
            overflowX: "hidden",
            border: "none",
          },
          zIndex: 900,
        }}
        className="bar"
        variant="permanent"
        anchor="left"
      >
        <img src={Logo} style={{ width: "10rem" }} className="mx-auto mt-2" />
        <Button
          variant="contained"
          type="submit"
          className="mx-auto my-2"
          onClick={() => handleClickNav("NewProject")}
          sx={{ width: "10rem", height: "2.5rem" }}
        >
          <img src={`${PlusIcon}`} className="me-2" />
          Project
        </Button>
        <List>
          {[
            "Home",
            "Resources",
            "Group",
            "Favourite",
            "Projects",
          ].map((text, index) => {
            return text === "Group" ? (
              <>
                {/* <ListItem
                    key={text}
                    disablePadding
                    onClick={() => handleClickNav(text)}
                  >
                    <ListItemButton>
                      <ListItemIcon>{showCorrectIcon(text)}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem> */}
                <ListItem
                  key={text}
                  disablePadding
                  onClick={handleOpenSettings}
                >
                  <ListItemButton>
                    <ListItemIcon>{showCorrectIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                  {openGroupCollapse ? (
                    <ExpandLess sx={{ marginRight: "0.75rem" }} />
                  ) : (
                    <ExpandMore sx={{ marginRight: "0.75rem" }} />
                  )}
                </ListItem>
                <Collapse in={openGroupCollapse} timeout="auto" unmountOnExit>
                  <Button
                    variant="contained"
                    type="submit"
                    className="mx-auto my-2"
                    // onClick={() => handleClickNav("NewProject")}
                    sx={{ width: "10rem", height: "2.5rem", display: "block"}}
                  >
                    <img src={`${PlusIcon}`} className="me-2" />
                    Group
                  </Button>
                  <List component="div" disablePadding>
                    {data &&
                      data.map((group) => {
                        return (
                          <ListItem
                            key={text + "1"}
                            disablePadding
                            onClick={() =>
                              handleClickNav("GroupDetail", group._id)
                            }
                            className="ms-2"
                          >
                            <ListItemButton>
                              <ListItemIcon>
                                {showCorrectIcon(text)}
                              </ListItemIcon>
                              <ListItemText primary={group.group_name} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleClickNav(text)}
              >
                <ListItemButton>
                  <ListItemIcon>{showCorrectIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
