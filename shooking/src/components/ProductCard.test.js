import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/theme";
import { CartProvider } from "../context/CartContext";
import ProductCard from "./ProductCard";

// 함수의 두 번째 인자에 기본값으로 빈 객체를 할당합니다.
const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <CartProvider {...providerProps}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </CartProvider>,
    renderOptions
  );
};

const mockAddToCart = jest.fn();
jest.mock("../context/CartContext", () => ({
  ...jest.requireActual("../context/CartContext"),
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    brand: "테스트 브랜드",
    description: "이것은 테스트용 신발입니다.",
    price: 50000,
    image: "test-image.jpg",
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test("상품 정보(브랜드, 설명, 가격)가 올바르게 렌더링된다.", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText("테스트 브랜드")).toBeInTheDocument();
    expect(screen.getByText("이것은 테스트용 신발입니다.")).toBeInTheDocument();
    expect(screen.getByText("50,000원")).toBeInTheDocument();
  });

  test("담기 버튼을 클릭하면 addToCart 함수가 호출된다.", async () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button", { name: "담기" });
    await userEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
