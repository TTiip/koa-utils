import 'reflect-metadata'
import koaRouter from 'koa-router'
import { Methods } from './request'

const router = new koaRouter()

const CONTROLLER = (prefix: string = '/') => {
	return (target: new (...args: any) => any) => {
		for (let key in target.prototype) {
			// 路由的地址
			const path: string = Reflect.getMetadata('path', target.prototype, key)
			// 请求类型
			const method: Methods = Reflect.getMetadata('method', target.prototype, key)
			// 路由的方法
			const handler: any = target.prototype[key]
			// 路由的中间件
			const middleware: () => Promise<any> = Reflect.getMetadata('middleware', target.prototype, key)
			if (path && method) {
				const prefixCoverPath = prefix === '/' ? path : `${prefix}${path}`
				if (middleware) {
					// 给指定路由使用中间件。
					router.use(prefixCoverPath, middleware)
					router[method](prefixCoverPath, handler)
					// 第二种写法。
					// 猜测，中间件的本质也是一个函数，传入ctx对象。
					// router[method](prefixCoverPath, middleware, handler)
				} else {
					router[method](prefixCoverPath, handler)
				}
			}
		}
	}
}

export {
	CONTROLLER,
	router
}
