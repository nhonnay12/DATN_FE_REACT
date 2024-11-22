import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";
const getvnpay = (amount) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get(
    `api/v1/payment/vn-pay?amount=${amount}&bankCode=NCB`,
    config
  );
};
const getVnpayCallback = (vnp_ResponseCode) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get(
    `api/v1/payment/vn-pay-callback?vnp_ResponseCode =${vnp_ResponseCode}`,
    config
  );
};
export { getvnpay, getVnpayCallback };
