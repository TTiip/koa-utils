import 'reflect-metadata'
import fs from 'fs'
import { resolve } from 'path'
import { Context } from 'koa'
import { getResponseData } from '../interface'
import { controller, get } from './decorator'

import { zhihuHotAnalyze } from '../analyzer'
import { Crowller } from '../crowller'
const writePath = resolve(__dirname, '../index.json')

@controller
class DataController {
	@get('/getData')
	async getData (ctx: Context) {
		const url: string = 'https://www.zhihu.com/billboard'

		const dell = new zhihuHotAnalyze(url)
		new Crowller(writePath, dell)
		ctx.body = getResponseData(true)
	}

	@get('/showData')
	async showData(ctx: Context) {
		try {
			const result = fs.readFileSync(writePath, 'utf-8')
			ctx.body = getResponseData(JSON.parse(result))
		} catch (e) {
			ctx.body = getResponseData(false, '数据不存在')
		}
	}
}

export default DataController
