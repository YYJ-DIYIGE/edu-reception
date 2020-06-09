import API from "./router";
import request from "./axios";
export default {
  sms_send(params) {
    return request.post(API.sms_send, params);
  },
  sms_login(params) {
    return request.post(API.sms_login, params);
  },
  wechat(params) {
    return request.post(API.wachat, params);
  }
};
