function getQueryParamString(query) {
  return `?${Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')}`;
}

export default getQueryParamString;
