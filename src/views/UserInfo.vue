<template>
  <div class="setting-wrapper">
    <div class="setting-sider">
      <el-menu :default-active="path" :router="true">
        <template v-for="route in filterRoutes">
          <el-menu-item
            :key="route.path"
            :disabled="route.disabled"
            :index="route.path"
            :route="{ path: route.path }"
            :id="route.name"
          >
            <span class="menu-title" slot="title">{{
              route.meta.nav.title
            }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="setting-mainer">
      <div class="setting-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/router/routes";
export default {
  data() {
    return {
      path: this.$route.path
    };
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  created() {
    this.getRoutes();
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav && data.position === "setting") {
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
  },
  components: {}
};
</script>

<style type="text/css" lang="less">
.setting-wrapper {
  height: 90%;
  width: 80%;
  margin: 30px auto;
  background-color: #f0f2f5;
  display: flex;
}

.setting-sider {
  text-align: center;
  position: relative;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  width: 200px;
}

.setting-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.setting-body {
  flex: 1;
}
.menu-title {
  font-size: 18px;
}
</style>
