import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";
const createOrder = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  const data = {
    firstname: "",
    lastname: "",
    country: "",
    address: "",
    town: "",
    state: "",
    email: "",
    phone: "",
    note: "",
    paymentmethod: "VNPAY",
    status: "PENDING",
  };
  return axios.post("/api/v1/order", data, config);
};
const updateStatusOrder = (orderId, responseCode) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.post(
    `/api/v1/order?orderId=${orderId}&responseCode=${responseCode}`,
    config
  );
};
const updateStatusOrderPaymentSuccess = (
  orderId,
  vnp_TxnRef,
  transactionId
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
      "Content-Type": "application/json", // Dùng application/json thay vì multipart/form-data
    },
  };

  // Truyền tham số qua URL thay vì dùng FormData
  return axios.put(
    `/api/v1/order?orderId=${orderId}&vnp_TxnRef=${vnp_TxnRef}&transactionId=${transactionId}`,
    {},
    config
  );
};
const getHistotyOrder = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
      //"Content-Type": "application/json", // Dùng application/json thay vì multipart/form-data
    },
  };

  // Truyền tham số qua URL thay vì dùng FormData
  return axios.get("/api/v1/order/history", config);
};

export {
  createOrder,
  updateStatusOrder,
  updateStatusOrderPaymentSuccess,
  getHistotyOrder,
};
