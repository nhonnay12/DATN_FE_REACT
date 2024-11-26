
import axios from "../utils/AxiosCutomize";
import { getToken } from "./localStorageService";

const updateStatusCartPaymentSuccess = (orderId, status) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",  // Sử dụng json thay vì multipart/form-data
      },
    };
    return axios.put(`/api/cart?orderId=${orderId}&status=${status}`, {}, config);
  };
  
  const updateStatusCartItemPaymentSuccess = (cartId, status) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",  // Sử dụng json thay vì multipart/form-data
      },
    };
    return axios.put(`/api/cartItem?cartId=${cartId}&status=${status}`, {}, config);
  };
export { updateStatusCartItemPaymentSuccess,updateStatusCartPaymentSuccess };
