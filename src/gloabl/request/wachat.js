import API from "./router";
import request from "./axios";
export default {
  bind(id, params) {
    return request.put(API.wachatbind(id), params);
  },
  unbound(id) {
    return request.delete(API.wachatbind(id));
  }
};
