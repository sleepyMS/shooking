import React from "react";
import { ThemeProvider } from "styled-components";
import { CartProvider } from "./context/CartContext";
import { CustomThemeProvider, useTheme } from "./context/ThemeContext";
import ProductListPage from "./pages/ProductListPage";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";

// 테마를 적용하고 페이지를 렌더링하는 컴포넌트
function AppContent() {
  const { themeMode } = useTheme();
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <ProductListPage />
    </ThemeProvider>
  );
}

function App() {
  return (
    <CartProvider>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </CartProvider>
  );
}

export default App;
