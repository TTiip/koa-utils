import 'reflect-metadata'
import koaRouter from 'koa-router'
import { Methods } from './request'

const router = new koaRouter()

const CONTROLLER = (target: new (...args: any) => any) => {
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
			if (middleware) {
        // 给指定路由使用中间件。
        router.use(path, middleware)
        router[method](path, handler)
        // 第二种写法。
        // 猜测，中间件的本质也是一个函数，传入ctx对象。
        // router[method](path, middleware, handler)
      } else {
        router[method](path, handler)
      }
		}
	}
}

export {
	CONTROLLER,
	router
}
