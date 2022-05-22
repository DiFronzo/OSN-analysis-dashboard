import Axios from 'axios';

const http = Axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  // withCredentials: true,
});

export default http;
