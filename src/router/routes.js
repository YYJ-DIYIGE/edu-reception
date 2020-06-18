const UserLogin = () => import("../views/UserLogin.vue");
const Error404 = () => import("../views/Error404.vue");
const Zhiye = () => import("../views/ZhiyeKc.vue");
const BasicLayout = () => import("@/components/BasicLayout.vue");
const index = () => import("../views/index.vue");
const User = () => import("../views/UserInfo.vue");
const UserSetting = () => import("../views/UserSetting.vue");
const UserSecurity = () => import("../views/UserSecurity.vue");
const ZhiyeDetail = () => import("../views/ZhiyeDetails.vue");
const CourseDetail = () => import("../views/CourseDetails.vue");
const Video = () => import("../views/video.vue");
const SkillTest = () => import("../views/SkillTest.vue");
const SkillSubject = () => import("../views/SkillSubject.vue");
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
      },
      {
        path: "/skilltest",
        name: "SkillTest",
        component: SkillTest,
        position: "head",
        meta: {
          nav: {
            title: "技能测评"
          }
        }
      },
      {
        path: "/skilltest/:id",
        name: "SkillSubject",
        component: SkillSubject
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
