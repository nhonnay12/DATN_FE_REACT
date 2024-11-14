import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import DashBoard from "./component/Admin/Content/Dashboard";
import ManageUser from "./component/Admin/Content/ManageUser";
import Login from "./component/Auth/Login/Login";
import Signup from "./component/Auth/Signup/Signup";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./component/HomePage/HomePage";
import {  Routes, Route } from "react-router-dom";
import App from "./App";

const Layout = () => {
  return <>
     <Routes>
      <Route path="/" element={<App />}>
        {/* index là định nghĩa route mặc định */}
        <Route index element={<HomePage />}></Route>
        <Route path="users" element={<User />}></Route>
      </Route>
      {/* <Route path="/" element={<HomePage />}></Route> */}
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
  </>;
};
export default Layout;
