// shooking/src/pages/CardListPage.js
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useCards } from "../context/CardContext";
import CardImage from "../components/CardImage"; // 카드 이미지 재사용

// SubmitButton을 import 합니다. PaymentPage.js (혹은 AddCardPage.js)에 정의되어 있으므로 그곳에서 가져옵니다.
// PaymentPage.js에 SubmitButton이 정의되어 있지 않다면, 직접 정의하거나,
// App.js에서 PaymentPage와 AddCardPage 모두 공통적으로 사용한다면 styles/common.js 같은 곳에 빼는 것을 고려할 수 있습니다.
// 여기서는 임시로 AddCardPage.js에서 가져오거나, CardListPage.js 내에 정의합니다.
// AddCardPage.js에 정의된 SubmitButton이 현재 프로젝트에서 가장 적합하므로 AddCardPage.js에서 가져옵니다.
import { SubmitButton } from "./AddCardPage"; // AddCardPage에서 SubmitButton 임포트

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
  max-width: 300px; /* 카드 이미지 크기와 유사하게 */
  min-height: 180px; /* 카드 이미지 높이와 유사하게 */
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
  max-width: 300px; /* 카드 이미지와 동일한 너비 */
`;

const RegisteredCardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DeleteButton = styled.button`
  // 'DeleteButton'은 현재 사용되지 않습니다.
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #dc3545; /* 빨간색 */
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

const CardListPage = () => {
  const navigate = useNavigate();
  const { registeredCards, deleteCard } = useCards(); // 'deleteCard'는 현재 사용되지 않습니다.

  const handleAddCardClick = () => {
    navigate("/add-card");
  };

  const handleClose = () => {
    navigate("/"); // X 버튼 클릭 시 홈으로 이동 (또는 이전 페이지)
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <TitleWrapper>
          보유카드
          <CloseButton onClick={handleClose}>X</CloseButton>
        </TitleWrapper>

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
                {/* 필요하다면 여기도 카드 이미지처럼 꾸밀 수 있음 */}
                {/* <DeleteButton onClick={() => deleteCard(card.id)}>X</DeleteButton> */}
              </RegisteredCardWrapper>
            ))}
            {/* "이 카드 사용하기" 버튼 추가 - 디자인안에 있음 */}
            {registeredCards.length > 0 && (
              <SubmitButton
                style={{ backgroundColor: "#ffda00", color: "#111" }}
                onClick={() => alert("이 카드를 사용합니다.")}
              >
                이 카드 사용하기
              </SubmitButton>
            )}
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
