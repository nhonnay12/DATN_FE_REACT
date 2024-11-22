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
import { updateProduct } from "../../../../../services/apiProduct";
import { toast } from "react-toastify";

const EditProductModal = ({ show, setShow, product, fetchProducts }) => {
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
        console.error(err);
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
  const [errors, setErrors] = useState({}); // Để lưu thông báo lỗi

  const handleClose = () => {
    setShow(false);
  };

  // Cập nhật formData khi sản phẩm thay đổi
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        category: product.category?.id || "",
        author: product.author?.id || "",
        publisher: product.publisher?.id || "",
        status: product.status || "",
        driveLink: product.linkDrive || "",
        image: product.images || "",
      });
      const visibleImage = product.images?.find((image) => !image.hidden);
      if (visibleImage) {
        setPreviewImage(`data:image/jpeg;base64,${visibleImage.imageData}`);
      } else {
        setPreviewImage(""); // Default or fallback image if no visible image found
      }
    }
  }, [product]);

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
  const hasChanges = () => {
    return (
      formData.name !== (product.name || "") ||
      formData.description !== (product.description || "") ||
      formData.price !== (product.price || "") ||
      formData.quantity !== (product.quantity || "") ||
      formData.category !== (product.category?.id || "") ||
      formData.author !== (product.author?.id || "") ||
      formData.publisher !== (product.publisher?.id || "") ||
      formData.driveLink !== (product.linkDrive || "") ||
      formData.status !== (product.status || "") ||
      (formData.image && formData.image !== product.image) // So sánh ảnh nếu ảnh được cập nhật
    );
  };

  const handleSubmit = async () => {
    // Nếu không có sự thay đổi, không thực hiện gì
    if (!hasChanges()) {
      toast.info("Không có thay đổi nào để cập nhật.");
      return; // Dừng hàm nếu không có thay đổi
    }

    try {
      const res = await updateProduct(product.id, formData); // Gọi API để cập nhật sản phẩm
      if (res.code === 200) {
        toast.success("Cập nhật sách thành công!");
        fetchProducts(1); // Tải lại danh sách sản phẩm sau khi cập nhật
        setShow(false); // Đóng modal sau khi lưu thành công
      } else {
        alert(res.message || "Lỗi khi cập nhật sản phẩm.");
      }
    } catch (error) {
      console.error("Failed to update product", error);
      alert("Lỗi khi cập nhật sản phẩm.");
    }
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
              error={!!errors.name}
              helperText={errors.name}
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
              error={!!errors.price}
              helperText={errors.price}
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
              error={!!errors.quantity}
              helperText={errors.quantity}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.category}>
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
              {/* Hiển thị lỗi dưới Select */}
              {errors.category && (
                <FormHelperText>{errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Author</InputLabel>
              <Select
                name="author"
                value={formData.author}
                onChange={handleChange}
                error={!!errors.author}
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
                error={!!errors.publisher}
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
            <FormControl fullWidth error={!!errors.status}>
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
              {errors.status && (
                <FormHelperText>{errors.status}</FormHelperText>
              )}
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

export default EditProductModal;
