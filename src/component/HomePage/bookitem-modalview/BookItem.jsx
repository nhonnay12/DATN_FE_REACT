import "./BookItem.scss";
import _ from "lodash";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useData } from "../../DataContext";
const CardItem = ({ product, handleClickViewBook, handleClickAddToCart }) => {
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(product)) {
      if (product.images && product.images.length > 0) {
        setPreviewImage(
          `data:image/jpeg;base64,${product.images[0]?.imageData}`
        );
      }
    }
  }, [product]);
  return (
    <div className="book-item">
      <img
        src={previewImage}
        alt="Book picture"
        className="img-book-item cursor"
        onClick={() => handleClickViewBook(product)}
      />
      <h3
        className="book-name cursor"
        onClick={() => handleClickViewBook(product)}
      >
        {product.name}
      </h3>
      <p
        className="book-name-authors cursor"
        onClick={() => handleClickViewBook(product)}
      >
        {product.author && product.author.name}
      </p>
      <p
        className="book-price cursor"
        onClick={() => handleClickViewBook(product)}
      >
        {product.price} đ
      </p>
      <button
        className="btn-add-cart"
        onClick={() => handleClickAddToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
};
const BookItem = (props) => {
  const {
    handleClickViewBook,
    fetchListCategory,
    setCurrentPage,
    handleClickAddToCart,
  } = props;
  const { listProduct, pageCount, setPageProductNumber } = useData();
  // Chia listProduct thành các nhóm 4 sản phẩm
  const groupedProducts = [];
  for (let i = 0; i < listProduct.length; i += 4) {
    groupedProducts.push(listProduct.slice(i, i + 4));
  }
  const handleChangeNumberPage = (e) => {
    setCurrentPage(+e.selected + 1);
    // props.setPageCountCategory(+e.selected + 1)
    if (props.category_id) {
      fetchListCategory(+e.selected + 1);
      props.setPublisher_id(0);
    }
    if (props.publisher_id) {
      props.fetchProductPublisher(+e.selected + 1);
      props.setCategory_id(0);
    } else {
      setPageProductNumber(+e.selected + 1);
    }
  };
  return (
    <div className="book-container">
      {groupedProducts.map((group, index) => (
        <div className={`book-trending ${index} book-resize`} key={index}>
          {group.map((product, productIndex) => (
            <CardItem
              key={productIndex}
              product={product}
              handleClickViewBook={handleClickViewBook}
              handleClickAddToCart={handleClickAddToCart}
            />
          ))}
        </div>
      ))}
      <div className="user-paginate">
        <ReactPaginate
          // previousLabel
          onPageChange={handleChangeNumberPage} // handle
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
          forcePage={props.currentPage - 1}
        />
      </div>
    </div>
  );
};
export default BookItem;
