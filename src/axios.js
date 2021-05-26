var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:4030': 'https://aston-animal-backend.herokuapp.com/'),
});

module.exports = axiosInstance;