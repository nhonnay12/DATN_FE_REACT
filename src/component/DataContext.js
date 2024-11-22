import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCart } from "../services/apiCartServices";
import { getToken } from "../services/localStorageService";
import { createOrder } from "../services/apiOrder";
import { useNavigate } from "react-router-dom";
import { getProductWithPaginate } from "../services/apiServices";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [listProductToCart, setProductToCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(() => getToken());
  const LIMIT_PRODUCT = 12;
  useEffect(() => {
    fetchProductCart();
  }, [token]);
  const fetchProductCart = async () => {
    if (!token) {
      return;
    }
    try {
      const res = await getAllCart(token); // Đảm bảo rằng API được gọi với token
      // console.log("API response:", res); // Log phản hồi từ API
      if (res) {
        setProductToCart(res.result);
        const totalProducts = res.result?.totalProducts || 0;
        console.log(res.result?.totalProducts);
        setCartCount(totalProducts);
      } else {
        setCartCount(0);
        console.error("API Error message:", res?.message);
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Failed to fetch product cart:", error);
      toast.error(error.res?.message || "Error call API");
    }
  };
  const [pageCount, setPageCount] = useState(1);
  const [listProduct, setListProduct] = useState([]);
  const [pageProductNumber, setPageProductNumber] = useState(1);
  useEffect(() => {
    const fetchListProduct = async () => {
      try {
        let res = await getProductWithPaginate(
          pageProductNumber,
          LIMIT_PRODUCT
        );
        if (res.code === 200) {
          setListProduct(res.result?.products);
          setPageCount(res.result?.totalPages);
          // console.log(">>>" , listProduct);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.res?.message || "Error call api");
        console.error("Failed to fetch user list:", error);
      }
    };
    fetchListProduct();
  }, [pageProductNumber]);

  return (
    <DataContext.Provider
      value={{
        listProductToCart,
        setProductToCart,
        cartCount,
        setCartCount,
        fetchProductCart,
        listProduct,
        pageCount,
        setPageProductNumber,
        setListProduct,
        setPageCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
