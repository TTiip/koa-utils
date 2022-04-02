import 'reflect-metadata'
import { Context } from 'koa'
import { getResponseData } from '../interface'
import { controller, get, post } from './decorator'

@controller
class LoginController {
	@get('/')
	async home (ctx: Context) {
		const isLogin = ctx.session && ctx.session.login
		if (isLogin) {
			ctx.body = `
				<html>
					<body>
						<a href='/getData'>爬取内容</a>
						<a href='/showData'>展示内容</a>
						<a href='/logout'>退出</a>
					</body>
				</html>
			`
		} else {
			ctx.body = `
				<html>
					<body>
						<form method="post" action="/login">
							账号随意，密码123。
							<br/ >
							账号：<input type="text" name="password" />
							<br/ >
							密码：<input type="password" name="password" />
							<button>登陆</button>
						</form>
					</body>
				</html>
			`
		}
	}

	@post('/login')
	login(ctx: Context) {
		const isLogin = ctx.session && ctx.session.login
		const { password } = ctx.request.body

		if (isLogin) {
			ctx.body = getResponseData(false, '已经登陆过')
		} else {
			if (ctx.session) {
				if (password[1] === '123') {
					ctx.session.login = true
					ctx.session.userInfo = { name: password[0], password: password[1] }
					ctx.body = getResponseData(true)
				} else {
					ctx.body = getResponseData(false, '密码错误！')
				}
			} else {
				ctx.body = getResponseData(false, '登陆失败')
			}
		}
	}

	@get('/logout')
	logout(ctx: Context) {
		if (ctx.session) {
			ctx.session.userInfo = {}
			ctx.session.login = false
		}
		ctx.body = getResponseData(true)
	}
}

export default LoginController
