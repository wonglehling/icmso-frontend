import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const researchInterestsCS = [
  { title: "Artificial Intelligence", year: 1956 },
  { title: "Machine Learning", year: 1959 },
  { title: "Data Science", year: 2001 },
  { title: "Computer Vision", year: 1966 },
  { title: "Natural Language Processing", year: 1950 },
  { title: "Robotics", year: 1942 },
  { title: "Cybersecurity", year: 1970 },
  { title: "Quantum Computing", year: 1980 },
  { title: "Human-Computer Interaction", year: 1983 },
  { title: "Bioinformatics", year: 1990 },
  { title: "Big Data", year: 2000 },
  { title: "Cloud Computing", year: 2006 },
  { title: "Internet of Things", year: 1999 },
  { title: "Software Engineering", year: 1968 },
  { title: "Distributed Systems", year: 1970 },
  { title: "Networking", year: 1960 },
  { title: "Databases", year: 1970 },
  { title: "Blockchain", year: 2008 },
  { title: "Augmented Reality", year: 1968 },
  { title: "Virtual Reality", year: 1968 },
  { title: "Algorithm Design", year: 1962 },
  { title: "Computational Biology", year: 1990 },
  { title: "Theoretical Computer Science", year: 1936 },
  { title: "Embedded Systems", year: 1960 },
  { title: "Parallel Computing", year: 1950 },
  { title: "Computer Graphics", year: 1963 },
  { title: "Cryptography", year: 1976 },
  { title: "Game Development", year: 1950 },
  { title: "Digital Signal Processing", year: 1960 },
  { title: "Information Retrieval", year: 1960 },
  { title: "Formal Methods", year: 1970 },
  { title: "Programming Languages", year: 1950 },
  { title: "Semantic Web", year: 2001 },
  { title: "Software Testing", year: 1950 },
  { title: "Computational Geometry", year: 1970 },
  { title: "Artificial Life", year: 1986 },
  { title: "Computational Neuroscience", year: 1980 },
  { title: "Bioinformatics", year: 1990 },
  { title: "Neural Networks", year: 1943 },
  { title: "Evolutionary Computation", year: 1960 },
  { title: "Swarm Intelligence", year: 1989 },
  { title: "Reinforcement Learning", year: 1989 },
  { title: "Speech Recognition", year: 1952 },
  { title: "Computer Vision", year: 1966 },
  { title: "Robotics", year: 1942 },
  { title: "Gesture Recognition", year: 1983 },
  { title: "Multimedia Systems", year: 1991 },
  { title: "Bioinformatics", year: 1990 },
  { title: "Quantum Cryptography", year: 1984 },
  { title: "Pattern Recognition", year: 1950 },
  { title: "Evolutionary Algorithms", year: 1960 },
  { title: "Cyber-Physical Systems", year: 2006 },
  { title: "Data Mining", year: 1995 },
  { title: "Sensor Networks", year: 2002 },
  { title: "Wireless Networks", year: 1990 },
  { title: "Mobile Computing", year: 1990 },
  { title: "High-Performance Computing", year: 1960 },
  { title: "Cognitive Computing", year: 2004 },
  { title: "Knowledge Representation", year: 1950 },
  { title: "Human-Robot Interaction", year: 1992 },
  { title: "Virtual Assistants", year: 2010 },
  { title: "Edge Computing", year: 2012 },
  { title: "Serverless Computing", year: 2012 },
  { title: "Microservices", year: 2011 },
  { title: "Deep Learning", year: 2006 },
  { title: "Transfer Learning", year: 1995 },
  { title: "Federated Learning", year: 2016 },
  { title: "Explainable AI", year: 2004 },
  { title: "Computer Audition", year: 2000 },
  { title: "Computational Linguistics", year: 1950 },
  { title: "Bioinspired Computing", year: 1989 },
  { title: "Social Computing", year: 2005 },
  { title: "Affective Computing", year: 1995 },
  { title: "Ambient Intelligence", year: 1998 },
  { title: "E-Health", year: 2000 },
  { title: "Wearable Computing", year: 2000 },
  { title: "Ubiquitous Computing", year: 1988 },
  { title: "Autonomous Systems", year: 1950 },
  { title: "Space Informatics", year: 2010 },
  { title: "Computational Photography", year: 1994 },
  { title: "Human Computation", year: 2005 },
  { title: "Semantic Computing", year: 2000 },
  { title: "Behavioral Biometrics", year: 2004 },
  { title: "Synthetic Biology", year: 2000 },
  { title: "Intelligent Tutoring Systems", year: 1982 },
  { title: "Automated Planning", year: 1950 },
  { title: "Collaborative Filtering", year: 1992 },
  { title: "Digital Twins", year: 2003 },
  { title: "Smart Grids", year: 2000 },
  { title: "Vehicle Networks", year: 2000 },
  { title: "Intelligent Transportation Systems", year: 1990 },
  { title: "Smart Cities", year: 1994 },
  { title: "5G Networks", year: 2010 },
  { title: "Smart Homes", year: 1984 },
  { title: "Cognitive Radio", year: 1999 }
];

function ModalEditMember({ show, handleClose, handleEdit, handleOnChange, selectedIndex = 0, memberData = { group_member_email: "" } }) {
  const [researchInterests, setResearchInterests] = useState("");
  const [memberRole, setMemberRole] = useState();

  const handleOnChangeResearchInterestsSelect = (event, value, reason) => {
    if (value && reason) {
      const researchInterests = value.map(val => val.title)
      const e = {
        target: {
          name: 'group_member_research_interests',
          value: researchInterests
        }
      }
      handleOnChange(e, selectedIndex)
    }
  }

  function getSelectedItem(){
    const item = researchInterestsCS.find((opt)=>{
      if (opt.title == memberData.group_member_research_interests)
        return opt;
    })
    console.log("here");
    return item || {};
  }

  const handleResearchInterestsChange = (event) => {
    setResearchInterests(event.target.value);
  };

  const handleMemberRoleChange = (event) => {
    setMemberRole(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          required
          value={memberData.group_member_email}
          onChange={handleOnChange}
          name="group_member_email"
          id="group_member_email"
          label="Email"
          variant="outlined"
          className="my-4 me-3"
          sx={{ flexGrow: 1, width: "50%" }}
        />
        <FormControl className="my-4" sx={{ flexGrow: 1, width: "46%" }}>
          <InputLabel id="member-role-label">Role</InputLabel>
          <Select
            labelId="member-role-label"
            id="group_member_type"
            name="group_member_type"
            value={memberData.group_member_type}
            label="Role"
            onChange={(e) => { handleOnChange(e, selectedIndex) }}
          >
            <MenuItem value={"Group Admin"}>Group Admin</MenuItem>
            <MenuItem value={"Member"}>Member</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          limitTags={2}
          id="group_member_research_interests"
          options={researchInterestsCS}
          getOptionLabel={(option) => option.title}
          defaultValue={memberData.group_member_research_interests || []}
          value={memberData.group_member_research_interests?.map((interest) => {
            return researchInterestsCS.find((opt) => opt.title === interest)
          }) || []}
          name="group_member_research_interests"
          onChange={handleOnChangeResearchInterestsSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Research Interests"
            />
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditMember;
