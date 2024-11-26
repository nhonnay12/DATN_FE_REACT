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

import { getallListOrder } from "../../../../services/apiOrder";
import { getToken } from "../../../../services/localStorageService";

const ManageOrder = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await getallListOrder();
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
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Lịch sử mua hàng
      </Typography>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
          <Typography variant="h6" ml={2}>
            Đang tải...
          </Typography>
        </Box>
      ) : orders.length === 0 ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="h6" color="textSecondary">
            Bạn chưa có đơn hàng nào
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>STT</strong>
                </TableCell>
                <TableCell>
                  <strong>Ngày đặt hàng</strong>
                </TableCell>
                <TableCell>
                  <strong>Phương thức thanh toán</strong>
                </TableCell>
                <TableCell>
                  <strong>Mã hóa đơn</strong>
                </TableCell>
                <TableCell>
                  <strong>Tổng tiền</strong>
                </TableCell>
                <TableCell>
                  <strong>Trạng thái</strong>
                </TableCell>
                <TableCell>
                  <strong>Hành động</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.maDonHang}</TableCell>
                    <TableCell>
                      {order.totalOrderPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOrderClick(order)}
                      >
                        {selectedOrder === order
                          ? "Ẩn chi tiết"
                          : "Xem chi tiết"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {selectedOrder === order && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <strong>STT</strong>
                              </TableCell>
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
                                <TableCell>{idx+1}</TableCell>
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
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageOrder;
