import "./App.css";
import { Routes, Route } from "react-router-dom";

// import RegisterUser from './pages/RegisterUser'
import Login from "./pages/Login";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Group from "./pages/Group";
import Favourite from "./pages/Favourite";
import Setting from "./pages/Setting";
import UploadResource from "./pages/UploadResources";
import GroupMemberDetail from "./pages/GroupMemberDetail";
import ResourceDetail from "./pages/ResourceDetail";
import ProfileDetails from "./pages/ProfileDetails";
import DirectoryView from "./pages/Directory";
import SearchResult from "./pages/SearchResult";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";
import { UserContextProvider } from "../context/userContext";
import { ProtectRoutes, UnprotectRoutes } from "./hooks/protectRoutes";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    primary: {
      main: "#013E7B",
    },
  },
});

function App() {
  return (
    <>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 2000 }}
            />
            <Routes>
              {/* <Route path='/register' element={<RegisterUser />} /> */}
              <Route element={<ProtectRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/group/:id" element={<Group />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/upload" element={<UploadResource />} />
                <Route path="/new-project" element={<NewProject />} />
                <Route path="/project/:project_id/:project_path" element={<DirectoryView />} />
                <Route path="/project/:project_id" element={<DirectoryView />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/project" element={<Projects />} />
                <Route
                  path="/group-member-detail/:id"
                  element={<GroupMemberDetail />}
                />
                <Route path="/profile-detail" element={<ProfileDetails />} />
                <Route
                  path="/resource-detail/:id"
                  element={<ResourceDetail />}
                />
              </Route>

              <Route element={<UnprotectRoutes />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </LocalizationProvider>
        </ThemeProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
