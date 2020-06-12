import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import DataStore from "../gloabl/stirage/index";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  const TOKEN = DataStore.getToken();
  if (TOKEN) {
    // 已经登录并且在登录页重定向到主页
    if (to.name === "UserLogin") {
      next({ name: "Root", replace: true });
      return;
    }
  }
  next();
});

export default router;
