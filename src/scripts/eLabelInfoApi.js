import axios from "axios";
export const apiInstance = axios.create({
  baseURL: "http://10.45.34.126:8081",
  timeout: 5000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});
