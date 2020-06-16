<template>
  <div class="page-wrapper">
    <div class="page-mainer">
      <Header class="page-header" />
      <div class="page-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./BasicLayoutHeader";
export default {
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>

<style type="text/css" lang="less">
.page-wrapper {
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
}

.page-mainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-header {
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  position: relative;
  z-index: 10;
  height: 64px;
}

.page-body {
  flex: 1;
  background: #f7f7f7;
}
</style>
