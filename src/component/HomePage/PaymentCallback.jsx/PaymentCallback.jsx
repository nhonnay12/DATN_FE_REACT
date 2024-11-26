import { useEffect, useState, useRef } from "react";
import { updateStatusOrderPaymentSuccess } from "../../../services/apiOrder";
import { toast } from "react-toastify";
import {
  updateStatusCartItemPaymentSuccess,
  updateStatusCartPaymentSuccess,
} from "../../../services/api";
import { useData } from "../../DataContext";
import { sendEmailProduct } from "../../../services/apiSendEmail";

const PaymentCallback = () => {
  const [responseCode, setResponsecode] = useState("");
  const [vnp_TxnRef, setVnp_TxnRef] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const previousVnpTxnRef = useRef(""); // Lưu giá trị trước đó của vnp_TxnRef
  const orderId = localStorage.getItem("orderId");
  const { fetchProductCart, setCartCount } = useData();

  const [cartId, setCartId] = useState();
  const [email, setEmail] = useState("");

  // Lấy dữ liệu từ URL query
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const responsecode = queryParams.get("vnp_ResponseCode");
    const vnp_TxnRef1 = queryParams.get("vnp_TxnRef");
    const transactionId2 = queryParams.get("vnp_TransactionNo");

    setVnp_TxnRef(vnp_TxnRef1);
    setTransactionId(transactionId2);
    setResponsecode(responsecode);

    console.log("ResponseCode:", responsecode);
  }, []); // Chỉ chạy một lần khi component được mount

  // Gọi API khi vnp_TxnRef thay đổi
  useEffect(() => {
    const status = "COMPLETED";
    const statusCartItem = "PAID";

    if (
      responseCode === "00" &&
      vnp_TxnRef &&
      previousVnpTxnRef.current !== vnp_TxnRef
    ) {
      previousVnpTxnRef.current = vnp_TxnRef; // Cập nhật giá trị trước đó

      const callApis = async () => {
        try {
          // Gọi API cập nhật trạng thái cart trước
          const cartRes = await updateStatusCartPaymentSuccess(orderId, status);
          if (cartRes.code === 200) {
            console.log("API 1 - Cập nhật trạng thái cart thành công!");
            const newCartId = cartRes.result?.id;
            setCartId(newCartId); // Lưu cartId

            // Tiếp theo, gọi API cập nhật trạng thái cart item với cartId
            const cartItemRes = await updateStatusCartItemPaymentSuccess(
              newCartId,
              statusCartItem
            );
            if (cartItemRes.code === 200) {
              console.log("API 2 - Cập nhật trạng thái cart item thành công!");
            } else {
              toast.error("Có lỗi xảy ra khi cập nhật cart item.");
              return;
            }

            // Gọi API cập nhật trạng thái order
            const orderRes = await updateStatusOrderPaymentSuccess(
              orderId,
              vnp_TxnRef,
              transactionId
            );
            if (orderRes.code === 200) {
              console.log("API 3 - Cập nhật trạng thái order thành công!");
              toast.success("Thanh toán thành công!");
            } else {
              toast.error("Có lỗi xảy ra khi cập nhật order.");
              return;
            }

            // Gửi email thông báo
            const emailRes = await sendEmailProduct(newCartId);
            setEmail(emailRes.result?.email);

            // Xóa orderId khỏi localStorage
            localStorage.removeItem("orderId");
          } else {
            toast.error("Có lỗi xảy ra khi cập nhật cart.");
            return;
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
          toast.error("Lỗi khi gọi API.");
        }

        // Reset cart count và làm mới danh sách sản phẩm trong giỏ
        const newCartCount = 0;
        setCartCount(newCartCount);
        fetchProductCart();
      };

      callApis();
      const newCartCount = 0;
      setCartCount(newCartCount);
      fetchProductCart();
    }
  }, [
    responseCode,
    vnp_TxnRef,
    orderId,
    setCartCount,
    fetchProductCart,
    transactionId,
  ]);

  // Xử lý gửi lại email
  const handleResendEmail = async () => {
    if (!cartId) {
      toast.error("Không tìm thấy giỏ hàng để gửi email.");
      return;
    }

    try {
      const res = await sendEmailProduct(cartId);
      setEmail(res.result?.email);
      toast.success("Email đã được gửi lại thành công!");
    } catch (error) {
      toast.error("Lỗi khi gửi lại email.");
      console.error("Lỗi khi gửi lại email:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1300px",
        height: "500px",
        marginTop: "15px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative", // Đặt position là relative để chứa các phần tử con
      }}
    >
      <h3 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        Kết quả thanh toán
      </h3>
      <div style={{ marginBottom: "15px", fontSize: "16px", color: "#555" }}>
        <strong>Mã đơn hàng:</strong> {vnp_TxnRef}
      </div>
      <div
        style={{
          marginBottom: "20px",
          fontSize: "16px",
          color: "#555",
          display: "flex",
        }}
      >
        <strong>Thông báo: </strong>{" "}
        {responseCode === "00" ? (
          <div
            style={{
              color: "green",
              fontWeight: "bold",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              padding: "5px 10px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Thanh toán thành công
          </div>
        ) : (
          <div
            style={{
              color: "red",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              padding: "5px 10px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Thanh toán thất bại
          </div>
        )}
      </div>
      <div
        className="result-Email"
        style={{
          position: "absolute", // Dùng absolute để gắn vào vị trí bên trong div cha
          bottom: "10px", // Khoảng cách từ dưới cùng
          left: "50%", // Đặt ở giữa màn hình
          transform: "translateX(-50%)", // Căn giữa ngang
          display: "flex", // Dùng flex để căn chỉnh các phần tử bên trong
          alignItems: "center", // Căn giữa theo chiều dọc
          justifyContent: "center", // Căn giữa theo chiều ngang
        // Khoảng cách giữa các phần tử
          backgroundColor: "white", // Tùy chọn để thêm nền trắng cho dễ nhìn
          padding: "10px", // Thêm một chút padding để tạo không gian
          borderRadius: "5px", // Thêm border-radius để làm góc mềm mại
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Thêm bóng cho hộp thông báo
        }}
      >
        Sách của bạn đã được gửi tới: {email}
        Nếu bạn chưa nhận, có thể gửi lại email:{" "}
        <button
          onClick={handleResendEmail}
          style={{
            border: "1px solid #dcdcdc",
            height: "40px",
            width: "150px",
          }}
        >
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default PaymentCallback;
