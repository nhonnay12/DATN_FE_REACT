import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { getToken } from "../../../services/localStorageService";
import { getHistotyOrder } from "../../../services/apiOrder";

const OrderHistory = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await getHistotyOrder();
        if (response.code === 200) {
          setOrder(response?.result);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error Order history:", error);
        toast.error("Error Order history");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchOrderHistory();
    }
  }, [token]);

  // Tính tổng tiền đã mua từ tất cả các đơn hàng
  const totalAmount = orders.reduce(
    (total, order) => total + order.totalOrderPrice,
    0
  );

  // Hàm để hiển thị chi tiết đơn hàng khi bấm vào
  const handleOrderClick = (order) => {
    setSelectedOrder(order === selectedOrder ? null : order);
  };

  return (
    <Box
      p={3}
      style={{ position: "relative", minHeight: "calc(100vh - 80px)" }}
    >
      <Typography variant="h4" gutterBottom>
        Lịch sử mua hàng
      </Typography>

      {loading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" ml={2}>
            Đang tải...
          </Typography>
        </Box>
      ) : orders.length === 0 ? (
        <Box style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            Bạn chưa có đơn hàng nào
          </Typography>
        </Box>
      ) : (
        orders.map((order, index) => (
          <Box key={index} mb={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                Ngày đặt hàng: {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Phương thức thanh toán: {order.paymentMethod}
              </Typography>
              <Typography variant="body1">
                Tổng tiền: {order.totalOrderPrice}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleOrderClick(order)}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {selectedOrder === order ? "Ẩn chi tiết" : "Xem chi tiết"}
              </Button>
            </Box>

            {selectedOrder === order && (
              <TableContainer component={Paper} mt={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Sản phẩm</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Số lượng</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Giá</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Link tải</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.details.map((detail, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{detail.productName}</TableCell>
                        <TableCell>{detail.quantity}</TableCell>
                        <TableCell>
                          {detail.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            href={detail.linkDrive}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tải về
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}


            {/* Box tổng tiền sẽ luôn ở dưới cùng của màn hình */}
      <Box
        style={{
          marginTop:"20px",
          position: "absolute", 
          bottom: 20,
          right: 20,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 999,
        }}
      >
        <Typography variant="h6" style={{}}>
          Tổng tiền đã mua:{" "}
          {totalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Typography>
      </Box>
          </Box>
        ))
      )}

      
    </Box>
  );
};

export default OrderHistory;
