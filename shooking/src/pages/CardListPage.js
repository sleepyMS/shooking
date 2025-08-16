// src/pages/CardListPage.js

import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useCards } from "../context/CardContext";
import CardImage from "../components/CardImage";
import { SubmitButton } from "./AddCardPage";

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  min-height: 180px;
  border: 1px dashed ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  color: ${({ theme }) => theme.subText};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.cardBg};
  }
`;

const PlusIcon = styled.span`
  font-size: 40px;
  margin-bottom: 10px;
`;

const RegisteredCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 300px;
`;

const RegisteredCardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  z-index: 10;
`;

const PaymentSummaryContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const PaymentItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PaymentItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`;

const PaymentItemName = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.subText};
`;

const CardListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registeredCards, deleteCard } = useCards();

  const { totalAmount, cartItems, isDirectPurchase } = location.state || {};
  const isFromPayment = totalAmount !== undefined;

  const handleAddCardClick = () => {
    navigate("/add-card");
  };

  const handleClose = () => {
    if (isFromPayment) {
      navigate(-1);
    } else {
      navigate("/shooking");
    }
  };

  const handlePayment = (card) => {
    alert(
      `${totalAmount.toLocaleString()}원을 ${
        card.cardHolderName
      }님의 카드로 결제합니다.`
    );
    // 실제 결제 로직을 여기에 구현
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <TitleWrapper>
          {isFromPayment ? "결제하기" : "보유카드"}
          <CloseButton onClick={handleClose}>X</CloseButton>
        </TitleWrapper>

        {isFromPayment && (
          <PaymentSummaryContainer>
            {isDirectPurchase && cartItems && cartItems[0] && (
              <PaymentItemInfo>
                <PaymentItemImage
                  src={cartItems[0].image}
                  alt={cartItems[0].brand}
                />
                <PaymentItemName>
                  {cartItems[0].brand} {cartItems[0].description}
                </PaymentItemName>
              </PaymentItemInfo>
            )}
            <PaymentRow>
              <span>총 결제 금액</span>
              <span>{totalAmount.toLocaleString()}원</span>
            </PaymentRow>
          </PaymentSummaryContainer>
        )}

        {registeredCards.length === 0 ? (
          <EmptyStateContainer onClick={handleAddCardClick}>
            <PlusIcon>+</PlusIcon>
            새로운 카드를 등록해주세요.
          </EmptyStateContainer>
        ) : (
          <RegisteredCardList>
            {registeredCards.map((card) => (
              <RegisteredCardWrapper key={card.id}>
                <CardImage
                  cardNumber={card.cardNumber}
                  cardHolderName={card.cardHolderName}
                  expiryDate={card.expiryDate}
                />
                {isFromPayment ? (
                  <SubmitButton
                    style={{
                      backgroundColor: "#ffda00",
                      color: "#111",
                      marginTop: "10px",
                    }}
                    onClick={() => handlePayment(card)}
                  >
                    이 카드로 결제하기
                  </SubmitButton>
                ) : (
                  <DeleteButton onClick={() => deleteCard(card.id)}>
                    X
                  </DeleteButton>
                )}
              </RegisteredCardWrapper>
            ))}
            <EmptyStateContainer
              onClick={handleAddCardClick}
              style={{ marginTop: "20px" }}
            >
              <PlusIcon>+</PlusIcon>
            </EmptyStateContainer>
          </RegisteredCardList>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default CardListPage;
