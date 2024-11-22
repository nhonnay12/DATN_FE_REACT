import { getToken } from "./localStorageService";
import axios from "../utils/AxiosCutomize";
const getProductPaging = (LIMIT_PRODUCT, pageNumber) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get(
    `/api/product/getProductPaging?pageSize=${LIMIT_PRODUCT}&pageNumber=${pageNumber}`,
    config
  );
};
const updateProduct = (product_id, formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
      "Content-Type": "multipart/form-data", // Đảm bảo định dạng là multipart
    },
  };

  const data = new FormData(); // Tạo đối tượng FormData
  // Thêm các trường vào FormData, chỉ thêm nếu giá trị hợp lệ
  if (formData.name) data.append("name", formData.name);
  if (formData.description) data.append("description", formData.description);
  if (formData.image) data.append("file", formData.image);
  if (formData.publisher) data.append("publisher_id", formData.publisher);
  if (formData.author) data.append("author_id", formData.author);
  if (formData.category) data.append("category_id", formData.category);
  if (formData.price) data.append("price", formData.price);
  if (formData.status) data.append("status", formData.status);

  return axios.put(`/api/product/update?id=${product_id}`, data, config);
};
const postProduct = (formData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
      "Content-Type": "multipart/form-data", // Đảm bảo định dạng là multipart
    },
  };

  const data = new FormData(); // Tạo đối tượng FormData
  // Thêm các trường vào FormData
  if (formData.name) data.append("name", formData.name);
  if (formData.description) data.append("description", formData.description);
  if (formData.image) data.append("file", formData.image);
  if (formData.publisher) data.append("publisher_id", formData.publisher);
  if (formData.author) data.append("author_id", formData.author);
  if (formData.category) data.append("category_id", formData.category);
  if (formData.price) data.append("price", formData.price);

  return axios.post("/api/product", data, config);
};


const deleteProduct = (product_id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };

  // Gửi yêu cầu DELETE với ID trong URL
  return axios.delete(`/api/product/delete/${product_id}`, config);
};

export { getProductPaging,deleteProduct, updateProduct, postProduct };
