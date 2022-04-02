
import { getResponseData } from '../interface'
import { Context } from 'koa'

const checkLogin = (ctx: Context, next: () => Promise<any>): void => {
  const isLogin: boolean = !!(ctx.session ? ctx.session.login : false)
  if (isLogin) {
    next()
  } else {
    ctx.body = getResponseData(null, '请先登录')
  }
}

export {
  checkLogin
}
