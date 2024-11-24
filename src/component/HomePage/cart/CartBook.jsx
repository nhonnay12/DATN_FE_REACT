import { useData } from "../../DataContext";
import { useEffect, useState } from "react";
import "./CartBook.scss";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { deleteProductCart } from "../../../services/apiCartServices";
import { toast } from "react-toastify";
import { createOrder } from "../../../services/apiOrder";

const Item = ({ item, index, handleClickRemove }) => {
  const [previewImage, setPreViewImage] = useState("");
  useEffect(() => {
    if (item.product.images && item.product.images[0].imageData) {
      setPreViewImage(
        `data:image/jpeg;base64,${item.product.images[0]?.imageData}`
      );
    }
  }, [item]);

  return (
    <tr>
      <td className="cart-item-img">
        <img src={previewImage} alt="Product" className="img-cart" />
      </td>
      <td className="cart-item-detail">
        <div className="cart-book-nane">{item.product.name}</div>
        <div className="cart-book-authors-name">
          By: <span className="abc">{item.product.author?.name}</span>
        </div>
        <div className="cart-descriprion">{item.product.description}</div>
        <div className="cart-price">
          <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>Price:</span>
          <span style={{ padding: "2px 3px" }}> {item.product.price} VND</span>
        </div>
        <div className="cart-remove-item">
          <button
            className="remove-item"
            onClick={() => handleClickRemove(item.product.id)}
          >
            <FaTrashCan /> Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

const CartBook = () => {
  const navigate = useNavigate();
  const { listProductToCart, setCartCount, cartCount, fetchProductCart } =
    useData();

  const handleClickContinue = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const handleClickRemove = async (product_id) => {
    try {
      const response = await deleteProductCart(product_id);
      if (response.code === 200) {
        toast.success(response.result);
        setCartCount(cartCount - 1);
        fetchProductCart();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const handleClickOrder = () => {
    navigate("/order");
  };
  console.log(listProductToCart);

  return (
    <div className="book-to-cart">
      <div className="cart-title">
        <h2>
          {" "}
          Shopping Cart -{" "}
          {listProductToCart?.totalProducts
            ? `${listProductToCart.totalProducts} items`
            : "Loading..."}
        </h2>
      </div>
      <table className="table table-striped">
        <tbody>
          {listProductToCart?.cartItems &&
          listProductToCart.cartItems.length > 0 ? (
            listProductToCart.cartItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleClickRemove={handleClickRemove}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Giỏ hàng của bạn đang trống.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="cart-total-price">
        Total: {listProductToCart?.totalPrice} VND
      </div>
      <div className="continue-checkout-cart">
        <button className="btn-continue-shopping" onClick={handleClickContinue}>
          Continue shopping
        </button>
        <button className="btn-order" onClick={handleClickOrder}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartBook;
