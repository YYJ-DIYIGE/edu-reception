<template>
  <div class="course-container">
    <div class="course-crumbs">
      <div class="return-zhiye" @click="zhiye">职业课</div>
      <div class="crumbs-arrow">➡</div>
      <div class="crumbs-name">{{ course.name }}</div>
    </div>
    <div class="course-section">
      <div class="course-detail">
        <div class="detail-left">
          <img :src="course.image_url" alt="" />
        </div>
        <div class="detail-right">
          <div class="detail-title">
            <div class="course-name">{{ course.name }}</div>
            <div class="course-tips">{{ course.tips }}</div>
          </div>
          <div class="course-desc">{{ course.description }}</div>
        </div>
      </div>
      <div class="courses-list">
        <div
          class="courses-item"
          v-show="Chapterdata.length != 0"
          v-for="item in Chapterdata"
          :key="item.id"
        >
          <div class="item-chapter">{{ item.name }}</div>
          <div class="item-knot" v-for="data in item.sections" :key="data.id">
            {{ data.name }}
            <div class="item-button" @click="video(data.id, data.video_url)">
              开始学习
            </div>
          </div>
        </div>
        <div v-show="Chapterdata.length == 0">暂无章节</div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../gloabl/request/api";
export default {
  data() {
    return {
      course: {
        name: "",
        tips: "",
        description: "",
        image_url: ""
      },
      Chapterdata: []
    };
  },
  created() {
    this.getcourse();
    this.getChapters();
  },
  methods: {
    zhiye() {
      this.$router.push({ path: "/zhiye" });
    },
    getChapters() {
      let id = Number(this.$route.query.id);
      API.chaptersId({ course_id: id }).then(res => {
        this.Chapterdata = res.Chapter;
      });
    },
    getcourse() {
      let id = Number(this.$route.query.id);
      API.courseShow(id).then(res => {
        this.course = res.CoursesEdit;
      });
    },
    video(section_id, url) {
      let id = Number(this.$route.query.id);
      this.$router.push({
        path: "/video/" + id,
        query: { id, section_id, url }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.course-container {
  padding: 30px 150px;
  margin: 0 auto;
  .course-crumbs {
    display: flex;
    height: 30px;
    .return-zhiye {
      line-height: 30px;
      color: #0b62e4;
      cursor: pointer;
      text-decoration: underline;
    }
    .crumbs-name {
      line-height: 30px;
    }
    .crumbs-arrow {
      line-height: 30px;
      margin: 0 5px;
    }
  }
  .course-section {
    width: 1480px;
    margin: 20px auto;
    .course-detail {
      display: flex;
      padding: 10px;
      border: 1px solid;
      .detail-left {
        img {
          width: 200px;
          height: 100%;
        }
      }
      .detail-right {
        margin-left: 20px;
        .detail-title {
          display: flex;
          height: 50px;
          .course-name {
            line-height: 50px;
            font-size: 28px;
          }
          .course-tips {
            line-height: 50px;
            margin-left: 20px;
            color: #211d1d;
          }
        }
        .course-desc {
          line-height: 25px;
          -webkit-line-clamp: 4;
          word-break: break-all;
          display: -webkit-box; /**对象作为伸缩盒子模型展示**/
          -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
          -webkit-line-clamp: 4; /**显示的行数**/
          overflow: hidden; /**隐藏超出的内容**/
        }
      }
    }
    .courses-list {
      margin-top: 30px;
      .courses-item {
        margin-top: 20px;
        border: 1px solid;
        padding: 10px 10px;
        color: #2c3e50;
        .item-chapter {
          font-size: 18px;
          line-height: 30px;
        }
        .item-knot {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          line-height: 30px;
          .item-button {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
