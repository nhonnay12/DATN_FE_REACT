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
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState(null);
  const [enabled, setEnable] = useState(true);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const imageRef = useRef(null); // Reference to the Box containing the image
  const [imageURL, setImageURL] = useState("");
  const handleClear = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleLogin = () => {
    return navigate("/login");
  };
  const handleSubmit = async (e) => {
    let res = await postCreateUser(email, password, username, image, enabled);
    console.log(">>> result: ", res);

    // Kiểm tra phản hồi từ API
    if (res && res.code === 200) {
      toast.success("Đăng ký thành công!");
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleClearImage = () => {
    setImageURL("");
  };

  // Use ResizeObserver to adjust Box size when image changes
  useEffect(() => {
    if (imageRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        // You can adjust the Box size here if needed
      });
      resizeObserver.observe(imageRef.current);

      return () => resizeObserver.disconnect(); // Cleanup on unmount
    }
  }, [imageURL]); // Trigger on image URL change

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
              //   onSubmit={handleSubmit}
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
              {/* <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={"firstName"}
                onChange={(e) => e.target.value}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={"lastName"}
                onChange={(e) => e.target.value}
              /> */}
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
              {/* <TextField
                label="Phone"
                name="phone"
                variant="outlined"
                fullWidth
                margin="normal"
                value={"phone"}
                onChange={(e) => e.target.value}
              /> */}
              {/* <Box mt={2} width="100%" ref={imageRef}>
                <Typography variant="h5">Upload and Preview Image</Typography>
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  fullWidth
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                {imageURL && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Selected Image Preview:
                    </Typography>
                    <Box
                      sx={{ */}
              {/* width: "200px", // Kích thước chiều rộng cố định
                        height: "200px", // Kích thước chiều cao cố định
                        overflow: "hidden", // Ẩn phần ảnh vượt ra ngoài khung
                        display: "flex", // Đảm bảo ảnh căn giữa trong Box
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc", // Thêm đường viền cho khung
                        borderRadius: "8px", // Bo góc nếu muốn
                        marginTop: "8px",
                      }}
                    >
                      <img
                        src={imageURL}
                        alt="Preview"
                        style={{
                          maxWidth: "100%", // Đảm bảo ảnh không vượt quá chiều rộng của Box
                          maxHeight: "100%", // Đảm bảo ảnh không vượt quá chiều cao của Box
                          objectFit: "cover", // Làm cho ảnh có thể lấp đầy khung mà không bị biến dạng
                        }}
                      />
                    </Box>
                  </Box> */}
              {/* )} */}
              {/* </Box> */}
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
