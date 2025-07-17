import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

// 이미지와 같은 상품 데이터를 임시로 생성합니다.
const products = [
  {
    id: 1,
    brand: "브랜드A",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "브랜드A",
    description: "힙한 컬러가 매력적인 신발",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    brand: "브랜드B",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ff412d7?w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    brand: "브랜드B",
    description: "힙한 컬러가 매력적인 신발",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    brand: "브랜드C",
    description: "편안하고 착용감이 좋은 신발",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    brand: "브랜드C",
    description: "힙한 컬러가 매력적인 신발",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop",
  },
];

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

  /* Mobile (기본) */
  grid-template-columns: repeat(2, 1fr);

  /* Tablet */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
`;

const ProductListPage = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <TitleWrapper>
          <PageTitle>신발 상품 목록</PageTitle>
          <ProductCount>
            현재 {products.length}개의 상품이 있습니다.
          </ProductCount>
        </TitleWrapper>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </MainContent>
    </PageContainer>
  );
};

export default ProductListPage;
