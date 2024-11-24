import "./Order.scss";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, updateStatusOrder } from "../../../services/apiOrder";
import { getVnpayCallback } from "../../../services/apiVNPAY";
import OrderDetail from "./OrderDetail.jsx";
// import PaymentCallback from "../PaymentCallback.jsx/PaymentCallback";
import { toast } from "react-toastify";
import PaymentCallback from "../PaymentCallback.jsx/PaymentCallback";
import { useData } from "../../DataContext.js";

const Order = () => {
  const [listOrderToCart, setListOrderToCart] = useState({});

  const navigate = useNavigate();
  console.log(listOrderToCart);

  useEffect(() => {
    const handleClickOrder = async () => {
      try {
        let response = await createOrder();
        if (response.code === 200) {
          toast.success(response.result);
          setListOrderToCart(response.result);
          navigate("/order");
          localStorage.setItem("orderId", response.result.id);        
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    };
    handleClickOrder();
  }, []); // Hàm này chỉ chạy một lần khi component mount


  return (
    <div>
      <div style={{ padding: "10px" }}>
        <OrderDetail listOrderToCart={listOrderToCart} />
      </div>
    </div>
  );
};

export default Order;
