import { Context } from 'koa'
import 'reflect-metadata'
import { controller, get } from './decorator'

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
}

export default LoginController