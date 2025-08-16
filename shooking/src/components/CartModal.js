// src/components/CartModal.js

import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  width: 100%;
  max-width: 400px;
  height: 100%;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.subText};
`;

const CartItemsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: ${({ theme }) => theme.text};
`;

const ItemPrice = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  margin: 0;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const QuantityDisplay = styled.span`
  font-size: 14px;
  padding: 0 8px;
  color: ${({ theme }) => theme.text};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #dc3545;
`;

const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const TotalPrice = styled(PriceRow)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ffda00;
  color: #111111;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const EmptyCart = styled.div`
  text-align: center;
  margin-top: 50px;
  color: ${({ theme }) => theme.subText};
`;

const CartModal = ({ onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 100000 ? 0 : 3000;
  const finalAmount = subtotal + shippingFee;

  const handleCheckout = () => {
    navigate("/my-cards", {
      state: {
        cartItems,
        totalAmount: finalAmount,
      },
    });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>장바구니</ModalTitle>
          <CloseButton onClick={onClose}>
            <AiOutlineClose />
          </CloseButton>
        </ModalHeader>
        <CartItemsContainer>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.brand} />
                <ItemInfo>
                  <ItemName>{item.brand}</ItemName>
                  <ItemPrice>
                    {(item.price * item.quantity).toLocaleString()}원
                  </ItemPrice>
                </ItemInfo>
                <ItemActions>
                  <QuantityControl>
                    <QuantityButton onClick={() => decreaseQuantity(item.id)}>
                      <AiOutlineMinus />
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => increaseQuantity(item.id)}>
                      <AiOutlinePlus />
                    </QuantityButton>
                  </QuantityControl>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <AiOutlineClose />
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))
          ) : (
            <EmptyCart>장바구니가 비어있습니다.</EmptyCart>
          )}
        </CartItemsContainer>
        {cartItems.length > 0 && (
          <ModalFooter>
            <PriceRow>
              <span>상품 금액</span>
              <span>{subtotal.toLocaleString()}원</span>
            </PriceRow>
            <PriceRow>
              <span>배송비</span>
              <span>{shippingFee.toLocaleString()}원</span>
            </PriceRow>
            <TotalPrice>
              <span>총 결제 금액</span>
              <span>{finalAmount.toLocaleString()}원</span>
            </TotalPrice>
            <CheckoutButton onClick={handleCheckout}>
              {finalAmount.toLocaleString()}원 결제하기
            </CheckoutButton>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CartModal;
