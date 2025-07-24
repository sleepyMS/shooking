// shooking/src/context/CardContext.js
import React, { createContext, useState, useContext } from "react";

const CardContext = createContext();

export const useCards = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [registeredCards, setRegisteredCards] = useState([]); // 등록된 카드 목록

  const addCard = (card) => {
    // 카드 추가 로직. 실제 앱에서는 백엔드에 저장 후 ID를 부여받음.
    // 여기서는 임시로 고유 ID를 부여
    setRegisteredCards((prevCards) => [
      ...prevCards,
      { ...card, id: Date.now() + Math.random() },
    ]);
  };

  const deleteCard = (id) => {
    setRegisteredCards((prevCards) =>
      prevCards.filter((card) => card.id !== id)
    );
  };

  // 필요하다면 카드 수정 등의 기능도 추가

  const value = {
    registeredCards,
    addCard,
    deleteCard,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
