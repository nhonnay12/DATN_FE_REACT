import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";
const getAllCategory = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get("/api/category/getall", config);
};
export{getAllCategory}