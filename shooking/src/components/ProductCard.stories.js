// src/components/ProductCard.stories.js

import React from "react";
import ProductCard from "./ProductCard";
import { CartProvider } from "../context/CartContext";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter 임포트

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <CartProvider>
          <Story />
        </CartProvider>
      </BrowserRouter>
    ),
  ],
};

const Template = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    id: 1,
    brand: "나이키",
    description: "편안한 착용감의 런닝화",
    price: 85000,
    image: "https://picsum.photos/id/1/500/500",
  },
};

export const Over100k = Template.bind({});
Over100k.args = {
  product: {
    id: 2,
    brand: "아디다스",
    description: "최신 트렌드의 스니커즈",
    price: 120000,
    image: "https://picsum.photos/id/2/500/500",
  },
};
