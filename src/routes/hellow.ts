import { Hono } from 'hono';

const hellow = new Hono();

hellow.get('/', (c) => c.json({ message: 'API Root' }));
hellow.get('/world', (c) => c.text('hellow world'));

export default hellow;
