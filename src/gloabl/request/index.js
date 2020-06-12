import API from "./router";
import request from "./axios";
export default {
  advertise() {
    return request.get(API.indexAdvert);
  }
};
