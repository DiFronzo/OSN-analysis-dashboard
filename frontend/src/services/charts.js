import http from '../utils/http';

const getPieChartData = async (query) => http.get(`/pie/${query}`);

const getLineChartData = async () => http.get('/line');

export default { getPieChartData, getLineChartData };
