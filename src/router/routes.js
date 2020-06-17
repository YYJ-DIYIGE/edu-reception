import UserLogin from "../views/UserLogin.vue";
import Error404 from "../views/Error404.vue";
// import index from "../views/index.vue";
import Zhiye from "../views/ZhiyeKc.vue";
import BasicLayout from "@/components/BasicLayout.vue";
const index = () => import("../views/index.vue");
const User = () => import("../views/UserInfo.vue");
const UserSetting = () => import("../views/UserSetting.vue");
const UserSecurity = () => import("../views/UserSecurity.vue");
const ZhiyeDetail = () => import("../views/ZhiyeDetails.vue");
const CourseDetail = () => import("../views/CourseDetails.vue");
const Video = () => import("../views/video.vue");
export default [
  {
    path: "/login",
    component: UserLogin,
    name: "UserLogin"
  },
  {
    path: "/video/:id",
    component: Video,
    name: "Video"
  },
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "index" },
    children: [
      {
        path: "/index",
        name: "index",
        position: "head",
        component: index,
        meta: {
          nav: {
            title: "首页"
          }
        }
      },
      {
        path: "/zhiye",
        name: "Zhiye",
        position: "head",
        component: Zhiye,
        meta: {
          nav: {
            title: "职业课"
          }
        }
      },
      {
        path: "/zhiye/:id",
        name: "ZhiyeDetail",
        component: ZhiyeDetail
      },
      {
        path: "/zhiye/course/:id",
        name: "CourseDetail",
        component: CourseDetail
      },
      {
        path: "/user",
        name: "User",
        component: User,
        children: [
          {
            path: "/user/setting",
            name: "UserSetting",
            position: "setting",
            component: UserSetting,
            meta: {
              nav: {
                title: "个人设置"
              }
            }
          },
          {
            path: "/user/security",
            name: "UserSecurity",
            position: "setting",
            component: UserSecurity,
            meta: {
              nav: {
                title: "账号安全"
              }
            }
          }
        ]
      }
    ]
  },
  {
    path: "/404",
    name: "Error404",
    component: Error404
  },
  {
    path: "*",
    redirect: { name: "Error404" }
  }
];
