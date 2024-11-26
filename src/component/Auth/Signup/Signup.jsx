import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postCreateUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState(null);
  const [enabled, setEnable] = useState(true);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const imageRef = useRef(null); // Reference to the Box containing the image
  // const [imageURL, setImageURL] = useState("");
  const handleClear = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword(""); // Clear confirm password as well
  };

  const handleLogin = () => {
    return navigate("/login");
  };

  const handleSubmit = async (e) => {
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    let res = await postCreateUser(email, password, username, image);
    console.log(">>> result: ", res);

    // Check response from API
    if (res && res.code === 200) {
      toast.success("Registration successful!");
      handleClear();
      handleLogin();
    } else {
      toast.error(res.message);
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    if (success) navigate("/login");
  };

  return (
    <>
      <Snackbar
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={"#f0f2f5"}
      >
        <Card
          sx={{
            minWidth: 500,
            maxHeight: 1000,
            boxShadow: 4,
            borderRadius: 4,
            padding: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Create Account
            </Typography>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: "15px", mb: "25px" }}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Signup;
