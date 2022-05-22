import http from '../utils/http';

const getData = async (query) => http.get(`/raw_data/${query}`);

export default { getData };
