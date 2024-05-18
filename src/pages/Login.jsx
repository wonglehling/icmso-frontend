import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../context/userContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { cookies, setCookies, setUser } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    try {
      const { data } = await axios.post("/auth/login", {
        user_email: email,
        user_password: password,
      });
      if (data) {
        setUser(data.userdata);
        setCookies("icms_access_token", data.token);
        toast.success("Login Successful");
        navigate("/home");
      } else {
        throw Error("Server internal error. Please contact system admin.");
      }
    } catch (error) {
      let toastErrMsg = "";
      if (error.code === "ERR_NETWORK" && error.name === "AxiosError") {
        toastErrMsg = "Cannot connect to server";
      } else if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.error === "UnauthorizedAccessError"
        )
          toastErrMsg = error.response.data.message;
      } else {
        console.log(error);
        toastErrMsg = "Server internal error. Please contact system admin.";
      }
      toast.error(toastErrMsg);
    }
  };

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
        <Paper elevation={3} className="px-5 mg-paper">
          <div className="login-title">Login</div>
          <form onSubmit={loginUser}>
            <TextField
              required
              id="email"
              label="Email"
              sx={{ width: "100%" }}
              defaultValue=""
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              className="my-3"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </FormControl>
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
