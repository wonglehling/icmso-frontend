import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// import RegisterUser from './pages/RegisterUser'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Group from "./pages/Group";
import Favourite from "./pages/Favourite";
import Setting from "./pages/Setting";
import UploadResource from "./pages/UploadResources";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          {/* <Route path='/register' element={<RegisterUser />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/group" element={<Group />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/upload" element={<UploadResource />} />
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
