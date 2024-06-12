import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ModalUser from "../components/ModalUser";
import ConfirmationModal from "../components/ComfirmationModal";
import ModalEditUser from "../components/ModalEditUser";
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
import { toast } from "react-hot-toast";
import useApiCall from "../hooks/useApiCall";

import PlusIcon from "../assets/icons/plus.svg";
import EditIcon from "../assets/icons/pen.svg";
import DeleteIcon from "../assets/icons/trash3.svg";
import ViewIcon from "../assets/icons/eye.svg";
import testImg from "../assets/test.jpeg";
import "../styles/group.css";
import { formatDate } from "../utils/stringFormatter";

function createData(name, createdAt, role, researchInterests, Action, id) {
  return { name, createdAt, role, researchInterests, Action, id };
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

const GROUP_BODY = {
  group_name: '',
  group_description: '',
  new_member: {}
}

const GROUP_MEMBER_BODY = {
  group_member_email: '',
  group_member_type: ''
}

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedMember, setSelectedMember] = useState(GROUP_MEMBER_BODY);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(-1);
  const [formBody, setFormBody] = useState(GROUP_BODY);

  const updateApi = useApiCall("put", "/user/" + selectedMember._id, {}, selectedMember)
  const userPostApi = useApiCall("post", "/user", {}, selectedMember)
  const [allUser, setAllUser] = useState([]);


  const { data, loading, error, executeApi } = useApiCall("get", "/user/" + 'all');
  const deleteApi = useApiCall("delete", "/user/" + selectedMember._id, {}, selectedMember);

  useEffect(() => {
    executeApi();
  }, [id]);

  const handleOnChangeFormBody = (e) => {
    const { name, value } = e.target
    if (name === "resource_file") {
      setFormBody({ ...formBody, [name]: e.target.files[0] })
    } else
      setFormBody({ ...formBody, [name]: value })
  }

  const handleOnAddMember = () => {

  }

  const handleOnDeleteMember = () => {

  }

  useEffect(() => {
    const newRows = [];
    data &&
      data.forEach((member) => {
        newRows.push(
          createData(
            member.user_first_name +
            " " +
            member.user_last_name,
            formatDate(member.createdAt),
            member.user_type,
            member.user_research_interests.map(
              (interest) => interest + ","
            ),
            "Edit Delete",
            member._id
          )
        );
      });
    setRows(newRows);
    setFormBody(data)
  }, [data]);

  const handleModalClose = () => setShowAddModal(false);
  const handleModalShow = () => {
    setShowAddModal(true);
  };
  const handleAddMember = () => {
    // handleEditGroup()
    userPostApi.executeApi()
    handleEditGroupModalClose()
    toast.success("User Added Successful");
    // window.location.reload()
  };

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = (index) => {
    setSelectedMemberIndex(index)
    setShowDeleteModal(true);
  };
  const handleDeleteMember = () => {
    // const newData = data;
    // newData.splice(selectedMemberIndex, 1)

    deleteApi.executeApi()
    handleDeleteGroupModalClose()
    toast.success("Member Deleted Successful");
    window.location.reload()
  };

  const handleEditNewMemberDetails = (e) => {
    const { name, value } = e.target
    setSelectedMember({ ...selectedMember, [name]: value })
  }

  const handleExistingMemberDetails = (e, i) => {
    const { name, value } = e.target
    // setFormBody({
    //   ...formBody.map((member, index) => {
    //     if (index === i) {
    //       return { ...formBody[index], [name]: value }
    //     } else {
    //       return member
    //     }
    //   })
    // })
    // console.log(formBody);
    // console.log(e, i);
    setSelectedMember({ ...selectedMember, [name]: value })
  }

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = (i) => {
    setSelectedMemberIndex(i)
    setShowEditModal(true);
  };
  const handleEditMember = () => {
    console.log(selectedMember);

    updateApi.executeApi()
    handleEditGroupModalClose();
    toast.success("Member Edited Successful");
    window.location.reload()
  };

  const handleChangeGroupMemberDetails = (e) => {
    setSelectedMember({ ...selectedMember, [e.target.name]: e.target.value });

  }

  const handleDeleteGroupModalClose = () => setShowDeleteGroupModal(false);
  const handleDeleteGroupModalShow = () => {
    setShowDeleteGroupModal(true);
  };

  useEffect(() => {
    console.log("updated member index", selectedMemberIndex);
    if (selectedMemberIndex >= 0) setSelectedMember(data && data[selectedMemberIndex]);
  }, [selectedMemberIndex]);

  const handleDeleteGroup = () => {
    deleteApi.executeApi();
    if (!deleteApi.error) {
      toast.success("Group Deleted Successful");
      navigate("/home");
    }
  };

  const handleEditGroupModalClose = () => setShowEditGroupModal(false);
  const handleEditGroupModalShow = () => {
    setShowEditGroupModal(true);
  };
  const handleEditGroup = () => {
    updateApi.executeApi()
    handleEditGroupModalClose()
    toast.success("Group Updated Successful");
    window.location.reload()
  };

  const handleClickGroupMember = (id) => {
    navigate("/group-member-detail/" + id);
  };

  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <Container>
          {data && (
            <>
              {/* <Row>
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
                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      justifyContent: "left"
                    }}
                  >
                    <Paper>
                      <div style={{ padding: '1rem', marginTop: "0.5rem" }}>
                        <div>
                          <Row>
                            <Col md={2}><span>Group Name: </span></Col>
                            <Col md={10} style={{ fontWeight: 'bold' }}>{data.group_name}</Col>
                          </Row>
                          <Row style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                            <Col md={2}><span>Group Description: </span></Col>
                            <Col md={10} style={{ fontWeight: 'bold' }}>{data.group_description}</Col>
                          </Row>
                        </div>
                        <Row>
                        </Row>
                      </div>

                    </Paper>
                  </div>
                </div>
                {/* <div
                  style={{ flexGrow: 2, fontSize: "12px", textAlign: "justify" }}
                >
                  <div className="group-name">Group Name: {data.group_name}</div>
                  {data.group_description}
                </div> 
              </div>*/}
              <TableContainer
                component={Paper}
                className="mt-4"
                sx={{ overflowX: "hidden" }}
              >
                <Row>
                  <Col>
                    <div className="group-title" style={{ paddingLeft: "1rem" }}>All Users</div>
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
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.createdAt}</TableCell>
                        <TableCell align="right">{row.role}</TableCell>
                        <TableCell align="right">
                          {row.researchInterests}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            src={ViewIcon}
                            className="mx-2"
                            onClick={() => handleClickGroupMember(row.id)}
                          />
                          <img
                            src={EditIcon}
                            className="mx-2"
                            onClick={() => handleEditModalShow(index)}
                          />
                          <img
                            src={DeleteIcon}
                            className="mx-2"
                            onClick={() => handleDeleteModalShow(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalUser
                show={showAddModal}
                memberData={selectedMember}
                handleOnChange={handleEditNewMemberDetails}
                handleClose={handleModalClose}
                handleAdd={handleAddMember}
              />
              <ConfirmationModal
                show={showDeleteModal}
                handleClose={handleDeleteModalClose}
                handleDelete={handleDeleteMember}
              />
              <ModalEditUser
                memberData={selectedMember}
                show={showEditModal}
                selectedIndex={selectedMemberIndex}
                handleClose={handleEditModalClose}
                handleEdit={handleEditMember}
                handleOnChange={handleExistingMemberDetails}
              />


            </>
          )}
        </Container>
      </div>
    </div>
  );
}
