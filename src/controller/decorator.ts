import koaRouter from 'koa-router'

const router = new koaRouter()

const enum Method {
	get = 'get',
	post = 'post'
}

const getRequestDecorator = (type: string) => {
	return (path: string) => {
		return (target: any, key: string) => {
			Reflect.defineMetadata('path', path, target, key)
			Reflect.defineMetadata('method', type.toLowerCase(), target, key)
		}
	}
}
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
		if (path && method && handler) {
			router[method](path, handler)
		}
	}
}

export {
	get,
	post,
	put,
	del,
	controller,
	router
}
