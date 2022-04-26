import http from '../utils/http';

const getRawData = async () => {
  try {
    return await http.get(`/raw_data`);
  } catch (err) {
    return err;
  }
};

const getPieData = async (query) => {
  try {
    return await http.get(`/pie/${query}`);
  } catch (err) {
    return err;
  }
};

export default { getRawData, getPieData };
