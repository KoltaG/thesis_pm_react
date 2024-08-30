import Axios from "axios";
import { config } from "../config/config";

const network = Axios.create({
  baseURL: config.baseApiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request and response interceptors are in src/hooks/useNetwork.ts

// Add pagination to the response
network.interceptors.response.use((response) => {
  if (typeof response.headers.pagination === "string") {
    response.headers.pagination = JSON.parse(response.headers.pagination);
  }
  return response;
});

if (config.loggingNetworkErrors) {
  network.interceptors.response.use(
    (response) => response,
    function (error) {
      console.log(error.response);
      return Promise.reject(error);
    }
  );
}
if (config.loggingRequests) {
  network.interceptors.request.use((request) => {
    console.log(request.baseURL + "" + request.url);
    if (request.data) {
      console.log(JSON.stringify(request.data));
    }

    return request;
  });
}

if (config.loggingResponses) {
  network.interceptors.response.use((response) => {
    console.log(response.status, response.statusText ?? "");
    return response;
  });
}

export default network;
