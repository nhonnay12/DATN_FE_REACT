import "./App.css";
import Header from "./component/Header/Header";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        {/* <div className="sidenav-container"></div> */}
        <div className="content-container">
          <Outlet />
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
    </div>
  );
};

export default App;
