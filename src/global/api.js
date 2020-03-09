import axios from "axios";

import { API_URL } from "./constant";

getToken = async () => {
  const token = await localStorage.getItem("token");
  if (token) {
    this.token = token;
  }
};

getHeaders = async extendHeaders => {
  const headers = {
    Accept: "application/json"
  };

  Object.keys(extendHeaders).forEach(key => {
    headers[key] = extendHeaders[key];
  });

  await this.getToken();

  if (this.token) {
    headers.Authorization = `Bearer ${this.token}`;
  }

  return headers;
};

const get = async (endpoint = "/", query = {}) => {
  try {
    const { data, headers } = await axios.get(`${API_URL}${endpoint}`, {
      headers: await this.getHeaders(),
      params: { ...query }
    });
    return { data, headers };
  } catch (error) {
    return error.response;
  }
};

const post = async (body, endpoint = "", extendHeaders = {}) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, body, {
      headers: await this.getHeaders(extendHeaders)
    });

    const { headers, data } = response;
    resolve({ data, headers });
  } catch (error) {
    reject(error.response);
  }
};

const put = async (body = {}, endpoint = "") => {
  try {
    const {
      headers,
      data: { data }
    } = await axios.put(`${API_URL}${endpoint}`, body, {
      headers: await this.getHeaders()
    });
    resolve({ data, headers });
  } catch (error) {
    reject(error.response);
  }
};

const del = async (body = {}, endpoint = "") => {
  try {
    const {
      headers,
      data: { data }
    } = await axios.delete(`${API_URL}${endpoint}`, {
      data: body,
      headers: await this.getHeaders()
    });
    resolve({ data, headers });
  } catch (error) {
    reject(error.response);
  }
};
