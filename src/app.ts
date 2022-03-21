import Koa from 'koa'
import { router } from './routers'

const port = 3000
const app = new Koa()

;[
  router.routes(),
  router.allowedMethods()
].map(item => app.use(item))

app.listen(port, () => console.log(`----- serve start at port ${port} -----`))
