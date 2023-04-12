import axios from "axios";

const apipost = axios.create({
  // localserver json-server
  // baseURL: "http://localhost:3005",

  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export default apipost;
