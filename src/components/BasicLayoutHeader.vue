<template>
  <div class="header-section">
    <div class="header-container">
      <div class="header-hd">
        <div class="title">
          EDU Por
        </div>
      </div>
      <div class="header-bd">
        <el-menu :default-active="path" :router="true">
          <template v-for="route in filterRoutes">
            <el-menu-item
              :key="route.path"
              :disabled="route.disabled"
              :index="route.path"
              :route="{ path: route.path }"
              :id="route.name"
            >
              <span slot="title">{{ route.meta.nav.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="header-ft">
        <el-dropdown
          style="height: 100%;"
          v-if="token"
          @command="handleCommand"
        >
          <div class="bar-info-container">
            <img class="userInfo-img" :src="userinfo.avatar_url" alt="" />
            <span class="userInfo-name">{{ userinfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal" icon="el-icon-user"
              >个人设置</el-dropdown-item
            >
            <el-dropdown-item command="account" icon="el-icon-setting"
              >账户安全</el-dropdown-item
            >
            <el-dropdown-item command="out" icon="el-icon-video-pause"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <div lass="bar-info-container" v-else>
          <div class="login-container">
            <div @click="login" class="login">登录</div>
            |
            <div @click="login" class="login">注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/router/routes";
import Dstorage from "../gloabl/stirage/index";
import User from "../gloabl/request/user";
export default {
  data() {
    return {
      token: "",
      path: this.$route.path,
      filterRoutes: [],
      userinfo: {}
    };
  },
  created() {
    this.userinfo = Dstorage.getUserInfo();
    this.token = Dstorage.getToken();
    if (!this.token) {
      this.getUserInfo();
    }
    this.getRoutes();
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "out":
          this.out();
          break;
        case "personal":
          this.$router.push({ name: "UserSetting" });
          break;
        case "account":
          this.$router.push({ name: "UserSecurity" });
          break;
      }
    },
    out() {
      User.Logout();
      this.$router.replace({ name: "UserLogin" });
    },
    getUserInfo() {
      const code = this.$route.query.code;
      if (code) {
        User.wechat({ code }).then(res => {
          Dstorage.setToken(res.data.token);
          this.token = res.data.token;
          Dstorage.setUserInfo(res.data.userinfo);
          this.userinfo = res.data.userinfo;
        });
        this.$router.push({ name: "index" });
      }
    },
    login() {
      this.$router.push({ name: "UserLogin" });
    },
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav && data.position === "head") {
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterNavigator(data.children);
          }
          result.push(item);
        } else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      });
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
.userInfo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 9px;
}
.login-container {
  display: flex;
  justify-content: space-around;
  width: 100px;
  font-family: initial;
  .login {
    cursor: pointer;
  }
}
.el-menu {
  border-right: none;
  display: flex;
  padding: 0 20px;
}
.el-menu-item {
  font-size: 18px;
}
.header-section {
  position: relative;
  height: 64px;
  display: flex;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  .header-container {
    display: flex;
    width: 90%;
    margin: 0 auto;
    .header-bd {
      flex: 1;
    }
  }
}
.header-hd {
  height: 100%;
  .title {
    height: 100%;
    line-height: 64px;
    font-size: 28px;
    color: #000;
    font-family: "Times New Roman", Times, serif;
    text-shadow: 0px 0px 8px #fff, 0px 0px 42px #f72, 0px 0px 72px #f84,
      0px 0px 150px #fa5;
  }
}
.header-bd,
.header-ft {
  display: flex;
  align-items: center;
}

.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #ecf5ff;
  }
  .userInfo-name {
    font-size: 18px;
    vertical-align: middle;
  }
  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    outline: none;
    margin: 0 10px;
  }
}
</style>
