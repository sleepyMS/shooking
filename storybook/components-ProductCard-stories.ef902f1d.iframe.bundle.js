"use strict";(self.webpackChunkshooking=self.webpackChunkshooking||[]).push([[675],{"./src/components/ProductCard.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Over100k:()=>Over100k,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ProductCard_stories});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CartContext=(0,react.createContext)(),CartProvider=_ref=>{let{children}=_ref;const[cartItems,setCartItems]=(0,react.useState)([]),value={cartItems,addToCart:product=>{setCartItems(prevItems=>prevItems.find(item=>item.id===product.id)?prevItems.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item):[...prevItems,{...product,quantity:1}])},removeFromCart:productId=>{setCartItems(prevItems=>prevItems.filter(item=>item.id!==productId))},increaseQuantity:productId=>{setCartItems(prevItems=>prevItems.map(item=>item.id===productId?{...item,quantity:item.quantity+1}:item))},decreaseQuantity:productId=>{setCartItems(prevItems=>prevItems.map(item=>item.id===productId?{...item,quantity:Math.max(1,item.quantity-1)}:item))}};return(0,jsx_runtime.jsx)(CartContext.Provider,{value,children})};CartProvider.__docgenInfo={description:"",methods:[],displayName:"CartProvider"};var chunk_EF7DTUVF=__webpack_require__("./node_modules/react-router/dist/development/chunk-EF7DTUVF.mjs");const CardContainer=styled_components_browser_esm.Ay.div`
  background-color: ${_ref=>{let{theme}=_ref;return theme.cardBg}};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`,ProductImage=styled_components_browser_esm.Ay.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`,InfoContainer=styled_components_browser_esm.Ay.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`,Brand=styled_components_browser_esm.Ay.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: ${_ref2=>{let{theme}=_ref2;return theme.text}};
`,Description=styled_components_browser_esm.Ay.p`
  font-size: 14px;
  color: ${_ref3=>{let{theme}=_ref3;return theme.subText}};
  margin: 0 0 12px 0;
  flex-grow: 1;
`,Price=styled_components_browser_esm.Ay.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: ${_ref4=>{let{theme}=_ref4;return theme.text}};
`,ButtonWrapper=styled_components_browser_esm.Ay.div`
  display: flex;
  gap: 8px;
`,AddToCartButton=styled_components_browser_esm.Ay.button`
  flex: 1;
  padding: 12px;
  background-color: ${_ref5=>{let{theme}=_ref5;return theme.buttonBg}};
  color: ${_ref6=>{let{theme}=_ref6;return theme.buttonText}};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`,PurchaseButton=(0,styled_components_browser_esm.Ay)(AddToCartButton)`
  background-color: #ffda00;
  color: #111111;
`,ProductCard=_ref7=>{let{product}=_ref7;const{addToCart}=(0,react.useContext)(CartContext),navigate=(0,chunk_EF7DTUVF.Zp)();return(0,jsx_runtime.jsxs)(CardContainer,{children:[(0,jsx_runtime.jsx)(ProductImage,{src:product.image,alt:product.name}),(0,jsx_runtime.jsxs)(InfoContainer,{children:[(0,jsx_runtime.jsx)(Brand,{children:product.brand}),(0,jsx_runtime.jsx)(Description,{children:product.description}),(0,jsx_runtime.jsxs)(Price,{children:[product.price.toLocaleString(),"원"]}),(0,jsx_runtime.jsxs)(ButtonWrapper,{children:[(0,jsx_runtime.jsx)(AddToCartButton,{onClick:()=>addToCart(product),children:"담기"}),(0,jsx_runtime.jsx)(PurchaseButton,{onClick:()=>{const shippingFee=product.price>=1e5?0:3e3,totalAmount=product.price+shippingFee;navigate("/my-cards",{state:{cartItems:[product],totalAmount,isDirectPurchase:!0}})},children:"구매"})]})]})]})},components_ProductCard=ProductCard;ProductCard.__docgenInfo={description:"",methods:[],displayName:"ProductCard"};const ProductCard_stories={title:"Components/ProductCard",component:components_ProductCard,decorators:[Story=>(0,jsx_runtime.jsx)(chunk_EF7DTUVF.Kd,{children:(0,jsx_runtime.jsx)(CartProvider,{children:(0,jsx_runtime.jsx)(Story,{})})})]},Template=args=>(0,jsx_runtime.jsx)(components_ProductCard,{...args}),Default=Template.bind({});Default.args={product:{id:1,brand:"나이키",description:"편안한 착용감의 런닝화",price:85e3,image:"https://picsum.photos/id/1/500/500"}};const Over100k=Template.bind({});Over100k.args={product:{id:2,brand:"아디다스",description:"최신 스타일의 스니커즈",price:12e4,image:"https://picsum.photos/id/2/500/500"}};const __namedExportsOrder=["Default","Over100k"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <ProductCard {...args} />",...Default.parameters?.docs?.source}}},Over100k.parameters={...Over100k.parameters,docs:{...Over100k.parameters?.docs,source:{originalSource:"args => <ProductCard {...args} />",...Over100k.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=components-ProductCard-stories.ef902f1d.iframe.bundle.js.map