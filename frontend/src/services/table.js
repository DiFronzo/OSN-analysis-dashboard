import http from '../utils/http';

const getTableData = async (query) => http.get(`/raw_data/${query}`);

export default { getTableData };
