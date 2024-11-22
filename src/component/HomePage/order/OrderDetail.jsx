import { useState, useEffect } from "react";
import vnpay from "../../../assets/vnpay.png";
import { toast } from "react-toastify";
import { getvnpay } from "../../../services/apiVNPAY";
const OrderDetail = ({ listOrderToCart }) => {
  const [clickMethodPayment, setClickMethodPayment] = useState(false);

  const handleClickMethod = () => {
    setClickMethodPayment(true);
  };

  const handleClickPayment = async(amount) => {
    if (clickMethodPayment) {
        try {
        let response = await getvnpay(amount);
        if (response.code === 200) {
       // Chuyển hướng người dùng đến trang thanh toán VNPay
        window.location.href = response.result.paymentUrl;
        } else {
        toast.error (response.message);
        }
        } catch (lỗi) {
        console.error ("Lỗi khi thêm sản phẩm vào giỏ hàng:", lỗi);
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
        }
        
       } else {
        toast.warning("Chọn phương thức thanh toán");
        }
        };       
  return (
    <div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px ",
          borderTop: "1px solid #dcdcdc",
          borderBottom: "1px solid #dcdcdc",
        }}
      >
        <span>eBook</span>
        <span>Price</span>
      </div>
      {listOrderToCart?.cart?.cartItems &&
      listOrderToCart.cart.cartItems.map((item, index) =>(
        <div
          key={index}
          className="order-detail"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderTop: "1px solid #dcdcdc",
            borderBottom: "1px solid #dcdcdc",
          }}
        >
          <span
            style={{
              color: "#4181c3",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {item.product.name}
          </span>
          <span>{item.product.price} VND</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "10px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Total: </span>
        &nbsp; {listOrderToCart.totalPrice} VND
      </div>
      <div>
        <div className="title-pay">Chọn phương thức thanh toán</div>
        <div
          className="method-payment"
          style={{
            border: "1px solid #dcdcdc",
            borderRadius: "5px",
            padding: "15px",
            backgroundColor: clickMethodPayment ? "#dcdcdc" : "transparent",
          }}
          onClick={handleClickMethod}
        >
          <img
            src={vnpay}
            alt="VNPAY"
            style={{ width: "30px", height: "30px", borderRadius: "5px" }}
          />
          Thanh toán qua VNPAY
        </div>
      </div>
      <div
        className="div-btn-payment"
        onClick={() => handleClickPayment(listOrderToCart.totalPrice)}
      >
        <button className="btn-request-payment">Tiếp tục</button>
      </div>
    </div>
  );
};

export default OrderDetail;
