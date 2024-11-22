import { toast } from "react-toastify";
import { getVnpayCallback } from "../../../services/apiVNPAY";
import { useEffect } from "react";

const PaymentCallback = ({ resultPaymentCallback }) => {
  return (
    <div
      style={{ width: "100%", height: "500px", border: "1px solid #dcdcdc" }}
    >
      {resultPaymentCallback.result?.code}
      {resultPaymentCallback.result?.message}
      Thanh toan thanh cong 
    </div>
  );
};
export default PaymentCallback;
