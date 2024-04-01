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
const top100Films = [
  { title: "The Shawshank Redemption", year: 1993 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1973 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1993 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1993 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1953 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1993 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2013 },
  { title: "Casablanca", year: 1932 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1946 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1953 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2013 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1993 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1963,
  },
  { title: "The Great Dictator", year: 1930 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1983 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1931 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1933 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2003,
  },
  { title: "Amadeus", year: 1983 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1938 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

function ModalProfile({ show, handleClose, handleUpdate }) {
  const [researchInterests, setResearchInterests] = useState("");
  const [profileGender, setprofileGender] = useState();

  const handleResearchInterestsChange = (event) => {
    setResearchInterests(event.target.value);
  };

  const handleprofileGenderChange = (event) => {
    setprofileGender(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ flexGrow: 1 }} className="mx-2 mt-3">
          <label for="images" class="image-container" id="imagecontainer">
            <span className="image-title ">Drop photo here</span>
            <span className="image-title2 ">or</span>
            <input
              type="file"
              id="images"
              accept="image/*"
              className="image-title1"
              required
            />
          </label>
        </div>
        <TextField
          required
          id="profile-name"
          label="Name"
          variant="outlined"
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
        <DatePicker
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
        />
        <TextField
          required
          fullWidth
          id="profile-phone-number"
          label="Phone Number"
          variant="outlined"
          className="mb-3"
        />
        <TextField
          required
          fullWidth
          id="profile-address"
          label="Address"
          variant="outlined"
          className="mb-3"
        />
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          id="profile-description"
          label="Description"
          variant="outlined"
          className="mb-3"
        />
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-research-interest"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
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
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProfile;
