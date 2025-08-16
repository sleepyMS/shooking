// src/context/CartContext.js

import React, { createContext, useState, useContext } from "react";

// Context 생성
const CartContext = createContext();

// 다른 컴포넌트에서 Context를 쉽게 사용하기 위한 커스텀 훅
export const useCart = () => useContext(CartContext);

// Context Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 상품을 추가하는 함수 (수량 조절 기능 추가)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // 이미 있는 상품이면 수량만 증가
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 없는 상품이면 새로 추가 (수량 1로 초기화)
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 장바구니에서 상품을 삭제하는 함수
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // 상품의 수량을 증가시키는 함수
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 상품의 수량을 감소시키는 함수
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
