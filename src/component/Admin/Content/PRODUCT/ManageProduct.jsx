import React, { useState, useEffect } from "react";
import { getProductPaging } from "../../../../services/apiProduct";
import { toast } from "react-toastify";
import "./ManageProduct.scss";
import ReactPaginate from "react-paginate";

import EditProductModal from "./Edit/ModalEditProduct";
import ModalDeleteProduct from "./delete/ModalDelete";
import CreateProduct from "./Create/ModalCreateProduct";
import { FcSearch } from "react-icons/fc";
import axios from "axios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const LIMIT_PRODUCT = 7;
  const [showDelete, setShowDelete] = useState(false);
  const fetchProducts = async (pageNumber = 1) => {
    try {
      let res = await getProductPaging(LIMIT_PRODUCT, pageNumber);
      if (res.code === 200) {
        setProducts(res.result.products);
        setPageCount(res.result?.totalPages);
      } else {
        toast.warning(res?.message);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts(1); // Tải trang đầu tiên
  }, []);

  const handlePageClick = (e) => {
    const pageNumber = e.selected + 1;
    fetchProducts(pageNumber);
  };
  const [showAdd, setShowAdd] = useState(false);
  const handleAddProduct = () => {
    setShowAdd(true);
  };
  const [product, setProduct] = useState({});
  const handleEditProduct = (product) => {
    setProduct(product);
    setShowModalEdit(true);
  };

  const handleDeleteProduct = (product) => {
    setProduct(product);
    setShowDelete(true);
  };
  const [searchValue, setSearchValue] = useState("");
  // Hàm loại bỏ dấu và chuyển thành chữ thường
  const removeDiacritics = (str) => {
    // Sử dụng normalize để chuyển thành dạng không dấu, sau đó thay thế các dấu
    return str
      .normalize("NFD") // Chuyển thành dạng NFD (dấu sẽ tách riêng)
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu (các dấu này là phần Unicode của dấu)
      .toLowerCase() // Chuyển tất cả thành chữ thường
      .trim(); // Loại bỏ khoảng trắng thừa
  };
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
            size: 8, // Số lượng kết quả mỗi trang
          },
        }
      );
      if (response && response.data.content?.length > 0) {
        // Nếu có sản phẩm, cập nhật danh sách sản phẩm
        setProducts(response.data.content);
        setPageCount(response.data.content?.totalPages);
        setSearchValue(""); 
      } else {
        // Nếu không có sản phẩm, hiển thị thông báo "Not Found"
        // setListProduct([]); // Clear danh sách sản phẩm
        console.log(response.data.content);
        toast.error("Không tìm thấy sản phẩm nào"); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi trong quá trình tìm kiếm:", error); // Xử lý lỗi nếu có
      toast.error("Đã có lỗi trong quá trình tìm kiếm.");
    }
  };
  return (
    <div className="manage-product">
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1.8em",
          fontWeight: "bold",
        }}
      >
        Quản lí sách
      </div>
      <div
        className="manage-admin-content"
       // style={{ padding: " 0px 10px", borderCollapse: "collapse" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="find-book"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input
              type="text"
              placeholder="Search for book..."
              value={searchValue} // Lấy giá trị từ state
              onChange={(e) => setSearchValue(e.target.value)} // Cập nhật state khi người dùng nhập
              style={{
                width: "300px",
                padding: "8px 12px",
                fontSize: "16px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #007bff")} // Highlight on focus
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")} // Remove highlight on blur
            />
            <button
              onClick={handleSearchClick}
              style={{
                backgroundColor: "#007bff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")} // Hover effect
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")} // Reset hover effect
            >
              <FcSearch size={20} />
            </button>
          </div>
          <div>
            <button
              onClick={handleAddProduct}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #dcdcdc",
                backgroundColor: "rgb(0, 123, 255)",
                marginRight:"10px",
              }}
            >
              Add Product
            </button>
          </div>
        </div>
        <table
          className="table table-hover"
          border="1"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td className="description">{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td>{product.author.name}</td>
                <td>{product.publisher.name}</td>
                <td>
                  <td>{product.status ? "Active" : "Inactive"}</td>
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleEditProduct(product)}
                    style={{ marginRight: "10px" }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product)}
                    style={{ marginRight: "10px" }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="product-paginate"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ReactPaginate
          // previousLabel
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
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
          //forcePage={props.currentPage - 1}
        />
      </div>
      <EditProductModal
        show={showModalEdit}
        setShow={setShowModalEdit}
        product={product}
        fetchProducts={fetchProducts}
        //fetchListUserWithPaginate={fetchListUserWithPaginate}
        //currentPage={currentPage}
        //setCurrentPage={setCurrentPage}
      />
      <ModalDeleteProduct
        show={showDelete}
        setShow={setShowDelete}
        fetchProducts={fetchProducts}
        product={product}
      />
      <CreateProduct
        show={showAdd}
        setShow={setShowAdd}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default ManageProduct;
