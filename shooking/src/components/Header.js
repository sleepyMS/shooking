// shooking/src/components/Header.js

import React from "react";
import styled from "styled-components";
import { BsCart2 } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end; /* 아이콘을 오른쪽으로 정렬 */
  align-items: center;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  position: sticky;
  top: 0;
  z-index: 20;
  gap: 20px; /* 아이콘 사이 간격 */
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartIcon = styled(BsCart2)`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const ThemeIcon = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
`;

const CartCountBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const Header = () => {
  const { cartItems } = useCart();
  const { themeMode, toggleTheme } = useTheme();
  const cartItemCount = cartItems.length;

  return (
    <HeaderContainer>
      <IconWrapper onClick={toggleTheme}>
        <ThemeIcon>{themeMode === "light" ? <FiMoon /> : <FiSun />}</ThemeIcon>
      </IconWrapper>
      <IconWrapper>
        <CartIcon />
        {cartItemCount > 0 && <CartCountBadge>{cartItemCount}</CartCountBadge>}
      </IconWrapper>
    </HeaderContainer>
  );
};

export default Header;
