import API from "./router";
import request from "./axios";
import DataStore from "../stirage/index";
export default {
  sms_send(params) {
    return request.post(API.sms_send, params);
  },
  sms_login(params) {
    return request.post(API.sms_login, params);
  },
  wechat(params) {
    return request.post(API.wachat, params);
  },
  Logout() {
    DataStore.clear();
  },
  update(id, params) {
    return request.put(API.user(id), params);
  },
  bind(id, params) {
    return request.put(API.userbind(id), params);
  },
  unbound(id) {
    return request.delete(API.userbind(id));
  },
  delete(id) {
    return request.delete(API.user(id));
  }
};
