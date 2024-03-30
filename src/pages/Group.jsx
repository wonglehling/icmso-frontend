import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import ModalMember from "../components/ModalMember";
import ConfirmationModal from "../components/ComfirmationModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { Row, Col } from "react-bootstrap";

import PlusIcon from "../assets/icons/plus.svg";
import EditIcon from "../assets/icons/pen.svg";
import DeleteIcon from "../assets/icons/trash3.svg";
import ViewIcon from "../assets/icons/eye.svg";
import testImg from "../assets/test.jpeg";
import "../styles/group.css";

function createData(name, joinDate, role, researchInterests, Action) {
  return { name, joinDate, role, researchInterests, Action };
}

const rows = [
  createData(
    "Wong Leh Ling",
    "12/10/2022",
    "Group Admin",
    "Computer Science",
    "Edit Delete"
  ),
  createData(
    "Hia Wei Qi",
    "12/10/2022",
    "Member",
    "Image Processing",
    "Edit Delete"
  ),
  createData("Jasmine", "12/10/2022", "Member", "NLP", "Edit Delete"),
  createData(
    "Wong Leh Qine",
    "12/10/2022",
    "Member",
    "Data Analysis",
    "Edit Delete"
  ),
  createData("Ali", "12/10/2022", "Member", "Image Processing", "Edit Delete"),
];

export default function Group() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleModalClose = () => setShowAddModal(false);
  const handleModalShow = () => {
    setShowAddModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };
  const handleClickGroupMember = (id) => {
    navigate("/group-member-detail");
  };

  return (
    <div>
      <SideBar />
      <div className="group-title">Group Details</div>
      <div className="flex-container">
        <div style={{ flexGrow: 1 }}>
          <div
            style={{ height: "160px", justifyContent: "left", display: "flex" }}
          >
            <CardMedia
              sx={{
                display: "block",
                maxWidth: "194px",
                maxHeight: "160px",
                width: "auto",
                height: "auto",
                marginRight: "auto",
                marginLeft: "1rem",
                textAlign: "left",
              }}
              component="img"
              height="194"
              image={testImg}
            />
          </div>
        </div>
        <div
          style={{ flexGrow: 2, fontSize: "12px", textAlign: "justify" }}
          className="ms-5"
        >
          <div className="group-name">Group Name</div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus
          scelerisque eleifend donec pretium. Lectus sit amet est placerat in
          egestas erat. Interdum velit laoreet id donec. Scelerisque fermentum
          dui faucibus in ornare quam viverra orci. Amet commodo nulla facilisi
          nullam vehicula ipsum a. Ultrices mi tempus imperdiet nulla. Lorem
          dolor sed viverra ipsum nunc aliquet bibendum. Sit amet risus nullam
          eget felis eget nunc lobortis mattis. Sed vulputate mi sit amet mauris
          commodo. Sem integer vitae justo eget magna fermentum iaculis eu non.
        </div>
      </div>
      <TableContainer component={Paper} className="mt-3">
        <Row>
          <Col>
            <div className="group-title">Group Members</div>
          </Col>
          <Col className="btn-add">
            <Button
              variant="contained"
              type="submit"
              className="mx-auto mt-2"
              onClick={handleModalShow}
            >
              <img src={`${PlusIcon}`} className="me-2" />
              Add
            </Button>
          </Col>
        </Row>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Join Date</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Research Interests</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.joinDate}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.researchInterests}</TableCell>
                <TableCell align="right">
                  <img
                    src={ViewIcon}
                    className="mx-2"
                    onClick={() => handleClickGroupMember(1)}
                  />
                  <img
                    src={EditIcon}
                    className="mx-2"
                    onClick={handleModalShow}
                  />
                  <img
                    src={DeleteIcon}
                    className="mx-2"
                    onClick={handleDeleteModalShow}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalMember show={showAddModal} handleClose={handleModalClose} />
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={handleDeleteModalClose}
      />
    </div>
  );
}
