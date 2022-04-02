import 'reflect-metadata'

const enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete'
}

const requestDecorator = (type: Methods) => {
	return (path: string) => {
		return (target: any, key: string) => {
			Reflect.defineMetadata('path', path, target, key)
			Reflect.defineMetadata('method', type.toLowerCase(), target, key)
		}
	}
}

// 生成多种请求类型
const GET = requestDecorator(Methods.GET)
const POST = requestDecorator(Methods.POST)
const PUT = requestDecorator(Methods.PUT)
const DELETE = requestDecorator(Methods.DELETE)

export {
	Methods,
	GET,
	POST,
	PUT,
	DELETE
}
