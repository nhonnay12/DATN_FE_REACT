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
  // const [token, setToken] = useState("");
  // setToken(getToken());
 
  // token , 
  // console.log("abcd");

  //console.log(cartCount);
  // const cartCount =
  //   listProductToCart && listProductToCart.cartItems
  //     ? listProductToCart.cartItems[0]?.totalProduct
  //     : 0;
  // console.log(listProductToCart);
//console.log(">>" , cartCount);

  return (
    <DataProvider >
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        {/* <div className="sidenav-container"></div> */}
        <div className="content-container">

          <Outlet/>
          {/* gọi là nested route là component đặc biệt giúp hiển thị các component con theo cấu trúc route lồng nhau  */}
        </div>
      </div>

      {/* <div>
        <button> 
          <Link to="users" > user page</Link>
        </button>
        <button > 
          <Link to="admin"> user page</Link>
        </button>
      </div> */}
    <div className="footer-container">
        <Footer />
      </div>
    </div>
    </DataProvider>
  );
};

export default App;
