import axios from 'axios'

const API_URL = 'http://germangorodnev.com:5300/api/v1/'

const getToken = async () => {
  const token = await localStorage.getItem('token')
  return token
}

const getHeaders = async (extendHeaders) => {
  const headers = {
    Accept: 'application/json',
  }

  Object.keys(extendHeaders).forEach((key) => {
    headers[key] = extendHeaders[key]
  })

  const token = await getToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export const get = async (endpoint = '/', extendHeaders = {}) => {
  try {
    const { data, headers } = await axios.get(`${API_URL}${endpoint}`, {
      headers: await getHeaders(extendHeaders),
    })
    return { data, headers }
  } catch (error) {
    throw new Error(error.text)
  }
}

export const post = async (body, endpoint = '', extendHeaders = {}) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, body, {
      headers: await getHeaders(extendHeaders),
    })

    const { headers, data } = response
    return { data, headers }
  } catch (error) {
    throw new Error(error.text)
  }
}

export const put = async (body = {}, endpoint = '', extendHeaders = {}) => {
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, body, {
      headers: await getHeaders(extendHeaders),
    })

    const { headers, data } = response
    return { data, headers }
  } catch (error) {
    throw new Error(error.text)
  }
}

export const del = async (body = {}, endpoint = '', extendHeaders = {}) => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`, {
      data: body,
      headers: await getHeaders(extendHeaders),
    })
    const { headers, data } = response
    return { data, headers }
  } catch (error) {
    throw new Error(error.text)
  }
}
