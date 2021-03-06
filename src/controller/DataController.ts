import fs from 'fs'
import { resolve } from 'path'
import { Context } from 'koa'
import { getResponseData } from '../interface'
import { CONTROLLER, USE, GET } from '../decorator'

import { zhihuHotAnalyze } from '../analyzer'
import { Crowller } from '../crowller'
import { checkLogin } from '../middleware'
const writePath = resolve(__dirname, '../index.json')

const checkLogin1111 = (ctx: Context, next: () => Promise<any>): void => {
	console.log(111222333)
	next()
}

@CONTROLLER()
class DataController {
	@GET('/getData')
	@USE(checkLogin)
	@USE(checkLogin1111)
	async getData (ctx: Context) {
		const url: string = 'https://www.zhihu.com/billboard'

		const dell = new zhihuHotAnalyze(url)
		new Crowller(writePath, dell)
		ctx.body = getResponseData(true)
	}

	@GET('/showData')
	@USE(checkLogin)
	@USE(checkLogin1111)
	async showData(ctx: Context) {
		try {
			const result = fs.readFileSync(writePath, 'utf-8')
			ctx.body = getResponseData(JSON.parse(result))
		} catch (e) {
			ctx.body = getResponseData(false, '数据不存在')
		}
	}
}

export {
	DataController
}
