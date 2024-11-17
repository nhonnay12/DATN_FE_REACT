import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCart } from "../services/apiCartServices";
import { getToken } from "../services/localStorageService";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [listProductToCart, setProductToCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState(() => getToken());

  useEffect(() => {
    const fetchProductCart = async () => {
      if (!token) {
        return;
      }
      try {
        const res = await getAllCart(token); // Đảm bảo rằng API được gọi với token
        console.log("API response:", res); // Log phản hồi từ API
        if (res) {
          setProductToCart(res);
          const totalProducts = res.totalProduct || 0;
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
    fetchProductCart();
  }, [token]);

  return (
    <DataContext.Provider
      value={{ listProductToCart, setProductToCart, cartCount, setCartCount }}
    >
      {children}
    </DataContext.Provider>
  );
};
