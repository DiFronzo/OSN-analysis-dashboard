export function queryString(params) {
	if (!params) {
		return '';
	}
  return `?${
		Object.keys(params)
		.map((p) => `${p}=${params[p]}`)
		.join('&')
	}`;
}