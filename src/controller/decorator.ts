import koaRouter from 'koa-router'

const router = new koaRouter()

const enum Method {
	get = 'get',
	post = 'post',
	put = 'put',
	delete = 'delete'
}

const getRequestDecorator = (type: string) => {
	return (path: string) => {
		return (target: any, key: string) => {
			Reflect.defineMetadata('path', path, target, key)
			Reflect.defineMetadata('method', type.toLowerCase(), target, key)
		}
	}
}

const use = (middleware: (...arg: any) => void) => {
	return (target: any, key: string) => {
		Reflect.defineMetadata('middleware', middleware, target, key)
	}
}

// 生成多种请求类型
const get = getRequestDecorator('get')
const post = getRequestDecorator('post')
const put = getRequestDecorator('put')
const del = getRequestDecorator('delete')

const controller = (target: any) => {
	for (let key in target.prototype) {
		// 路由的地址
		const path = Reflect.getMetadata('path', target.prototype, key)
		// 请求类型
		const method: Method = Reflect.getMetadata('method', target.prototype, key)
		// 路由的方法
		const handler = target.prototype[key]
		// 路由的中间件
		const middleware = Reflect.getMetadata('middleware', target.prototype, key)
		if (path && method && handler) {
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
	get,
	post,
	put,
	del,
	use,
	controller,
	router
}
