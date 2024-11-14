// import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { FaTachometerAlt, FaGem, FaRegLaughWink } from "react-icons/fa";
// import { BsArrowThroughHeartFill } from "react-icons/bs";
// import sidebarBg from "../../assets/bg2.jpg";
// import { GiSpellBook } from "react-icons/gi";
// import { MdDashboard } from "react-icons/md";
// import { Link } from "react-router-dom";

// const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
//   return (
//     <>
//       <Sidebar
//         // image={sidebarBg} // Đảm bảo đường dẫn ảnh đúng
//         // rtl={rtl}
//         collapsed={collapsed}
//         // toggled={toggled}
//         // onToggle={handleToggleSidebar}
//       >
//         <div
//           style={{
//             padding: collapsed ? "20px" : "20px 55px 20px 55px",
//             textTransform: "uppercase",
//             fontWeight: "bold",
//             fontSize: 14,
//             letterSpacing: "1px",
//             // color: "#fff", // Thêm màu chữ trắng để dễ đọc trên nền tối
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//             display: "flex", // Bố cục flexbox
//             alignItems: "center",
//           }}
//         >
//           <GiSpellBook size={"3em"} />
//           {!collapsed && (
//             <div>
//               Book Store
//             </div>
//           )}
//         </div>

//         <Menu iconShape="circle">
//           <MenuItem
//             icon={<MdDashboard />}
//             // suffix={<span className="badge red">Main</span>}
//             component={<Link to="/admin" />}
//           >
//             Dashboard
//           </MenuItem>
//           <MenuItem icon={<FaGem />}>Components</MenuItem>
//           <SubMenu
//             label="Manager"
//             suffix={<span className="badge yellow">3</span>}
//             icon={<FaRegLaughWink />}
//           >
//             <MenuItem component={<Link to="/admin/manage-users" />}>
//               Quản lí user
//             </MenuItem>
//             <MenuItem>Quản lí admin</MenuItem>
//             <MenuItem>Quản lí truyện </MenuItem>
//           </SubMenu>
//           <SubMenu label="Quản lí Menu" icon={<BsArrowThroughHeartFill />}>
//             <MenuItem>Menu 1</MenuItem>
//             <MenuItem>Menu 2</MenuItem>
//             <MenuItem>Menu 3</MenuItem>
//           </SubMenu>
//         </Menu>
//       </Sidebar>
//     </>
//   );
// };

// export default SideBar;
