import { useEffect, useState } from "react";
import {
  getAllAuthors,
  getAllCategory,
  getAllPublisher,
  getProductWithPaginate,
  getProductWithPaginateAuthors,
  getProductWithPaginateCategory,
  getProductWithPaginatePublisher,
} from "../../../services/apiServices";
import SideBarUser from "../../Sidebar/SidebarUser";
import "./HomePage.scss";
import { toast } from "react-toastify";
import BookItem from "../bookitem-modalview/BookItem";
import ModalViewBook from "../bookitem-modalview/ModalViewBook";
import { useNavigate } from "react-router-dom";
import { getAllCart, postAddToCart } from "../../../services/apiCartServices";
import { getToken } from "../../../services/localStorageService";
import { useData } from "../../DataContext";
const HomePage = (props) => {
  const [show, setShow] = useState(false);

  const [listCategory, setCategory] = useState([]);
  const [listPublisher, setPubliser] = useState([]);
  const [listAuthors, setListAuthors] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  
  const { setListProduct, setPageCount } = useData();
  const LIMIT_PRODUCT = 12;

  const [productItem, setProductItem] = useState({});
  const token = getToken();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        // let res = await getAllCategory();
        // let res2 = await getAllPublisher();
        const [category, publisher, authors] = await Promise.all([
          getAllCategory(),
          getAllPublisher(),
          getAllAuthors(),
        ]);

        if (category.code === 200 && publisher.code === 200) {
          // Kiểm tra code nếu cần
          setCategory(category.result);
          setPubliser(publisher.result);
          setListAuthors(authors.result);
          // console.log(listCategory);
        } else {
          toast.error(category?.message || publisher?.message);
        }
      } catch (error) {
        toast.error(
          error.category?.message ||
            error.publisher?.message ||
            error.authors?.message ||
            "Error call api"
        );
        console.error("Failed to fetch user list:", error);
      }
    };
    fetchListCategory();
  }, []);

  const handleClickViewBook = (product) => {
    setShow(true);
    setProductItem(product);
  };

  // get with category
  const [category_id, setCategory_id] = useState(0);
  const [pageCountCategory, setPageCountCategory] = useState(1);
  const handleClickCategory = (category_id) => {
    setCategory_id(category_id);
    setPublisher_id(null);
    setAuthors_id(null);
    setCurrentPage(1);
    // setPageCountCategory(1);
  };
  useEffect(() => {
    if (category_id) {
      // Kiểm tra tránh gọi API khi khởi tạo lần đầu
      fetchProductCategory(pageCountCategory, LIMIT_PRODUCT, category_id);
    }
  }, [category_id]);
  // console.log(category_id);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductCategory = async (pageCountCategory) => {
    try {
      let res = await getProductWithPaginateCategory(
        pageCountCategory,
        LIMIT_PRODUCT,
        category_id
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
  const [publisher_id, setPublisher_id] = useState(0);
  const [pageNumberPublisher, setPageNumberPublisher] = useState(1);
  const handleClickPublisher = (publisher_id) => {
    // setPageNumberPublisher(1);
    setCurrentPage(1);
    setPublisher_id(publisher_id);
    setCategory_id(null);
    setAuthors_id(null);
  };

  useEffect(() => {
    if (publisher_id) {
      // Kiểm tra tránh gọi API khi khởi tạo lần đầu
      fetchProductPublisher(pageNumberPublisher, LIMIT_PRODUCT, publisher_id);
    }
  }, [publisher_id]);

  const fetchProductPublisher = async (pageNumberPublisher) => {
    try {
      let res = await getProductWithPaginatePublisher(
        pageNumberPublisher,
        LIMIT_PRODUCT,
        publisher_id
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

  const handleClickAuthors = (authors_id) => {
    // setPageNumberPublisher(1);
    setCurrentPage(1);
    setAuthors_id(authors_id);
    setCategory_id(null);
    setPublisher_id(null);
  };

  const [authors_id, setAuthors_id] = useState(0);
  useEffect(() => {
    if (authors_id) {
      // Kiểm tra tránh gọi API khi khởi tạo lần đầu
      fetchProductAuthors(pageNumberAuthors, LIMIT_PRODUCT, authors_id);
    }
  }, [authors_id]);

  // get authors
  const [pageNumberAuthors, setPageNumberAuthors] = useState(1);
  const fetchProductAuthors = async (pageNumberAuthors) => {
    try {
      let res = await getProductWithPaginateAuthors(
        pageNumberAuthors,
        LIMIT_PRODUCT,
        authors_id
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

  const { setCartCount } = useData();
  const handleClickAddToCart = async (product_id) => {
    // console.log(product_id);
    if (!token) {
      toast.info("Hãy đăng nhập để tham vào giỏ hàng!");
      navigator("/login");
      return;
    }
    // console.log(token);

    // add cart
    if (token) {
      try {
        let response = await postAddToCart(product_id);
        console.log("API response:", response);
        if (response.code === 200) {
            setCartCount((prevCount) => prevCount + 1);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        console.error("Error in try-catch:", error);
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
    
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
          handleClickPublisher={handleClickPublisher}
          listAuthors={listAuthors}
          handleClickAuthors={handleClickAuthors}
        />
      </div>
      <div className="homepage-content">
        <div className="list-book-item">
          <BookItem
            currentPage={currentPage}
            handleClickViewBook={handleClickViewBook}
            setCurrentPage={setCurrentPage}
            category_id={category_id}
            setCategory_id={setCategory_id}
            fetchListCategory={fetchProductCategory}
            setPageCountCategory={setPageCountCategory}
            fetchProductPublisher={fetchProductPublisher}
            publisher_id={publisher_id}
            setPublisher_id={setPublisher_id}
            handleClickAddToCart={handleClickAddToCart}
          />
        </div>
      </div>
      <ModalViewBook show={show} setShow={setShow} productItem={productItem} />
    </div>
  );
};
export default HomePage;
