import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Col, Container, Form, Row } from "react-bootstrap";
import SearchIcon from "../../assets/icons/search.svg";
import BellIcon from "../../assets/icons/bell.svg";
import ProfileIcon from "../../assets/icons/person-circle.svg";

import "./index.css";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');

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
    setCurrentPath(location.pathname.split('/')[1])
  }, [location]);

  return (
    <Container className="mt-2 mb-4">
      <Row>
        <Col className="navbar-title">{currentPath.split('-').map( word => word.charAt(0).toUpperCase() + word.slice(1) + " ")}</Col>
        <Col sm={5} style={{ display: "flex" }}>
          <div className="bd-container" style={{ width: "100%" }}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bd-searchbar"
                aria-label="Search"
              />
              <img src={SearchIcon} />
            </Form>
          </div>
          <img src={BellIcon} className="mg-icon" />
          <img
            src={ProfileIcon}
            aria-controls={openProfile ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleProfileClick}
          />
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
            <MenuItem >Logout</MenuItem>
          </Menu>
        </Col>
      </Row>
    </Container>
  );
}
