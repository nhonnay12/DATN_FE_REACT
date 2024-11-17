import User from "./component/User/User";
import Admin from "../src/component/Admin/Admin.jsx";
import DashBoard from "../src/component/Admin/Content/Dashboard.jsx";
import ManageUser from "../src/component/Admin/Content/ManageUser.jsx";
import Login from "./component/Auth/Login/Login";
import Signup from "./component/Auth/Signup/Signup";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./component/HomePage/home/HomePage.jsx";
import CartBook from "./component/HomePage/cart/CartBook.jsx";


const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          {/* index là định nghĩa route mặc định */}
          <Route index element={<HomePage />}></Route>
          <Route path="users" element={<User />}></Route>
          <Route path="cart" element={<CartBook />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />}></Route>
          <Route path="manage-users" element={<ManageUser />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default Layout;
