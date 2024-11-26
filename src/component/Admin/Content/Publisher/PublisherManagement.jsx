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

import { getToken } from "../../../../services/localStorageService";
import { getAllPublisher } from "../../../../services/apiServices";

const PublisherManagement = () => {
  const [publisers, setPublishers] = useState([]);
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
      const response = await getAllPublisher();
      if (response.code === 200) {
        setPublishers(response.result);
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
    publisher = { id: null, name: "", address: "", status: "ACTIVE" }
  ) => {
    setFormData(publisher);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ id: null, name: "", address: "", status: "ACTIVE" });
  };

  // Add or update publisher
  const handleSave = async () => {
    // Validate input
    if (!formData.name.trim()) {
      toast.error("Tên không được để trống!"); // Use toast.error for notifications
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Mô tả không được để trống!"); // Use toast.error for notifications
      return;
    }

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:8080/api/publisher`
      : "http://localhost:8080/api/publisher";

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
  const [publisherToDelete, setAuthorToDelete] = useState(null); // Author to delete
    // Delete publisher
    const handleDelete = async (id) => {
        setConfirmDelete(true);
        setAuthorToDelete(id);
      };
    
      const confirmDeleteAction = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/publisher/${publisherToDelete}`,
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
            throw new Error("Failed to delete publisher.");
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
      <h2>Quản Lý nhà cung cấp</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Thêm nhà cung cấp
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
            {publisers.map((publisher, index) => (
              <TableRow key={publisher.id}>
                <TableCell>{index + 1 }</TableCell>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell>{publisher.status || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpenDialog(publisher)}
                  >
                    Sửa
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(publisher.id)}
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
          {formData.id ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp"}
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
            Bạn có chắc chắn muốn xóa nhà cung cấp{" "}
            <strong>{publisers.find((publisher) => publisher.id === publisherToDelete)?.name}</strong>?
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

export default PublisherManagement;
