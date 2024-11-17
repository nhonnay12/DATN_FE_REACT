import axios from "../utils/AxiosCutomize";

import { getToken } from "./localStorageService";

const postAddToCart = (product_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  const data = { product_id: product_id };
  return axios.post("/api/cart/add", data, config);
};
const getAllCart = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  
  return axios.get("/api/cart", config);
};
export { postAddToCart, getAllCart };
