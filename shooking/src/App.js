// src/App.js

import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CustomThemeProvider, useTheme } from "./context/ThemeContext";
import { CardProvider } from "./context/CardContext";

import ProductListPage from "./pages/ProductListPage";
import CardListPage from "./pages/CardListPage";
import AddCardPage from "./pages/AddCardPage";

import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";

function AppContent() {
  const { themeMode } = useTheme();
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {/* 라우팅은 App 컴포넌트에서 처리하므로 여기서는 직접 렌더링하지 않음 */}
      <BrowserRouter>
        <Routes>
          <Route path="/shooking" element={<ProductListPage />} />
          <Route path="/my-cards" element={<CardListPage />} />
          <Route path="/add-card" element={<AddCardPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CartProvider>
      <CustomThemeProvider>
        <CardProvider>
          <AppContent />
        </CardProvider>
      </CustomThemeProvider>
    </CartProvider>
  );
}

export default App;
