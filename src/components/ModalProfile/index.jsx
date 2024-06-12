import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



import "./index.css";



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

function ModalProfile({ show, handleClose, handleUpdate , handleOnChangeFormBody, formBody}) {
  const [researchInterests, setResearchInterests] = useState("");
  const [profileGender, setprofileGender] = useState();

  const handleResearchInterestsChange = (event) => {
    setResearchInterests(event.target.value);
  };

  const handleprofileGenderChange = (event) => {
    const e = {
      target: {
        name: "user_gender",
        value: event.target.value
      }
    }
    handleOnChangeFormBody(e)
    setprofileGender(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          required
          id="profile-name"
          label="Name"
          variant="outlined"
          value={formBody ? formBody.user_first_name : ''}
          onChange={handleOnChangeFormBody}
          name="user_first_name"

          className="my-3 me-3"
          sx={{ flexGrow: 1, width: "50%" }}
        />
        <FormControl
          required
          className="my-3"
          sx={{ flexGrow: 1, width: "46%" }}
        >
          <InputLabel id="profile-gender-label">Gender</InputLabel>
          <Select
            labelId="profile-gender-label"
            id="profile-gender"
            value={profileGender}
            label="Gender"
            onChange={handleprofileGenderChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
        {/* <DatePicker
          id="profile-join-date"
          label="Join Date"
          sx={{ flexGrow: 1, width: "50%" }}
          className="mb-3 me-3"
        />
        <TextField
          required
          id="profile-age"
          label="Age"
          variant="outlined"
          className="mb-3"
          sx={{ flexGrow: 1, width: "46%" }}
        /> */}
        <TextField
          required
          fullWidth
          id="profile-phone-number"
          label="Phone Number"
          variant="outlined"
          value={formBody ? formBody.user_phone_number : ''}
          onChange={handleOnChangeFormBody}
          name="user_phone_number"

          className="mb-3"
        />
        <TextField
          required
          fullWidth
          id="profile-address"
          value={formBody ? formBody.user_address : ''}
          onChange={handleOnChangeFormBody}
          name="user_address"

          label="Address"
          variant="outlined"
          className="mb-3"
        />
        <TextField
          required
          fullWidth
          multiline
          value={formBody ? formBody.user_description : ''}
          onChange={handleOnChangeFormBody}
          name="user_description"

          rows={2}
          id="profile-description"
          label="Description"
          variant="outlined"
          className="mb-3"
        />
        {/* <Autocomplete
          multiple
          limitTags={2}
          id="multiple-research-interest"
          options={researchInterestsCS}
          getOptionLabel={(option) => option.title}
          defaultValue={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Research Interests"
            />
          )}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProfile;
