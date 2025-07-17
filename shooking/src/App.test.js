import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// IntersectionObserver를 제어할 수 있도록 Mocking을 수정합니다.
const setupIntersectionObserverMock = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

describe("App Integration Test", () => {
  test("상품을 장바구니에 담으면 헤더의 카운트가 1로 변경된다.", async () => {
    const mockIntersectionObserver = setupIntersectionObserverMock();
    render(<App />);

    // 1. Observer의 콜백을 수동으로 실행하여 상품 로딩을 트리거합니다.
    // act는 비동기 상태 업데이트가 모두 끝날 때까지 기다려줍니다.
    await act(async () => {
      // IntersectionObserver 생성자의 첫 번째 인자(콜백)를 가져옵니다.
      const observerCallback = mockIntersectionObserver.mock.calls[0][0];
      // isIntersecting: true를 전달하여 화면에 요소가 나타난 것처럼 시뮬레이션합니다.
      observerCallback([{ isIntersecting: true }]);
    });

    // 2. 상호작용: 첫 번째 상품의 '담기' 버튼 클릭
    // 이제 상품이 로드되었으므로 버튼을 찾을 수 있습니다.
    const addButtons = await screen.findAllByRole("button", { name: "담기" });
    await userEvent.click(addButtons[0]);

    // 3. 결과 확인: 헤더에 숫자 '1'이 포함된 뱃지가 나타나는지 확인
    const badge = await screen.findByText("1");
    expect(badge).toBeInTheDocument();
  });
});
