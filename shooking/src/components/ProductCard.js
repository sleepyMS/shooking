import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Brand = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  margin: 0 0 12px 0;
  flex-grow: 1;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.text};
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.name} />
      <InfoContainer>
        <Brand>{product.brand}</Brand>
        <Description>{product.description}</Description>
        <Price>{product.price.toLocaleString()}원</Price>
        <AddToCartButton onClick={() => addToCart(product)}>
          담기
        </AddToCartButton>
      </InfoContainer>
    </CardContainer>
  );
};

export default ProductCard;
