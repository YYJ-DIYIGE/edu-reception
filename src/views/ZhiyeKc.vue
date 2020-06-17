<template>
  <div class="zhiye-section">
    <h1 class="zhiye-title">
      成长学习计划
    </h1>
    <div class="zhiye-list">
      <div class="zhiye-item" v-for="item in zhiye" :key="item.id">
        <div class="item-left">
          <img :src="item.image_url" alt="" />
        </div>
        <div class="item-right">
          <h3 class="item-name">{{ item.name }}</h3>
          <h5 class="item-desc">{{ item.description }}</h5>
          <div class="item-tips" @click="edit(item.active, item.id)">
            {{ item.active ? "学习" : "敬请期待" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../gloabl/request/api";
export default {
  data() {
    return {
      zhiye: []
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      api.zhiye().then(res => {
        console.log(res);
        this.zhiye = res;
      });
    },
    edit(active, id) {
      if (active) {
        this.$router.push({ path: "/zhiye/" + id, query: { id } });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.zhiye-section {
  background: #f0f2f5;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 60px;
  .zhiye-title {
    text-align: center;
    letter-spacing: 5px;
  }
  .zhiye-list {
    width: 800px;
    margin: 0 auto;
    margin-top: 40px;
    .zhiye-item {
      margin-top: 20px;
      position: relative;
      border: 1px solid;
      display: flex;
      height: 200px;
      padding: 5px;
      border-radius: 10px;
      .item-left {
        img {
          width: 200px;
          height: 100%;
        }
      }
      .item-right {
        padding-left: 10px;
        .item-name {
          color: currentcolor;
        }
        .item-desc {
          line-height: 25px;
          -webkit-line-clamp: 3;
          word-break: break-all;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 3; /**显示的行数**/
          overflow: hidden; /**隐藏超出的内容**/
        }
        .item-tips {
          position: absolute;
          color: #769418d9;
          width: 80px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border: 1px solid;
          border-radius: 50%;
          position: absolute;
          right: 10px;
          bottom: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
