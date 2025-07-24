import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CustomThemeProvider, useTheme } from "./context/ThemeContext";
import { CardProvider } from "./context/CardContext"; // CardProvider 임포트

import ProductListPage from "./pages/ProductListPage";
import CardListPage from "./pages/CardListPage"; // CardListPage 임포트
import AddCardPage from "./pages/AddCardPage"; // AddCardPage 임포트

import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";

function AppContent() {
  const { themeMode } = useTheme();
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {/* 라우팅은 App 컴포넌트에서 처리하므로 여기서는 직접 렌더링하지 않음 */}
    </ThemeProvider>
  );
}

function App() {
  return (
    <CartProvider>
      <CustomThemeProvider>
        <CardProvider>
          {" "}
          {/* CardProvider 추가 */}
          <AppContent />{" "}
          {/* GlobalStyle과 ThemeProvider를 적용하기 위해 AppContent 유지 */}
          <BrowserRouter>
            <Routes>
              <Route path="/shooking" element={<ProductListPage />} />{" "}
              {/* 상품 목록 페이지 */}
              <Route path="/my-cards" element={<CardListPage />} />{" "}
              {/* 보유 카드 목록 페이지 */}
              <Route path="/add-card" element={<AddCardPage />} />{" "}
              {/* 카드 추가 페이지 */}
            </Routes>
          </BrowserRouter>
        </CardProvider>
      </CustomThemeProvider>
    </CartProvider>
  );
}

export default App;
