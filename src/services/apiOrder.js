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
const updateStatusOrder = ( orderId, responseCode) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.post(`/api/v1/order?orderId=${orderId}&responseCode=${responseCode}`, config);
};

export { createOrder,updateStatusOrder };
