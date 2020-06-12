import API from "./router";
import request from "./axios";
export default {
  qiniuToken() {
    return request.get(API.qiniuToken);
  }
};
