import 'reflect-metadata'

const USE = (middleware: (...arg: any) => void) => {
	return (target: any, key: string) => {
		Reflect.defineMetadata('middleware', middleware, target, key)
	}
}

export {
	USE
}
