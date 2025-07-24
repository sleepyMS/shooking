// shooking/src/components/CardImage.js
import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100%;
  max-width: 300px;
  aspect-ratio: 16 / 10;
  background-color: #333;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  font-family: monospace;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

const Chip = styled.div`
  width: 40px;
  height: 30px;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  border-radius: 5px;
  margin-bottom: 15px;
`;

const CardNumberDisplay = styled.div`
  font-size: 24px;
  letter-spacing: 2px;
  margin-bottom: 15px;
`;

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const CardHolderName = styled.div`
  text-transform: uppercase;
`;

const ExpiryDate = styled.div``;

const CardImage = ({ cardNumber, cardHolderName, expiryDate }) => {
  const cleanCardNumber = cardNumber.replace(/\D/g, ""); // 숫자만 남김
  let displayCardNumber = "";

  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      displayCardNumber += " "; // 4자리마다 공백
    }
    if (i < cleanCardNumber.length) {
      if (i < 8) {
        // 앞 8자리는 실제 숫자
        displayCardNumber += cleanCardNumber[i];
      } else {
        // 9번째 자리부터는 입력된 숫자를 •로 마스킹
        displayCardNumber += "•";
      }
    } else {
      // 아직 입력되지 않은 부분은 •로 채움 (플레이스홀더처럼)
      displayCardNumber += "•";
    }
  }

  return (
    <CardContainer>
      <Chip />
      <CardNumberDisplay>{displayCardNumber}</CardNumberDisplay>
      <CardInfoRow>
        <CardHolderName>{cardHolderName || "NAME"}</CardHolderName>
        <ExpiryDate>{expiryDate || "MM/YY"}</ExpiryDate>
      </CardInfoRow>
    </CardContainer>
  );
};

export default CardImage;
