import { Hono } from 'hono';
import productRouter from './product';

const router = new Hono();

// ルート定義
router.route('/product', productRouter);

export default router;