import axios from "axios";

const service = axios.create({
  baseURL: "https://callback.erp.bz-bss.com",
  timeout: 60000,
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const code = Number(res.code);
    if (code === 0) {
      return res.response || res.data;
    } else {
      const message = res.msg || res.message || "Error";
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    console.error("request error: " + error);
    return Promise.reject(error);
  }
);

export const get = (url, params) =>
  service({
    method: "GET",
    url,
    params,
  });

export const post = (url, data) =>
  service({
    method: "POST",
    url,
    data,
  });

export default service;
