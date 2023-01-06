import axios from "axios";
import { LocalStorageService } from "../@services/utils/localstorage.service";
import { ENV } from "./ENV.config";

const instance = axios.create({
  baseURL: ENV.ApiEndPoint,
});

instance.interceptors.request.use(
  (config: any) => {
    config.headers.accept = "application/json";
    return config;
  },
  (error) => {
    if (error.response) {
      return Promise.reject({
        ...error.response.data,
        ...{ status: error.response.data.status || error.status },
      });
    }

    return Promise.reject({
      body: false,
      status: 404,
      message: "server not responding",
    });
  }
);

instance.interceptors.response.use(
  (res: any) => {
    if (res.data.status === 200) {
      // console.log(res);
      return { ...res.data };
    }
    // TODO:: for temporary handle 401
    if (res.data.status === 401) {
      LocalStorageService.clear();
      return;
    }

    return Promise.reject({
      body: res.data.body,
      status: res.data.status,
      message: res.data.message,
    });
  },
  (error) => {
    console.log(error);
    if (error.response) {
      const { config, response } = error;
      if (response.status === 401) {
        LocalStorageService.clear();
        window.location.reload();
      }
      return Promise.reject({
        ...error.response.data,
        ...{ status: error.response.data.status || error.status },
      });
    } else {
      return Promise.reject({
        status: 404,
        message: "server not responding",
        body: {},
      });
    }
  }
);

export const apiIns = instance;
