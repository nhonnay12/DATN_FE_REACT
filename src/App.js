import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import { Outlet } from "react-router-dom";
import { getAllCart } from "./services/apiCartServices";
import { toast } from "react-toastify";
import { getToken } from "./services/localStorageService";
import { DataProvider } from "./component/DataContext";
import Footer from "./component/Footer/Footer";
const App = () => {
  return (
    <DataProvider >
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="content-container">
          <Outlet/>
          {/* gọi là nested route là component đặc biệt giúp hiển thị các component con theo cấu trúc route lồng nhau  */}
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
    </DataProvider>
  );
};

export default App;
