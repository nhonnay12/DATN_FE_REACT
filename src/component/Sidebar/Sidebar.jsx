import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaRegLaughWink } from "react-icons/fa";
import { BsArrowThroughHeartFill } from "react-icons/bs";
import sidebarBg from "../../assets/bg2.jpg";
import { GiSpellBook } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ collapsed, rtl, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sidebar
        image={sidebarBg} // Đảm bảo đường dẫn ảnh đúng
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        <div
          style={{
            padding: collapsed ? "20px" : "20px 55px 20px 55px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            // color: "#fff", // Thêm màu chữ trắng để dễ đọc trên nền tối
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "flex", // Bố cục flexbox
            alignItems: "center",
          }}
          
        >
          <GiSpellBook size={"3em"} onClick={() => navigate("/")}/>
          {!collapsed && <div onClick={() => navigate("/")}>Book Store</div>}
        </div>

        <Menu iconShape="circle">
          <SubMenu
            label="Manager"
            suffix={<span className="badge yellow">3</span>}
            icon={<FaRegLaughWink />}
            defaultOpen="true"
          >
            <MenuItem component={<Link to="/admin/manage-users" />}>
              Quản lí người dùng
            </MenuItem>
            <MenuItem component={<Link to="/admin" />}>Quản lí truyện</MenuItem>
            <MenuItem component={<Link to="/admin/manage-order" />}>Quản lí đơn hàng</MenuItem>
            <MenuItem component={<Link to="/admin/manage-category" />}>Quản lí thể loại</MenuItem>
            <MenuItem component={<Link to="/admin/manage-author" />}>Quản lí tác giả</MenuItem>
            <MenuItem component={<Link to="/admin/manage-publisher" />}>Quản lí nhà cung cấp</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
