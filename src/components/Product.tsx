import { FC, Suspense, use } from "hono/jsx"

async function SetTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Product {
  id: string;
  title: string;
  datetime: string;
  img_src: string;
};

const productDummyList:Product[] = [
  { id: "1", title: "Product 1", datetime: "2024-12-08T10:00:00", img_src: "/images/product1.jpg" },
  { id: "2", title: "Product 2", datetime: "2024-12-08T11:00:00", img_src: "/images/product2.jpg" },
  { id: "3", title: "Product 3", datetime: "2024-12-08T12:00:00", img_src: "/images/product3.jpg" },
  { id: "4", title: "Product 4", datetime: "2024-12-08T13:00:00", img_src: "/images/product4.jpg" },
  { id: "5", title: "Product 5", datetime: "2024-12-08T14:00:00", img_src: "/images/product5.jpg" },
  { id: "6", title: "Product 6", datetime: "2024-12-08T15:00:00", img_src: "/images/product6.jpg" },
  { id: "7", title: "Product 7", datetime: "2024-12-08T16:00:00", img_src: "/images/product7.jpg" },
  { id: "8", title: "Product 8", datetime: "2024-12-08T17:00:00", img_src: "/images/product8.jpg" },
  { id: "9", title: "Product 9", datetime: "2024-12-08T18:00:00", img_src: "/images/product9.jpg" },
  { id: "10", title: "Product 10", datetime: "2024-12-08T19:00:00", img_src: "/images/product10.jpg" }
];

async function fetchAllProductDataPromise() {
  await SetTimeout(1000);
  return productDummyList;
}
async function fetchProductDataPromise(productId: string) {
  await SetTimeout(100);
  return productDummyList.find(({id}) => productId===id)
}

const ProductDiv:FC<{productData:Product}> = ({productData}) => {
  const {id, title, datetime, img_src} = productData; 
  return (
    <div>
      <li>id: {id}</li>
      <li>title: {title}</li>
      <li>datetime: {datetime}</li>
      <li>img_src: {img_src}</li>
    </div>
  )
}

const ProductSuspenseMiddle:FC<
  {fetchedProductDataPromise: Promise<Product|undefined>}
> = ({fetchedProductDataPromise}) => {
    const fetchedProductData = use(fetchedProductDataPromise)
    if (fetchedProductData) {
      return (
        <ProductDiv productData={fetchedProductData}></ProductDiv>
      )
    } else {
      return (
        <div>Not Found.</div>
      )
    }
}

export const ShowProduct: FC<{
  productId: string,
  productData?: Product,
}> = ({productId, productData}) => {
  if (productData) {
    return <ProductDiv {...{productData}} />
  } else {
    const fetchedProductDataPromise = fetchProductDataPromise(productId);
    return (
      <Suspense fallback={<div>Loading</div>}>
        <ProductSuspenseMiddle {...{fetchedProductDataPromise}} />
      </Suspense>
    )
  }
}

const AllProductDiv:FC<{fetchedAllProductDataPromise:Promise<Product[]>}> = ({fetchedAllProductDataPromise}) => {
  const productDataList = use(fetchedAllProductDataPromise)
  return (
    <ol>
      {productDataList.map(({id, title, datetime, img_src})=>(
        <li style={{'border': 'black 1px solid'}}>
          <div>id: {id}</div>
          <div>title: {title}</div>
          <div>datetime: {datetime}</div>
          <div>img_src: {img_src}</div>
        </li>
      ))}
    </ol>
  )
}

export const AllProduct:FC = () => {
  const fetchedAllProductDataPromise = fetchAllProductDataPromise();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllProductDiv {...{fetchedAllProductDataPromise}}></AllProductDiv>
    </Suspense>
  )
}