import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/userContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate()
    const { cookies, setCookies, setUser } = useAuth();
    const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = userData
    try {
      const { data } = await axios.post('/auth/login', {
        user_email: email, user_password: password
      })
      if (data) {
        setUser(data.userdata)
        setCookies('icms_access_token', data.token);
        toast.success("Login Successful")
        navigate('/home')
      } else {
        throw Error("Server internal error. Please contact system admin.")
      }
    } catch (error) {
      let toastErrMsg = ""
      if (error.code === "ERR_NETWORK" && error.name === "AxiosError") {
        toastErrMsg = "Cannot connect to server"
      } else if (error.response) {
        if (error.response.status === 401 && error.response.data.error === "UnauthorizedAccessError")
          toastErrMsg = error.response.data.message
      } else {
        console.log(error);
        toastErrMsg = "Server internal error. Please contact system admin."
      }
      toast.error(toastErrMsg)
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 400,
          },
        }}
      >
        <Paper elevation={3} className="px-5">
          <div className="login-title">Login</div>
          <form onSubmit={loginUser}>
            <TextField
              required
              id="email"
              label="Email"
              sx={{ width: "100%" }}
              defaultValue=""
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField
              required
              id="password"
              label="Password"
              sx={{ width: "100%" }}
              defaultValue=""
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="my-3"
            />
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                type="submit"
                className="mx-auto my-4"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
