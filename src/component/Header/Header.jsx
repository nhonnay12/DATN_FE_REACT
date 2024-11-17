import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { GiSpellBook } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FcSearch } from "react-icons/fc";
import { useData } from "../DataContext";
const Header = (props) => {
  const { cartCount } = useData();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const handleLogin = () => {
    return navigate("/login");
  };
  const handleSignup = () => {
    return navigate("/signup");
  };
   console.log(cartCount);
  const handleClickCart = () => {
    navigate("/cart");
  };
  return (
    <>
      <div className="header-top">
        <a href="/" className="navbar-brand">
          <GiSpellBook size={"3em"} />
          <div className="books">Book Store</div>
        </a>
        <div className="find-book">
          <input type="text" placeholder="Tìm kiếm..." />
          <button>
            <FcSearch size={20} />
          </button>
        </div>
      </div>
      <div className="header-bottom">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            {/* <Navbar.Brand href="/">Book store</Navbar.Brand> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Users
                </NavLink>
                {userRole && userRole === "ADMIN" && (
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                )}
              </Nav>
              <Nav>
                {!userRole && (
                  <button className="btn-login" onClick={handleLogin}>
                    Log in
                  </button>
                )}
                {!userRole && (
                  <button className="btn-signup" onClick={handleSignup}>
                    {" "}
                    Sign up
                  </button>
                )}
                {userRole && (
                  <div className="cart-button" onClick={handleClickCart}>
                    <HiOutlineShoppingCart size={25} />{" "}
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}{" "}
                  </div>
                )}
                {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="login">Log in</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="logout">Log out</NavDropdown.Item>
              </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
