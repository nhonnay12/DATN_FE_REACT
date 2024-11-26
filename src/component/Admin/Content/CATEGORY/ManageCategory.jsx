import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify"; // Import toast for notifications
import { getAllCategory } from "../../../../services/apiCategory";
import { getToken } from "../../../../services/localStorageService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    status: "ACTIVE", // Default status
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      if (response.code === 200) {
        setCategories(response.result);
      } else {
        toast.error(response.message); // Use toast.error instead of Snackbar
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories"); // Use toast.error instead of Snackbar
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open dialog for adding/editing
  const handleOpenDialog = (
    category = { id: null, name: "", description: "", status: "ACTIVE" }
  ) => {
    setFormData(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ id: null, name: "", description: "", status: "ACTIVE" });
  };

  // Add or update category
  const handleSave = async () => {
    // Validate input
    if (!formData.name.trim()) {
      toast.error("Tên không được để trống!"); // Use toast.error for notifications
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Mô tả không được để trống!"); // Use toast.error for notifications
      return;
    }

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:8080/api/category`
      : "http://localhost:8080/api/category";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Read the response content
      if (result.code === 200) {
        toast.success(
          formData.id ? "Cập nhật thành công!" : "Thêm mới thành công!"
        ); // Use toast.success for success messages
        fetchCategories();
        handleCloseDialog();
      } else {
        throw new Error(result.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra!"); // Use toast.error for error messages
    }
  };
  const token = getToken();

  const [confirmDelete, setConfirmDelete] = useState(false); // New state for delete confirmation
  const [categoryToDelete, setAuthorToDelete] = useState(null); // Author to delete
  // Delete category
  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setAuthorToDelete(id);
  };

  const confirmDeleteAction = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/category/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Xóa thành công!"); // Use toast.success for success messages
        fetchCategories();
        setConfirmDelete(false);
      } else {
        throw new Error("Failed to delete category.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!"); // Use toast.error for error messages
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setAuthorToDelete(null);
  };
  return (
    <div>
      <h2>Quản Lý Thể Loại</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Thêm Thể Loại
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.status || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    Sửa
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(category.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {formData.id ? "Sửa Thể Loại" : "Thêm Thể Loại"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Mô Tả"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={cancelDelete}>
        <DialogTitle>Xác Nhận Xóa</DialogTitle>
        <DialogContent>
          <p>
            Bạn có chắc chắn muốn xóa thể loại{" "}
            <strong>
              {
                categories.find((category) => category.id === categoryToDelete)
                  ?.name
              }
            </strong>
            ?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Hủy</Button>
          <Button onClick={confirmDeleteAction} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
