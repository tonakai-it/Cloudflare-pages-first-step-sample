import { Hono } from 'hono';
import hellow from './hellow'
import productRouter from './product';

const router = new Hono();

// ルート定義
router.route('/hellow', hellow);
router.route('/product', productRouter)

export default router;