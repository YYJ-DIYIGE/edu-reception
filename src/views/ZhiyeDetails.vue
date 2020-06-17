<template>
  <div class="zhiyeEdit-container">
    <div class="zhiyeEdit-header">
      <h1>{{ zhiye.name }}</h1>
      <h4>{{ zhiye.description }}</h4>
    </div>
    <div class="zhiyeEdit-body">
      <div class="learning-route">
        <h4 class="learning-title">学习路线</h4>
        <div class="grade">{{ grade }} / {{ ins + 1 }}</div>
        <div class="course-list">
          <div
            class="course-item"
            @click="course(item.id)"
            v-for="item in zhiyepath[ins].Course"
            :key="item.id"
          >
            <img class="image" :src="item.image_url" alt="图片" />
            <h3 class="course-name">{{ item.name }}</h3>
            <h3 class="course-tips">{{ item.tips }}</h3>
          </div>
        </div>
      </div>
      <div class="grade-sidebar">
        <div class="menu-list">
          <div
            :class="['menu-item', { active: index == ins }]"
            v-for="(data, index) in zhiyepath"
            :key="index"
            @click="active(index, data.name)"
          >
            {{ data.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../gloabl/request/api";
export default {
  data() {
    return {
      grade: "",
      zhiye: {
        name: "",
        description: ""
      },
      zhiyepath: [
        {
          name: "",
          Course: []
        }
      ],
      ins: 0
    };
  },
  created() {
    this.getZhiye();
    this.getZhiyePath();
  },
  methods: {
    active(index, name) {
      this.grade = name;
      this.ins = index;
    },
    getZhiye() {
      let id = this.$route.query.id;
      Api.zhiyeEdit(id).then(res => {
        this.zhiye = res.ZhiyeEdit;
      });
    },
    getZhiyePath() {
      let id = this.$route.query.id;
      Api.zhiyePath({ zhiye_id: id }).then(res => {
        console.log(res);
        this.zhiyepath = res.ZhiyePaths;
        this.grade = res.ZhiyePaths[0].name;
      });
    },
    course(id) {
      this.$router.push({ path: "/zhiye/course/" + id, query: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.learning-route {
  border: 1px solid;
  height: 450px;
  padding: 10px;
  .grade {
    border: 1px solid;
    border-radius: 45px;
    padding-left: 20px;
  }
}
.zhiyeEdit-container {
  height: 100%;
}
.zhiyeEdit-header {
  color: #cc8872;
  padding-top: 50px;
  height: 300px;
  text-align: center;
  background: color(#000);
  h1 {
    letter-spacing: 5px;
  }
  h4 {
    letter-spacing: 1px;
    width: 600px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 20px;
  }
}
.zhiyeEdit-body {
  width: 1280px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
}
.course-list {
  margin-top: 20px;
  width: 900px;
  display: flex;
  flex-wrap: wrap;
  height: 320px;
  overflow: auto;
  background: #f0f2f5;
  .course-item {
    cursor: pointer;
    margin-left: 35px;
    width: 250px;
    background: rgb(253, 253, 253);
    border: 1px solid #607d8b;
    margin-top: 10px;
    h3 {
      -webkit-line-clamp: 1;
      word-break: break-all;
      display: -webkit-box; /**对象作为伸缩盒子模型展示**/
      -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
      -webkit-line-clamp: 1; /**显示的行数**/
      overflow: hidden; /**隐藏超出的内容**/
    }
    .image {
      width: 100%;
      display: block;
      height: 200px;
      background-color: #ffffff;
      border-bottom: 1px solid #607d8b;
    }
    .course-name {
      padding-left: 20px;
    }
    .course-tips {
      padding-left: 20px;
      font-size: 16px;
      color: #695c4a;
    }
  }
}
.grade-sidebar {
  width: 200px;
  height: 300px;
  border: 1px solid;
  margin-left: 50px;
  .menu-item {
    padding-left: 5px;
    line-height: 40px;
    cursor: pointer;
  }
  .menu-item.active {
    background: #607d8b;
  }
}
</style>
