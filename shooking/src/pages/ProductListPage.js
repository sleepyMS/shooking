// src/pages/ProductListPage.js

import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartModal from "../components/CartModal"; // CartModal 임포트

// 1. 더 큰 Mock 데이터 셋 (실제로는 API 서버에 있을 데이터)
const allProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  brand: `브랜드${String.fromCharCode(65 + Math.floor(i / 4))}`,
  description:
    i % 2 === 0 ? "편안하고 착용감이 좋은 신발" : "힙한 컬러가 매력적인 신발",
  price: 25000 + ((i * 1000) % 15000),
  image: `https://picsum.photos/id/${i + 10}/500/500`,
}));

// 2. 가상 API 함수: 페이지 번호와 페이지당 아이템 수를 받아 데이터를 반환
const fetchProducts = (page, itemsPerPage = 8) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const newProducts = allProducts.slice(start, end);
      resolve({
        products: newProducts,
        hasMore: end < allProducts.length, // 불러올 데이터가 더 있는지 여부
      });
    }, 700); // 네트워크 딜레이 시뮬레이션
  });
};

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding: 0 20px 20px 20px;
`;

const TitleWrapper = styled.div`
  padding: 24px 0;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.text};
`;

const ProductCount = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.subText};
  margin: 0;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 16px;

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

const Loader = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.subText};
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // 모달 상태 추가

  const observerRef = useRef();

  const loadMoreProducts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { products: newProducts, hasMore: newHasMore } = await fetchProducts(
      page
    );
    setProducts((prev) => [...prev, ...newProducts]);
    setHasMore(newHasMore);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  }, [isLoading, page]);

  useEffect(() => {
    const currentObserverRef = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore, loadMoreProducts]);

  return (
    <PageContainer>
      <Header setIsCartModalOpen={setIsCartModalOpen} />
      <MainContent>
        <TitleWrapper>
          <PageTitle>신발 상품 목록</PageTitle>
          <ProductCount>
            현재 총 {allProducts.length}개의 상품이 있습니다.
          </ProductCount>
        </TitleWrapper>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>

        <div ref={observerRef}>
          {isLoading && <Loader>상품을 불러오는 중...</Loader>}
          {!hasMore && products.length > 0 && (
            <Loader>모든 상품을 불러왔습니다.</Loader>
          )}
        </div>
      </MainContent>
      {isCartModalOpen && (
        <CartModal onClose={() => setIsCartModalOpen(false)} />
      )}
    </PageContainer>
  );
};

export default ProductListPage;
