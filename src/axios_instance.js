const axios = require("axios");
const defaultOptions = {
  baseURL: process.env.VUE_APP_API_URL
  // transformRequest: [data => JSON.stringify(data)]
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json"
  // }
};
let axiosInstance = axios.create(defaultOptions);
axiosInstance.interceptors.request.use(function(config) {
  // let token = localStorageService.getItem("d_token");
  // let token = "";
  // config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;
