interface Result {
	sucesss: boolean
	errMsg?: string
	data: any
}

const getResponseData = (data: any, errMsg?: string): Result => {
	if (errMsg) {
		return {
			sucesss: false,
			errMsg,
			data
		}
	}
	return {
		sucesss: true,
		data
	}
}

export {
	getResponseData
}
