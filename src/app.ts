import Koa from 'koa'
import KoaSession from 'koa-session'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import { router } from './routers'

const port = 3000
const app = new Koa()

// 总结： 在加了router.allowedMethods()中间件情况下
// 如果接口是get请求，而前端使用post请求，会返回405 Method Not Allowed ，提示方法不被允许
// 并在响应头有添加允许的请求方式；而在不加这个中间件这种情况下，则会返回 404 Not Found找不到请求地址
// 并且响应头没有添加允许的请求方式

const session_signed_key = ['哈塞给']  // 这个是配合signed属性的签名key
const session_config = {
  key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 24 * 60 * 60 * 1000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
}

app.keys = session_signed_key

const session = KoaSession(session_config, app)

;[
  session, // session 相关信息 设置登陆时间等等
  // cors({ credentials: true }),
  cors(), // 允许跨域
  bodyParser(), // 解析 post 传递的参数，放到请求 body 里面， 必须写在路由前面！！！
  router.routes(), // 使用路由
  router.allowedMethods(), // 一定放在路由使用之后！！！ 此时根据ctx.status设置response响应头
].map(item => app.use(item))

app.listen(port, () => console.log(`----- serve start at port ${port} -----`))
