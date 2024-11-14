import { useState } from "react";
import SideBar from "../Sidebar/Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
          <div className="title">Manage User</div>
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
      {/* <ToastContainer
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
      /> */}
    </div>
  );
};
export default Admin;
