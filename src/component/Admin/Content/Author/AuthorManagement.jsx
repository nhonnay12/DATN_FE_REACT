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
import { getAllAuthors } from "../../../../services/apiServices";

const AuthorManagement = () => {
  const [authors, setAuthors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    status: "ACTIVE", // Default status
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getAllAuthors();
      if (response.code === 200) {
        setAuthors(response.result);
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
    author = { id: null, name: "", address: "", status: "ACTIVE" }
  ) => {
    setFormData(author);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ id: null, name: "", address: "", status: "ACTIVE" });
  };

  // Add or update author
  const handleSave = async () => {
    // Validate input
    if (!formData.name || !formData.name.trim()) {
      toast.error("Tên không được để trống!"); // Use toast.error for notifications
      return;
    }

    if (!formData.address || !formData.address.trim()) {
      toast.error("Địa chỉ không được để trống!"); // Use toast.error for notifications
      return;
    }

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:8080/api/author`
      : "http://localhost:8080/api/author";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check the response status
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

      const result = await response.json(); // Read the response content
      if (result.code === 200) {
        toast.success(
          formData.id ? "Cập nhật thành công!" : "Thêm mới thành công!"
        ); // Use toast.success for success messages
        fetchCategories();
        handleCloseDialog();
      } else {
        toast.warning(result.message);
        //throw new Error(result.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error:", error);   
      toast.error("Có lỗi xảy ra!"); // Use toast.error for error messages
    }
  };
  const token = getToken();
  const [confirmDelete, setConfirmDelete] = useState(false); // New state for delete confirmation
  const [authorToDelete, setAuthorToDelete] = useState(null); // Author to delete
  // Delete author
    // Delete author
    const handleDelete = async (id) => {
        setConfirmDelete(true);
        setAuthorToDelete(id);
      };
    
      const confirmDeleteAction = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/author/${authorToDelete}`,
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
            throw new Error("Failed to delete author.");
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
      <h2>Quản Lý Tác Giả</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Thêm Tác Giả
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author, index) => (
              <TableRow key={author.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.address}</TableCell>
                <TableCell>{author.status || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenDialog(author)}
                  >
                    Sửa
                  </Button>
                  <Button color="error" onClick={() => handleDelete(author.id)}>
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
          {formData.id ? "Sửa Tác Giả" : "Thêm Tác Giả"}
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
            label="Địa chỉ"
            name="address"
            value={formData.address}
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
            Bạn có chắc chắn muốn xóa tác giả{" "}
            <strong>{authors.find((author) => author.id === authorToDelete)?.name}</strong>?
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

export default AuthorManagement;
