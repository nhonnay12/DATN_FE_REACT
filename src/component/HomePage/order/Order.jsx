import "./Order.scss";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, updateStatusOrder } from "../../../services/apiOrder";
import { getVnpayCallback } from "../../../services/apiVNPAY";
import OrderDetail from "./OrderDetail.jsx";
import PaymentCallback from "../PaymentCallback.jsx/PaymentCallback";
import { toast } from "react-toastify";

const Order = () => {
  const [listOrderToCart, setListOrderToCart] = useState({});
  const [callback, setCallback] = useState(false);
  const [resultPaymentCallback, setResultPaymentCallback] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOrder = async () => {
      try {
        let response = await createOrder();
        if (response.code === 200) {
          toast.success(response.result);
          setListOrderToCart(response.result);
          navigate("/order");
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

  const handleVNPAYCallback = useCallback(async (vnp_ResponseCode) => {
    try {
      let response = await getVnpayCallback(vnp_ResponseCode);
      if (response.code === 200) {
        setResultPaymentCallback(response);
        if (listOrderToCart.id) {
          await updateStatusOrder(listOrderToCart.id, vnp_ResponseCode);
          setCallback(true);
        } else {
          toast.error("Không tìm thấy ID đơn hàng");
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during VNPay callback:", error);
      toast.error("Có lỗi xảy ra khi nhận phản hồi từ VNPay");
    }
  }, [listOrderToCart.id]); // Phụ thuộc vào listOrderToCart.id

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responsecode = urlParams.get("vnp_ResponseCode");
    if (responsecode) {
      handleVNPAYCallback(responsecode); // Gọi API khi có vnp_ResponseCode
    }
  }, [handleVNPAYCallback]); // Lắng nghe thay đổi của handleVNPAYCallback

  return (
    <div>
      <div style={{ padding: "10px" }}>
        {callback ? (
          <PaymentCallback resultPaymentCallback={resultPaymentCallback} />
        ) : (
          <OrderDetail listOrderToCart={listOrderToCart} />
        )}
      </div>
    </div>
  );
};

export default Order;
