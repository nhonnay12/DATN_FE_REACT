import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiSpellBook } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FcSearch } from "react-icons/fc";
import { useData } from "../DataContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import { setToken } from "../../services/localStorageService";
import { IoLogOutSharp } from "react-icons/io5";
import LogoutConfirmation from "./Logout";

const Header = (props) => {
  const { cartCount, fetchProductCart } = useData();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [searchValue, setSearchValue] = useState(""); // State để lưu giá trị tìm kiếm

  const handleLogin = () => {
    return navigate("/login");
  };

  const handleSignup = () => {
    return navigate("/signup");
  };

  const handleClickCart = () => {
    navigate("/cart");
    fetchProductCart();
  };

  // Hàm loại bỏ dấu và chuyển thành chữ thường
  const removeDiacritics = (str) => {
    // Sử dụng normalize để chuyển thành dạng không dấu, sau đó thay thế các dấu
    return str
      .normalize("NFD") // Chuyển thành dạng NFD (dấu sẽ tách riêng)
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu (các dấu này là phần Unicode của dấu)
      .toLowerCase() // Chuyển tất cả thành chữ thường
      .trim(); // Loại bỏ khoảng trắng thừa
  };
  const { setListProduct } = useData();

  const handleSearchClick = async () => {
    try {
      const normalizedSearchValue = removeDiacritics(searchValue); // Loại bỏ dấu của giá trị tìm kiếm

      // Gửi yêu cầu tìm kiếm đến backend
      const response = await axios.post(
        "http://localhost:8080/filter/page/0", // Endpoint API tìm kiếm
        {
          searchRequestDTO: [
            {
              column: "name", // Cột cần tìm kiếm (name ở đây)
              value: normalizedSearchValue, // Giá trị tìm kiếm sau khi loại bỏ dấu
              operation: "LIKE", // Toán tử tìm kiếm
            },
          ],
          globalOperator: "AND", // Kết hợp các điều kiện với toán tử AND
        },
        {
          params: {
            size: 10, // Số lượng kết quả mỗi trang
          },
        }
      );
      if (response && response.data.content?.length > 0) {
        // Nếu có sản phẩm, cập nhật danh sách sản phẩm
        setListProduct(response.data.content);
      } else {
        // Nếu không có sản phẩm, hiển thị thông báo "Not Found"
        // setListProduct([]); // Clear danh sách sản phẩm
        console.log(response.content);

        toast.error("Không tìm thấy sản phẩm nào"); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi trong quá trình tìm kiếm:", error); // Xử lý lỗi nếu có
      toast.error("Đã có lỗi trong quá trình tìm kiếm.");
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleClickLogout = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="header-top">
        <a href="/" className="navbar-brand">
          <GiSpellBook size={"3em"} />
          <div className="books">Book Store</div>
        </a>
        <div className="find-book">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue} // Lấy giá trị từ state
            onChange={(e) => setSearchValue(e.target.value)} // Cập nhật state khi người dùng nhập
          />
          <button onClick={handleSearchClick}>
            <FcSearch size={20} />
          </button>
        </div>
      </div>
      <div className="header-bottom">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                {userRole &&  (
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                )}
                {userRole && userRole === "ADMIN" && (
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                )}
                {userRole && (
                  <NavLink to="/orderhistory" className="nav-link">
                    Lịch sử mua hàng
                  </NavLink>
                )}
              </Nav>
              <Nav className="login-signup">
                {!userRole && (
                  <button className="btn-login" onClick={handleLogin}>
                    Log in
                  </button>
                )}
                {!userRole && (
                  <button className="btn-signup" onClick={handleSignup}>
                    Sign up
                  </button>
                )}
                {userRole && (
                  <div className="cart-button" onClick={handleClickCart}>
                    <HiOutlineShoppingCart size={25} />
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}
                  </div>
                )}
                {userRole && (
                  <div
                    className="btn-logout"
                    onClick={handleClickLogout}
                    style={{ marginRight: "30px" }}
                  >
                    <IoLogOutSharp size={30} />
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <LogoutConfirmation showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
};

export default Header;
