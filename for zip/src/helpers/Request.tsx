import axios from "axios";

export function Request(url: string, method: string, data?: unknown) {
  return axios({
    baseURL: "http://localhost:3000",
    url: url,
    method: method,
    data: data,
  });
}
