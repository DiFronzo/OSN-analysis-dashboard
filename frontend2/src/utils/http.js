import Axios from 'axios';

const http = Axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_PATH}`,
  withCredentials: true,
});

export default http;
