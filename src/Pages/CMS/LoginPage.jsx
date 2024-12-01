import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  transition: "background-color 0.5s ease",
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
}));

const LoginPage = ({ themeMode, toggleTheme }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);
  useEffect(() => {
    if(sessionStorage.getItem("token")) navigate("/dashboard");
  },[])
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    // if (!validatePassword(password)) {
    //   toast.error("Password must be at least 8 characters long and contain both letters and numbers.");
    //   return;
    // }

    dispatch(login({ email, password }))
      .unwrap()
      .then((response) => {
        if(!response.success){
          toast.error(response.message);
          return;
        }
        toast.success(response.message+" Redirecting to dashboard in 3 seconds...");
        sessionStorage.setItem("token", response.data.token);
        setTimeout(() => {
          toast.dismiss();
          navigate("/dashboard");
        }, 3000);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <StyledContainer>
      <Box position="absolute" top={16} right={16}>
        <IconButton onClick={toggleTheme}>
          {themeMode.palette.mode === "dark" ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </Box>

      <LoginForm elevation={3}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </form>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode.palette.mode === "dark" ? "dark" : "light"}
        /> */}
      </LoginForm>
    </StyledContainer>
  );
};

export default LoginPage;
