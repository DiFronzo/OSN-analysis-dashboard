import http from '../utils/http';

const getPieChartData = async (query, library) =>
  http.get(`/pie/${query}?library=${library}`);

const getLineChartData = async () => http.get('/line');

export default { getPieChartData, getLineChartData };
