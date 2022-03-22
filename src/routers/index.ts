import fs from 'fs'
import { resolve } from 'path'
import { getResponseData } from '../interface'
import { Context } from 'koa'
import koaRouter from 'koa-router'

import { DellAnalyzer } from '../analyzer'
import { Crowller } from '../crowller'

const router = new koaRouter()

const writePath = resolve(__dirname, '../index.json')

router.get('/', async (ctx: Context) => {
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
})

router.post('/login', async (ctx: Context) => {
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
})

router.get('/getData', async (ctx: Context) => {
	const url: string = 'https://www.zhihu.com/billboard'

	const dell = new DellAnalyzer(url)
	new Crowller(writePath, dell)
	ctx.body = getResponseData(true)
})

router.get('/showData', async (ctx: Context) => {
	try {
		const result = fs.readFileSync(writePath, 'utf-8')
		ctx.body = getResponseData(JSON.parse(result))
	} catch (e) {
		ctx.body = getResponseData(false, '数据不存在')
	}
})

export {
	router
}
