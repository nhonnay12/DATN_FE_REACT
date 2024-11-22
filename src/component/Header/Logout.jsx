import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../services/localStorageService";

const LogoutConfirmation = ({ showModal, setShowModal }) => {
  const handleClose = () => {
    setShowModal(false);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    localStorage.removeItem("userRole"); // Xóa userRole khỏi localStorage
    //window.location.reload(); // Tải lại trang
    setShowModal(false);
    navigate("/");
  };
  return (
    <div>
      {/* Dialog xác nhận đăng xuất */}
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Xác nhận đăng xuất</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn đăng xuất?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Đăng xuất
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutConfirmation;
