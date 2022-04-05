import http from '../utils/http';

const getRawData = async () => {
  try {
    return await http.get(`/raw_data`);
  } catch (err) {
    return err;
  }
};

const getPieData = async () => {
  try {
    return await http.get(`/pie`);
  } catch (err) {
    return err;
  }
};

export default { getRawData, getPieData };
