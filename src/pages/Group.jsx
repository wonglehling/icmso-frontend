import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../components/Sidebar";
import ModalMember from "../components/ModalMember";
import ConfirmationModal from "../components/ComfirmationModal";
import ModalEditMember from "../components/ModalEditMember";
import GroupConfirmationModal from "../components/GroupConfirmationModal";
import ModalEditGroup from "../components/ModalEditGroup";

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
import useApiCall from "../hooks/useApiCall";
import { formatDate } from "../utils/stringFormatter";

function createData(name, joinDate, role, researchInterests, Action, id) {
  return { name, joinDate, role, researchInterests, Action, id };
}

// const rows = [
//   createData(
//     "Wong Leh Ling",
//     "12/10/2022",
//     "Group Admin",
//     "Computer Science",
//     "Edit Delete"
//   ),
//   createData(
//     "Hia Wei Qi",
//     "12/10/2022",
//     "Member",
//     "Image Processing",
//     "Edit Delete"
//   ),
//   createData("Jasmine", "12/10/2022", "Member", "NLP", "Edit Delete"),
//   createData(
//     "Wong Leh Qine",
//     "12/10/2022",
//     "Member",
//     "Data Analysis",
//     "Edit Delete"
//   ),
//   createData("Ali", "12/10/2022", "Member", "Image Processing", "Edit Delete"),
// ];

export default function Group() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [rows, setRows] = useState([]);

  const { data, loading, error, fetchData } = useApiCall("get", "/group/" + id);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const newRows = [];
    data &&
      data.group_members.forEach((member) => {
        newRows.push(
          createData(
            member.group_member_id.user_first_name +
              " " +
              member.group_member_id.user_last_name,
            formatDate(member.group_member_join_date),
            member.group_member_type,
            member.group_member_research_interests.map(
              (interest) => interest + ","
            ),
            "Edit Delete",
            member.group_member_id._id
          )
        );
      });
    setRows(newRows);
  }, [data]);

  const handleModalClose = () => setShowAddModal(false);
  const handleModalShow = () => {
    setShowAddModal(true);
  };
  const handleAddMember = () => {
    console.log("member added successful");
  };

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteMember = () => {
    console.log("member delete successful");
  };

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => {
    setShowEditModal(true);
  };
  const handleEditMember = () => {
    console.log("member update successful");
  };

  const handleDeleteGroupModalClose = () => setShowDeleteGroupModal(false);
  const handleDeleteGroupModalShow = () => {
    setShowDeleteGroupModal(true);
  };
  const handleDeleteGroup = () => {
    console.log("group delete successful");
  };

  const handleEditGroupModalClose = () => setShowEditGroupModal(false);
  const handleEditGroupModalShow = () => {
    setShowEditGroupModal(true);
  };
  const handleEditGroup = () => {
    console.log("group update successful");
  };

  const handleClickGroupMember = (id) => {
    navigate("/group-member-detail/" + id);
  };

  return (
    <div>
      <SideBar />
      {data && (
        <>
          <Row>
            <Col>
              <div className="group-title">Group Details</div>
            </Col>
            <Col className="pd-icon">
              <img
                src={EditIcon}
                className="me-3"
                onClick={handleEditGroupModalShow}
              />
              <img src={DeleteIcon} onClick={handleDeleteGroupModalShow} />
            </Col>
          </Row>
          <div className="flex-container">
            <div style={{ flexGrow: 1 }}>
              <div
                style={{
                  height: "160px",
                  justifyContent: "left",
                  display: "flex",
                }}
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
              <div className="group-name">Group Name: {data.group_name}</div>
              {data.group_description}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Faucibus scelerisque eleifend donec pretium. Lectus sit amet est
              placerat in egestas erat. Interdum velit laoreet id donec.
              Scelerisque fermentum dui faucibus in ornare quam viverra orci.
              Amet commodo nulla facilisi nullam vehicula ipsum a. Ultrices mi
              tempus imperdiet nulla. Lorem dolor sed viverra ipsum nunc aliquet
              bibendum. Sit amet risus nullam eget felis eget nunc lobortis
              mattis. Sed vulputate mi sit amet mauris commodo. Sem integer
              vitae justo eget magna fermentum iaculis eu non.
            </div>
          </div>
          <TableContainer component={Paper} className="mt-3" sx={{ overflowX: "hidden" }}>
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
            <Table aria-label="simple table">
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
                        onClick={() => handleClickGroupMember(row.id)}
                      />
                      <img
                        src={EditIcon}
                        className="mx-2"
                        onClick={handleEditModalShow}
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
          <ModalMember
            show={showAddModal}
            handleClose={handleModalClose}
            handleAdd={handleAddMember}
          />
          <ConfirmationModal
            show={showDeleteModal}
            handleClose={handleDeleteModalClose}
            handleDelete={handleDeleteMember}
          />
          <ModalEditMember
            show={showEditModal}
            handleClose={handleEditModalClose}
            handleEdit={handleEditMember}
          />
          <GroupConfirmationModal
            show={showDeleteGroupModal}
            handleClose={handleDeleteGroupModalClose}
            handleDelete={handleDeleteGroup}
          />
          <ModalEditGroup
            show={showEditGroupModal}
            handleClose={handleEditGroupModalClose}
            handleSave={handleEditGroup}
          />
        </>
      )}
    </div>
  );
}