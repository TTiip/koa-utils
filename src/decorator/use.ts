import 'reflect-metadata'

const USE = (middleware: (...arg: any) => void) => {
	return (target: any, key: string) => {
		const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
		Reflect.defineMetadata('middlewares', [...originMiddlewares, middleware], target, key)
	}
}

export {
	USE
}
