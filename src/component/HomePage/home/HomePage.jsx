import { useEffect, useState } from "react";
import {
  getAllCategory,
  getAllPublisher,
  getProductWithPaginate,
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
  const [pageCount, setPageCount] = useState(1);
  const [listCategory, setCategory] = useState([]);
  const [listPublisher, setPubliser] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [pageProductNumber, setPageProductNumber] = useState(1);
  const LIMIT_PRODUCT = 12;
  const [listProduct, setListProduct] = useState([]);
  const [productItem, setProductItem] = useState({});
  const token = getToken();
  const navigator = useNavigate();
  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        // let res = await getAllCategory();
        // let res2 = await getAllPublisher();
        const [category, publisher] = await Promise.all([
          getAllCategory(),
          getAllPublisher(),
        ]);

        if (category.code === 200 && publisher.code === 200) {
          // Kiểm tra code nếu cần
          setCategory(category.result);
          setPubliser(publisher.result);

          // console.log(listCategory);
        } else {
          toast.error(category?.message || publisher?.message);
        }
      } catch (error) {
        toast.error(
          error.category?.message ||
            error.publisher?.message ||
            "Error call api"
        );
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
  const handleClickViewBook = (product) => {
    setShow(true);
    setProductItem(product);
  };
  const [category_id, setCategory_id] = useState(0);
  const [pageCountCategory, setPageCountCategory] = useState(1);
  const handleClickCategory = (category_id) => {
    setCategory_id(category_id);
    setPublisher_id(null);
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
  const { listProductToCart, setProductToCart, cartCount, setCartCount } =
    useData();
  const handleClickAddToCart = async (product_id) => {
    // console.log(product_id);
    if (!token) {
      toast.info("Hãy đăng nhập để tham vào giỏ hàng!");
      navigator("/login");
      return;
    }
    console.log(token);

    if (token) {
      try {
        const response = await postAddToCart(product_id); // Giả sử đây là hàm gọi API thêm sản phẩm vào giỏ hàng
        if (response.code === 200) {
          if (
            response.result === "Sản phẩm đã được thêm vào giỏ hàng trước đó"
          ) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, chỉ thông báo
            toast.info(response.result); // Hiển thị thông báo thông tin cho người dùng
          } else {
            // Nếu thêm sản phẩm mới vào giỏ hàng thành công
            setCartCount((prevCount) => prevCount + 1); // Tăng số lượng sản phẩm trong giỏ hàng
            toast.success(response.result); // Hiển thị thông báo thành công
          }
        } else {
          // Nếu có lỗi từ phía backend, hiển thị thông báo lỗi
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
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
        />
      </div>
      <div className="homepage-content">
        <div className="list-book-item">
          <BookItem
            currentPage={currentPage}
            listProduct={listProduct}
            handleClickViewBook={handleClickViewBook}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
            category_id={category_id}
            setCategory_id={setCategory_id}
            fetchListCategory={fetchProductCategory}
            setPageCountCategory={setPageCountCategory}
            fetchProductPublisher={fetchProductPublisher}
            publisher_id={publisher_id}
            setPublisher_id={setPublisher_id}
            setPageProductNumber={setPageProductNumber}
            handleClickAddToCart={handleClickAddToCart}
          />
        </div>
      </div>
      <ModalViewBook show={show} setShow={setShow} productItem={productItem} />
    </div>
  );
};
export default HomePage;
