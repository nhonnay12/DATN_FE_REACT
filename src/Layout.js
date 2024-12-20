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
import Order from "./component/HomePage/order/Order.jsx";
import PaymentCallback from "./component/HomePage/PaymentCallback.jsx/PaymentCallback.jsx";
import ManagerProduct from "./component/Admin/Content/PRODUCT/ManageProduct.jsx";
import ManageProduct from "./component/Admin/Content/PRODUCT/ManageProduct.jsx";
import OrderHistory from "./component/HomePage/order/OrderHistory.jsx";
import ManageOrder from "./component/Admin/Content/MANEGE ORDER/ManageOrder.jsx";
import CategoryManagement from "./component/Admin/Content/CATEGORY/ManageCategory.jsx";
import AuthorManagement from "./component/Admin/Content/Author/AuthorManagement.jsx";
import PublisherManagement from "./component/Admin/Content/Publisher/PublisherManagement.jsx";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="profile" element={<User />}></Route>
          <Route path="cart" element={<CartBook />}></Route>
          <Route path="order" element={<Order />}></Route>
          <Route path="payment-callback" element={<PaymentCallback />}></Route>
          <Route path="orderhistory" element={<OrderHistory />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<ManageProduct />}></Route>
          <Route path="manage-users" element={<ManageUser />}></Route>
          <Route path="manage-order" element={<ManageOrder />}></Route>
          <Route path="manage-category" element={<CategoryManagement />}></Route>
          <Route path="manage-author" element={<AuthorManagement />}></Route>
          <Route path="manage-publisher" element={<PublisherManagement />}></Route>
          {/* <Route path="manage-users" element={<ManageUser />}></Route> */}
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
