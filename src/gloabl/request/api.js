import API from "./router";
import request from "./axios";
export default {
  qiniuToken() {
    return request.get(API.qiniuToken);
  },
  zhiye() {
    return request.get(API.zhiye);
  },
  zhiyeEdit(id) {
    return request.get(API.zhiyeId(id));
  },
  zhiyePath(params){
    return request.get(API.zhiyePath, params);
  }
};
