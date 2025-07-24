// shooking/src/context/CartContext.js

import React, { createContext, useState, useContext } from "react";

// Context 생성
const CartContext = createContext();

// 다른 컴포넌트에서 Context를 쉽게 사용하기 위한 커스텀 훅
export const useCart = () => useContext(CartContext);

// Context Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // 실제 쇼핑몰이라면 수량 증가 로직 등이 필요하지만, 여기서는 단순히 배열에 추가합니다.
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
