const get = (path: string) => {
	return function (target: any, key: string) {
		Reflect.defineMetadata('path', path, target, key)
	}
}

const controller = (target: any) => {
	for (let key in target.prototype) {
		console.log(Reflect.getMetadata('path', target.prototype, key))
	}
}

export {
	get,
	controller
}
