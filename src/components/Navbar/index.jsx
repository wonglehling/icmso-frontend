import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import BellIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import ProfileIcon from "../../assets/icons/person-circle.svg";
import "./index.css";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleClickMemberProfile = () => {
    navigate("/profile-detail");
    handleProfileClose();
  };

  useEffect(() => {
    setCurrentPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Container className="mt-2 mb-4">
      <Row>
        <Col className="navbar-title">
          {currentPath
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + " ")}
        </Col>
        <Col sm={5} style={{ display: "flex" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "25px",
              height: "36px",
              backgroundColor: "#eee",
              marginTop: "5px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "14px !important" }}
              placeholder="Search"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <IconButton color="primary" sx={{ p: "10px" }}>
            <BellIcon />
          </IconButton>
          <IconButton color="primary" sx={{ p: "10px" }}>
            <AccountCircleOutlinedIcon
              aria-controls={openProfile ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
              onClick={handleProfileClick}
            />
          </IconButton>
          {/* <img
            src={ProfileIcon}
            aria-controls={openProfile ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleProfileClick}
          /> */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openProfile}
            onClose={handleProfileClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClickMemberProfile}>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Col>
      </Row>
    </Container>
  );
}
