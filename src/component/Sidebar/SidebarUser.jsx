import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaGem, FaRegLaughWink } from "react-icons/fa";
import { BsArrowThroughHeartFill } from "react-icons/bs";
import sidebarBg from "../../assets/bg2.jpg";
import { GiSpellBook } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../services/apiServices";

const SideBarUser = ({
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  listCategory,
  listPublisher,
  handleClickCategory,
  handleClickPublisher,
  setSelectedCategoryId,
}) => {
  // const listCategory = async() =>{
  //   let res = await getAllCategory();
  // console.log(res)
  // console.log(collapsed);

  return (
    <>
      <Sidebar
        // image={sidebarBg} // Đảm bảo đường dẫn ảnh đúng
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
      >
        {/* <div
          style={{
            padding: collapsed ? "20px" : "20px 55px",
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
          <GiSpellBook size={"3em"} />
          {!collapsed && (
            <div >
              Book Store
            </div>
          )}
        </div> */}

        <Menu iconShape="circle">
          <SubMenu
            label="Thể loại"
            // suffix={<span className="badge yellow"></span>}
            icon={<FaRegLaughWink />}
            defaultOpen={true}
            className="submenu-category"
          >
            {listCategory.map((category, index) => (
              <MenuItem key={index} onClick={() => handleClickCategory(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu
            label="Nhà xuất bản"
            icon={<BsArrowThroughHeartFill />}
            className="submenu-publisher"
            defaultOpen={true}
          >
            {listPublisher.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleClickPublisher(item.id)}
              >
                {item.name}
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBarUser;
