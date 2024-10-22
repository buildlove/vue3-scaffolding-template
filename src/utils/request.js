import axios from "axios";
import { ElMessage } from "element-plus";

// create an axios instance.
const service = axios.create({
  baseURL: import.meta.env.VITE_TINTMCE_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests.
  timeout: Infinity, // request timeout.
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};
    return config;
  },
  (error) => Promise.reject(error) // do something with request error.
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && res.code && res.code !== "200") {
      ElMessage({
        message: res.message || res.msg || "请检查数据返回格式",
        type: "error",
        dangerouslyUseHTMLString: true,
        duration: 5 * 1000,
      });
      return Promise.reject(res.message || "error");
    }
    return res;
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
