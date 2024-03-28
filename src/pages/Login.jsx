import { useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "../styles/login.css";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
    } catch (error) {}
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
        <Paper elevation={3} className="px-5">
          <div className="login-title">Login</div>
          <form onSubmit={loginUser}>
            <TextField
              required
              id="email"
              label="Email"
              sx={{ width: "100%" }}
              defaultValue=""
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <TextField
              required
              id="password"
              label="Password"
              sx={{ width: "100%" }}
              defaultValue=""
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
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
