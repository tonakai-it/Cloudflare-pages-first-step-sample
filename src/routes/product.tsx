import { Hono } from 'hono';
import { AllProduct, ShowProduct } from '../components/Product';

const productRouter = new Hono();

productRouter.get('/', (c) => {
  return c.render(<AllProduct />)
});

productRouter.get('/:productId', (c) => {
  const { productId } = c.req.param();
  return c.render(<ShowProduct productId={productId} />)
});

export default productRouter;