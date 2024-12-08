import { Hono } from 'hono'
import { renderer } from './renderer'
import router from './routes';

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.route('/', router)

export default app
