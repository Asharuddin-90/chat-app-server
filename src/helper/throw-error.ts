export const throwError = (status: any, error?: string, errorCode?: string) => {
	throw {
		status: status,
		...(error ? { error: error } : {}),
		...(errorCode ? { errorCode: errorCode } : {})
	}
}
