import { useEffect, useState } from "react";
import {
  getAllCategory,
  getAllPublisher,
  getProductWithPaginate,
  getProductWithPaginateCategory,
  getProductWithPaginatePublisher,
} from "../../services/apiServices";
import SideBarUser from "../Sidebar/SidebarUser";
import "./HomePage.scss";
import { toast } from "react-toastify";
import { Category } from "@mui/icons-material";
import CardItem from "./BookItem";
import BookItem from "./BookItem";
import ReactPaginate from "react-paginate";
import ModalViewBook from "./ModalViewBook";
const HomePage = (props) => {
  const [show, setShow] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [listCategory, setCategory] = useState([]);
  const [listPublisher, setPubliser] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [pageProductNumber, setPageProductNumber] = useState(1);
  const LIMIT_PRODUCT = 8;
  const [listProduct, setListProduct] = useState([]);
  const [productItem, setProductItem] = useState({});
  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        // let res = await getAllCategory();
        // let res2 = await getAllPublisher();
        const [res, res2] = await Promise.all([
          getAllCategory(),
          getAllPublisher(),
        ]);
        if (res.code === 200 && res2.code === 200) {
          // Kiểm tra code nếu cần
          setCategory(res.result);
          setPubliser(res2.result);
          // console.log(listCategory);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.res?.message || "Error call api");
        console.error("Failed to fetch user list:", error);
      }
    };
    fetchListCategory();
  }, []);

  useEffect(() => {
    const fetchListProduct = async () => {
      try {
        let res = await getProductWithPaginate(
          pageProductNumber,
          LIMIT_PRODUCT
        );
        if (res.code === 200) {
          setListProduct(res.result?.products);
          setPageCount(res.result?.totalPages);
          // console.log(">>>" , listProduct);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.res?.message || "Error call api");
        console.error("Failed to fetch user list:", error);
      }
    };
    fetchListProduct();
  }, [pageProductNumber]);

  const handleChangeNumberPage = (event) => {
    setPageProductNumber(+event.selected + 1);
  };
  const handleClickViewBook = (product) => {
    setShow(true);
    setProductItem(product);
  };
  const handleClickCategory = async (category_id) => {
    try {
      let res = await getProductWithPaginateCategory(pageProductNumber, LIMIT_PRODUCT, category_id);
      // console.log(category_id);
      if (res.code === 200) {
        setListProduct(res.result?.products);
        setPageCount(res.result?.totalPages);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error.res?.message || "Error call api");
      console.error("Failed to fetch user list:", error);
    }
  };
  const handleClickPublisher = async (publisher_id) => {
    try {
      let res = await getProductWithPaginatePublisher(pageProductNumber, LIMIT_PRODUCT, publisher_id);
      // console.log(category_id);
      if (res.code === 200) {
        setListProduct(res.result?.products);
        setPageCount(res.result?.totalPages);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error.res?.message || "Error call api");
      console.error("Failed to fetch user list:", error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="sidebar-homepage" style={{ left: 20 }}>
        <SideBarUser
          collapsed={collapsed}
          listCategory={listCategory}
          listPublisher={listPublisher}
          handleClickCategory={handleClickCategory}
          handleClickPublisher ={handleClickPublisher}
        />
      </div>
      <div className="homepage-content">
        <div className="list-book-item">
          <BookItem
            listProduct={listProduct}
            handleClickViewBook={handleClickViewBook}
          />
        </div>
        <div className="user-paginate">
          <ReactPaginate
            // previousLabel
            onPageChange={handleChangeNumberPage} // handle
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount} // handle
            previousLabel="< previous"
            pageClassName="page-item"
            nextLabel="next >"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item" // thêm vào đây
            nextLinkClassName="page-link" // thêm vào đây
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            // forcePage={props.currentPage - 1}
          />
        </div>
        <ModalViewBook
          show={show}
          setShow={setShow}
          productItem={productItem}
        />
      </div>
    </div>
  );
};
export default HomePage;
