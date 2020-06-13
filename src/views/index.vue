<template>
  <div class="index-container">
    <div class="banner-section">
      <div class="index_banner" :style="{ width: advertise[0].width + 'px' }">
        <el-carousel
          :interval="5000"
          arrow="always"
          :height="advertise[0].height + 'px'"
        >
          <el-carousel-item
            v-for="(item, index) in advertise[0].material"
            :key="index"
          >
            <el-link :href="item.link" type="success" :target="item.window">
              <img
                :src="item.image_url"
                :style="{
                  width: advertise[0].width + 'px',
                  height: advertise[0].height + 'px'
                }"
            /></el-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="course-section">
        <h3 class="course-title">最新课程</h3>
        <h4 class="course-sub-title">最新的课程是最好的课程</h4>
        <div class="course-list">
          <div class="course-item" v-for="item in course" :key="item.id" :id="item.id">
            <img class="image" :src="item.image_url" alt="图片" />
            <h3 class="course-name">{{item.name}}</h3>
            <h3 class="course-tips">{{item.tips}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import index from "../gloabl/request/index";
export default {
  components: {},
  data() {
    return {
      advertise: [
        {
          width: "",
          height: "",
          material: []
        }
      ],
      course:[]
    };
  },
  created() {
    this.getAdvertise();
    this.getCourse();
  },
  methods: {
    getAdvertise() {
      index.advertise().then(res => {
        console.log(res);
        this.advertise = res;
      });
    },
    getCourse() {
      index.course().then(res =>{
        console.log(res);
        this.course = res
      })
    }
  }
};
</script>
<style lang="less">
.banner-section {
  margin-top: 30px;
}
.index_banner {
  margin: 0 auto;
  height: auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.course-section{
  width: 1280px;
  margin: 0 auto;
  .course-sub-title{
    font-size: 14px;
    color: #05524b;
  }
  .course-list{
    display: flex;
    height: 300px;
    background: #f0f2f5;
    justify-content: space-between;
    .course-item{
      width: 300px;
      background: rgb(253, 253, 253);
      border: 1px solid #607D8B;
      .image{
        width: 100%;
        display: block;
        height: 200px;
        background-color: #ffffff;
        border-bottom: 1px solid #607D8B;
      }
      .course-name{
        padding-left: 20px;
      }
      .course-tips{
        padding-left: 20px;
        font-size: 16px;
        color: #695c4a;
      }
    }
  }
}
</style>
