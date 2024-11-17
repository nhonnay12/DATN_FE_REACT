import index from "toastify";
import { useData } from "../../DataContext";
import { useEffect, useState } from "react";
import "./CartBook.scss";
const Item = ({ item, index }) => {
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
      <td className="cart-item-deatail">
        <div className="cart-book-nane">{item.product.name}</div>
        <div className="cart-book-authors-name">
          By: <span className="abc">{item.product.authors[0]?.name}</span>
        </div>
        <div className="cart-descriprion">
          Description: {item.product.description}
        </div>
        <div className="cart-price">Price: {item.product.description}</div>
      </td>
    </tr>
  );
};
const CartBook = (props) => {
  const { listProductToCart } = useData();
  return (
    <div className="book-to-cart">
      <div className="cart-title">
        <h2>Shopping Cart - {listProductToCart.totalProduct} items</h2>
      </div>
      <table className="table table-striped">
        <tbody>
          {listProductToCart.cartItems &&
            listProductToCart.cartItems.map((item) => (
              <Item key={item.id} item={item} />
            ))}
        </tbody>
      </table>
      <div className="cart-total-price">
        {" "}
        Total: {listProductToCart.totalPrice} VND
      </div>

      <div className="continue-checkout-cart">
        <button className="btn-continue-shopping">Continue shopping</button>
        <button className="btn-payment">Thanh toan</button>
      </div>
    </div>
  );
};
export default CartBook;
