// shooking/src/pages/AddCardPage.js

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import CardImage from "../components/CardImage";
import { useCards } from "../context/CardContext";

// 전체 페이지 컨테이너
const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 메인 콘텐츠 영역 (카드 이미지를 가운데 정렬하기 위해 flex 속성 추가)
const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
  padding-top: 50px;
`;

// 카드 추가 폼 컨테이너
const AddCardFormContainer = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  width: 100%;
  max-width: 500px;
  display: flex; /* 내부 요소 정렬을 위해 추가 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: center; /* 내부 요소 가운데 정렬 */
`;

const TitleWrapper = styled.div`
  width: 100%;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: 100%; /* 폼 컨테이너 내에서 너비를 100%로 설정 */
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #ffda00;
  }

  &::placeholder {
    color: ${({ theme }) => theme.subText};
  }
`;

// 카드 번호 입력 필드 스타일: type="text" 유지, 마스킹은 JS로 제어
const CardNumberInput = styled(Input).attrs({
  type: "text",
  inputMode: "numeric",
})`
  letter-spacing: 1px;
  text-align: left;
`;

const ExpiryCVCWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%; /* 폼 컨테이너 내에서 너비를 100%로 설정 */
`;

const ExpiryInput = styled(Input).attrs({
  type: "text",
  inputMode: "numeric",
  maxLength: "5", // MM/YY
})`
  flex: 1;
`;

const CVCInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CVCInputStyled = styled(Input).attrs({
  type: "password", // 보안 코드
  inputMode: "numeric",
  maxLength: "3", // 3자리로 고정 (디자인상 3점)
})`
  flex: 1;
  letter-spacing: 3px;
  text-align: center;
  font-family: "Times New Roman", serif;
  -webkit-text-security: disc;
  text-security: disc;
`;

const HelpIcon = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.subText};
  cursor: pointer;
  background-color: ${({ theme }) => theme.borderColor};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  position: relative;
  width: 100%; /* 폼 컨테이너 내에서 너비를 100%로 설정 */
`;

const PasswordDotInputWrapper = styled.div`
  flex: 0 0 calc(25% - 7.5px); /* 4개 요소가 대략 같은 너비를 가지도록 (gap 10px 고려) */
  max-width: 60px; /* 개별 박스 최대 너비 */
  height: 44px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: bold;
  position: relative;
  overflow: hidden;
`;

const ActualPasswordInput = styled.input.attrs({
  type: "password",
  inputMode: "numeric",
  maxLength: "1", // 각 입력 필드는 한자리만 받음
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0; /* 숨김 */
  cursor: text;
  font-size: 16px;
  text-align: center;
  -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.body} inset !important;
  -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
`;

const PasswordDotDisplay = styled.span`
  font-size: 30px;
  line-height: 1;
  transform: translateY(-2px);
`;

const StaticPasswordDotDisplay = styled.div`
  /* 테두리 없는 고정된 점을 위한 스타일 */
  flex: 0 0 calc(25% - 7.5px); /* flex 속성은 유지하여 정렬 맞춤 */
  max-width: 60px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px; /* 점 크기 */
  color: ${({ theme }) => theme.borderColor}; /* 점 색상 */
  line-height: 1;
  background-color: ${({ theme }) => theme.body}; /* 배경색 추가 */
`;

const CardHolderCounter = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.subText};
  position: absolute;
  right: 0;
  top: 0;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    background-color: ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.subText};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const AddCardPage = () => {
  const navigate = useNavigate();
  const { addCard } = useCards();

  // 실제 카드 번호는 숫자만 저장
  const [rawCardNumber, setRawCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState(["", ""]);

  const [errors, setErrors] = useState({});
  const passwordRefs = [useRef(null), useRef(null)];

  // 화면에 표시될 카드 번호 포맷팅 함수 (하이픈 추가 및 마스킹)
  const formatCardNumberForDisplay = (digits) => {
    let formatted = "";
    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      // 5번째, 9번째, 13번째 숫자 '앞'에 하이픈(-)을 추가
      if (i > 0 && (i === 4 || i === 8 || i === 12)) {
        formatted += "-";
      }
      // 9번째 자리(인덱스 8)부터는 • 문자로 마스킹
      if (i >= 8) {
        formatted += "•";
      } else {
        formatted += digit;
      }
    }
    return formatted;
  };

  // 카드 번호 입력 처리 핸들러 (입력/삭제를 판단하여 처리)
  const handleCardNumberChange = (e) => {
    const newDisplayedValue = e.target.value;
    const oldDisplayedValue = formatCardNumberForDisplay(rawCardNumber);

    // 백스페이스 등으로 문자가 삭제된 경우
    if (newDisplayedValue.length < oldDisplayedValue.length) {
      setRawCardNumber(rawCardNumber.slice(0, -1));
      return;
    }

    // 16자리 이상 입력 방지
    if (rawCardNumber.length >= 16) {
      return;
    }

    // 문자가 추가된 경우, 마지막 문자만 가져옴
    const addedChar = newDisplayedValue.slice(-1);

    // 추가된 문자가 숫자인 경우에만 rawCardNumber에 추가
    if (/^\d$/.test(addedChar)) {
      setRawCardNumber(rawCardNumber + addedChar);
    }
  };

  // 만료일 입력 핸들러 (MM/YY 포맷팅)
  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.slice(0, 4);

    let formatted = input;
    if (input.length > 2) {
      formatted = input.slice(0, 2) + "/" + input.slice(2);
    }
    setExpiryDate(formatted);
  };

  // 일반 입력 필드 핸들러
  const handleChange = (setter, maxLength) => (e) => {
    let value = e.target.value;
    if (maxLength) {
      value = value.slice(0, maxLength);
    }
    setter(value);
  };

  // 비밀번호 개별 숫자 입력 핸들러
  const handlePasswordDigitChange = (index) => (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const newPassword = [...password];
    newPassword[index] = value.slice(0, 1);

    setPassword(newPassword);

    if (value && index < passwordRefs.length - 1) {
      passwordRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      passwordRefs[index - 1].current.focus();
    }
  };

  // 유효성 검사 및 에러 업데이트
  useEffect(() => {
    const newErrors = {};

    if (rawCardNumber.length !== 16) {
      newErrors.cardNumber = "카드 번호는 16자리 숫자여야 합니다.";
    }

    const [monthStr, yearStr] = expiryDate.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "MM/YY 형식의 유효한 만료일을 입력하세요.";
    } else if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      newErrors.expiryDate = "만료일이 지났습니다.";
    }

    if (cardHolderName.length < 2 || cardHolderName.length > 30) {
      newErrors.cardHolderName = "카드 소유자 이름은 2~30자여야 합니다.";
    }

    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVC/CVV는 3자리 숫자여야 합니다.";
    }

    if (password[0].length !== 1 || password[1].length !== 1) {
      newErrors.password = "비밀번호 앞 2자리를 모두 입력하세요.";
    }

    setErrors(newErrors);
  }, [rawCardNumber, expiryDate, cardHolderName, cvc, password]);

  // 폼 제출 핸들러 (카드 등록)
  const handleAddCard = (e) => {
    e.preventDefault();

    const isValid =
      Object.values(errors).every((error) => !error) &&
      rawCardNumber.length === 16 &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate) &&
      cardHolderName.length >= 2 &&
      cardHolderName.length <= 30 &&
      /^\d{3}$/.test(cvc) &&
      password[0].length === 1 &&
      password[1].length === 1;

    if (isValid) {
      addCard({
        cardNumber: rawCardNumber, // 실제 숫자만 저장
        expiryDate,
        cardHolderName,
        cvc,
        password: password.join(""),
      });
      alert("카드가 성공적으로 등록되었습니다!");
      navigate("/my-cards");
    } else {
      alert(
        "입력되지 않았거나 올바르지 않은 정보가 있습니다. 에러 메시지를 확인해주세요."
      );
    }
  };

  // 모든 필드가 유효하고 에러가 없는 경우에만 버튼 활성화
  const isFormValid =
    Object.keys(errors).every((error) => !error) &&
    rawCardNumber.length === 16 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate) &&
    cardHolderName.length >= 2 &&
    cardHolderName.length <= 30 &&
    /^\d{3}$/.test(cvc) &&
    password[0].length === 1 &&
    password[1].length === 1;

  const handleClose = () => {
    navigate("/my-cards");
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <AddCardFormContainer>
          <TitleWrapper>
            카드 추가
            <CloseButton onClick={handleClose}>X</CloseButton>
          </TitleWrapper>
          <CardImage
            cardNumber={rawCardNumber} // CardImage에는 숫자만 전달
            cardHolderName={cardHolderName}
            expiryDate={expiryDate}
          />

          <form onSubmit={handleAddCard} style={{ width: "100%" }}>
            <FormGroup>
              <Label htmlFor="cardNumber">카드 번호</Label>
              <CardNumberInput
                id="cardNumber"
                value={formatCardNumberForDisplay(rawCardNumber)}
                onChange={handleCardNumberChange}
                placeholder="0000-0000-••••-••••"
              />
              {errors.cardNumber && (
                <ErrorMessage>{errors.cardNumber}</ErrorMessage>
              )}
            </FormGroup>

            <ExpiryCVCWrapper>
              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="expiryDate">만료일</Label>
                <ExpiryInput
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM / YY"
                />
                {errors.expiryDate && (
                  <ErrorMessage>{errors.expiryDate}</ErrorMessage>
                )}
              </FormGroup>
              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="cvc">보안 코드(CVC/CVV)</Label>
                <CVCInputWrapper>
                  <CVCInputStyled
                    id="cvc"
                    value={cvc}
                    onChange={handleChange(setCvc, 3)}
                    placeholder="•••"
                  />
                  <HelpIcon>?</HelpIcon>
                </CVCInputWrapper>
                {errors.cvc && <ErrorMessage>{errors.cvc}</ErrorMessage>}
              </FormGroup>
            </ExpiryCVCWrapper>

            <FormGroup style={{ position: "relative" }}>
              <Label htmlFor="cardHolderName">카드 소유자 이름</Label>
              <Input
                id="cardHolderName"
                value={cardHolderName}
                onChange={handleChange(setCardHolderName, 30)}
                placeholder="카드에 표시된 이름과 동일하게 입력하세요."
              />
              <CardHolderCounter>{cardHolderName.length}/30</CardHolderCounter>
              {errors.cardHolderName && (
                <ErrorMessage>{errors.cardHolderName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label>카드 비밀번호</Label>
              <PasswordInputContainer>
                <PasswordDotInputWrapper>
                  <PasswordDotDisplay>
                    {password[0] ? "•" : ""}
                  </PasswordDotDisplay>
                  <ActualPasswordInput
                    ref={passwordRefs[0]}
                    value={password[0]}
                    onChange={handlePasswordDigitChange(0)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !password[0] &&
                        passwordRefs[0].current
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </PasswordDotInputWrapper>
                <PasswordDotInputWrapper>
                  <PasswordDotDisplay>
                    {password[1] ? "•" : ""}
                  </PasswordDotDisplay>
                  <ActualPasswordInput
                    ref={passwordRefs[1]}
                    value={password[1]}
                    onChange={handlePasswordDigitChange(1)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !password[1] &&
                        passwordRefs[0].current
                      ) {
                        passwordRefs[0].current.focus();
                      }
                    }}
                  />
                </PasswordDotInputWrapper>
                {/* 테두리 없는 고정된 점을 위한 스타일드 컴포넌트 사용 */}
                <StaticPasswordDotDisplay>•</StaticPasswordDotDisplay>
                <StaticPasswordDotDisplay>•</StaticPasswordDotDisplay>
              </PasswordInputContainer>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={!isFormValid}>
              작성 완료
            </SubmitButton>
          </form>
        </AddCardFormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default AddCardPage;
