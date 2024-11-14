// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavLink, useNavigate } from "react-router-dom";

// const HeaderUser = () => {
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     return navigate("/login");
//   };
//   const handleClickSignup = ()=> {
//     return navigate("/signup")
//   }
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         {/* <Navbar.Brand href="/">Book store</Navbar.Brand> */}
//         <NavLink to="/home" className="navbar-brand">
//           Book store
//         </NavLink>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <NavLink to="/home" className="nav-link">
//               Home
//             </NavLink>
//             <NavLink to="/home/users" className="nav-link">
//               Users
//             </NavLink>
//             <NavLink to="/admin" className="nav-link">
//               Admin
//             </NavLink>
//           </Nav>
//           <Nav>
//             <button className="btn-login" onClick={handleLogin}>
//               Log in
//             </button>
//             <button className="btn-signup" onClick={handleClickSignup}> Sign up</button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default HeaderUser;
