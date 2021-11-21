import axios from 'axios';
import { HTTP, endPoint, MaxReviewFileSize } from './constants';

const apiCall = async (url = '', data = null, params = null, method = HTTP.GET, headers = {}) =>
  axios({
    url: `${endPoint}${url}`,
    data,
    params,
    method,
    headers: {
      ...headers,
    },
    maxContentLength: MaxReviewFileSize,
  })
    .then((p) => p)
    .catch((err) => {
      if (err.toString() !== 'Error: Network Error') throw err;
      else return { data: null };
    });

export default apiCall;
