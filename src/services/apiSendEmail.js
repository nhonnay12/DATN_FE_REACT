import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";

const sendEmailProduct = (cartId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };

  // Gửi yêu cầu DELETE với ID trong URL
  return axios.post(`/api/v1/order/send-email?cartId=${cartId}`, {}, config);
};

export { sendEmailProduct};
