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
  handleClickAuthors,
  listAuthors,
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
          <SubMenu
            label="Tác giả"
            icon={<BsArrowThroughHeartFill />}
            className="submenu-author"
            defaultOpen={true}
          >
            {listAuthors.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleClickAuthors(item.id)}
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
