import axios from "../utils/AxiosCutomize";
import { getToken } from "./localStorageService";

const postCreateUser = (email, password, username, image, status, roles) => {
  // call api
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("userImage", image);
  data.append("status", status);
  data.append("roles", roles);

  return axios.post("api/user", data);
};
const getUserWithPaginate = (pageNumber, limit) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get(
    `api/user/getUserPaging?pageNumber=${pageNumber}&pageSize=${limit}`,
    config
  );
};
const getAllUser = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };
  return axios.get("api/user/getUserPaging", config);
};
const putUpdateUser = (username, image, role, status, id) => {
  // call api
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", image);
  data.append("role", role);
  data.append("status", status);
  data.append("id", id);
  return axios.put("api/user", data);
};
const deleteUser = (id) => {
  // Set up headers with Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
    },
  };

  // Call API with token and ID path variable
  return axios.delete(`/api/user/${id}`, config);
};
const getAllCategory = () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
  //   },
  // };
  return axios.get("/api/category/getall");
};
const getAllAuthors = () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
  //   },
  // };
  return axios.get("/api/author");
};
const getAllPublisher = () => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`, // Assuming Bearer token
  //   },
  // };
  return axios.get("/api/publisher/getall");
};

const getProductWithPaginate = (pageNumber, limit) => {
  return axios.get(
    `api/product/getProductPaging?pageNumber=${pageNumber}&pageSize=${limit}`
  );
};
const getProductWithPaginateCategory = (pageCountCategory, limit, category_id) => {
  return axios.get(
    `api/product/getProductWithCategory?pageNumber=${pageCountCategory}&pageSize=${limit}&category_id=${category_id}`
  );
};
const getProductWithPaginatePublisher = (pageCountPublisher, limit, publisher_id) => {
  return axios.get(
    `api/product/getProductWithPublisher?pageNumber=${pageCountPublisher}&pageSize=${limit}&publisher_id=${publisher_id}`
  );
};
const getProductWithPaginateAuthors = (pageNumberAuthors, limit, author_id) => {
  return axios.get(
    `api/product/getProductWithAuthors?pageNumber=${pageNumberAuthors}&pageSize=${limit}&author_id=${author_id}`
  );
};

export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  getAllCategory,
  getAllPublisher,
  getProductWithPaginate,
  getProductWithPaginateCategory,
  getProductWithPaginatePublisher,
  getProductWithPaginateAuthors,
  getAllAuthors,
};
