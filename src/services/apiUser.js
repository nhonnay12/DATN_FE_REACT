import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";
const getMyinfo = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
      },
    };
    return axios.get("api/user", config);
  };
  const updateUserInfo = (userId, updates) => {
    const formData = new FormData();
  
    // Bắt buộc phải có userId
    if (userId) {
      formData.append("id", userId);
    }
  
    // Thêm các trường khác nếu có thay đổi
    if (updates.username) {
      formData.append("username", updates.username);
    }
    if (updates.role) {
      formData.append("role", updates.role);
    }
    if (updates.status) {
      formData.append("status", updates.status);
    }
    if (updates.file) {
      formData.append("userImage", updates.file);
    }
    if (updates.phone) {
      formData.append("phone", updates.phone);
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
        "Content-Type": "multipart/form-data",
      },
    };
  
    return axios.put(`api/user`, formData, config);
  };
export { getMyinfo,updateUserInfo };
