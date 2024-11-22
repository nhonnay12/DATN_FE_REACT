import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FcPlus } from "react-icons/fc";
import {
  getAllAuthors,
  getAllCategory,
  getAllPublisher,
} from "../../../../../services/apiServices";
import { Label } from "@mui/icons-material";
import { postProduct, updateProduct } from "../../../../../services/apiProduct";
import { toast } from "react-toastify";

const CreateProduct = ({ show, setShow, fetchProducts }) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  // Load các danh sách từ backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, authorsRes, publishersRes] = await Promise.all([
          getAllCategory(),
          getAllAuthors(),
          getAllPublisher(),
        ]);
        setCategories(categoriesRes.result);
        setAuthors(authorsRes.result);
        setPublishers(publishersRes.result);
      } catch (err) {
        toast.error(err.res.message);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    author: "",
    publisher: "",
    driveLink: "",
    status: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(""); // Để xem trước ảnh
  const handleClose = () => {
    setShow(false);
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Hiển thị ảnh xem trước
        setFormData((prev) => ({
          ...prev,
          image: file, // Lưu ảnh vào formData
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async () => {
    // try {
    const res = await postProduct(formData); // Gọi API để cập nhật sản phẩm
    if (res && res.code === 200) {
      toast.success("Cập nhật sách thành công!");
      fetchProducts(1); // Tải lại danh sách sản phẩm sau khi cập nhật
      setShow(false); // Đóng modal sau khi lưu thành công
      console.log(res);
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        author: "",
        publisher: "",
        driveLink: "",
        status: "",
        image: "",
      });
    } else {
      toast.warning(res?.message || "Tạo thất bại!");
    }
    // } catch (error) {
    //   toast.error("Lỗi khi tạo sản phẩm.");
    //   console.error("Failed to create product", error);
    // }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 1300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Author</InputLabel>
              <Select
                name="author"
                value={formData.author}
                onChange={handleChange}
                label="Author"
              >
                {authors?.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Publisher</InputLabel>
              <Select
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                label="Publisher"
              >
                {publishers?.map((publisher) => (
                  <MenuItem key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Drive Link"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<FcPlus />}
              sx={{ display: "block", marginBottom: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: 400,
                overflow: "hidden",
                width: "100%",
              }}
            >
              {previewImage ? (
                <img
                  alt="Preview"
                  src={previewImage}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>Preview image</span>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateProduct;
