<template>
  <div class="video-container">
    <div class="video-sidebar">
      <div class="logo-section">
        <div>{{ course.name }}</div>
      </div>
      <div class="menu-section">
        <el-collapse>
          <el-collapse-item
            v-for="item in Chapterdata"
            :key="item.id"
            :title="item.name"
          >
            <div
              v-for="data in item.sections"
              :key="data.id"
              :class="['collapse-item-name', { active: data.id == section_id }]"
              @click="play(data.id, data.video_url)"
            >
              {{ data.name }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="video-mainer">
      <div class="video-header">
        <div class="video-title">
          <img class="video-img" src="../assets/video.png" alt="" />
          第一节
        </div>
      </div>
      <div class="video-body">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../gloabl/request/api";
export default {
  data() {
    return {
      section_id: 0,
      course: {
        name: "",
        tips: "",
        description: "",
        image_url: ""
      },
      Chapterdata: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    this.playerOptions.sources[0].src = this.$route.query.url;
    this.section_id = Number(this.$route.query.section_id);
    this.getcourse();
    this.getChapters();
  },
  methods: {
    play(id, url) {
      this.section_id = id;
      this.playerOptions.sources[0].src = url;
    },
    getChapters() {
      let id = Number(this.$route.query.id);
      API.chaptersId({ course_id: id }).then(res => {
        console.log(res);
        this.Chapterdata = res.Chapter;
      });
    },
    getcourse() {
      let id = Number(this.$route.query.id);
      API.courseShow(id).then(res => {
        this.course = res.CoursesEdit;
      });
    }
  }
};
</script>
<style lang="less">
.video-player.vjs-custom-skin {
  width: 1000px;
  margin: 50px auto;
}
.video-js .vjs-icon-placeholder {
  display: block;
}
.el-collapse-item__header {
  padding-left: 10px;
}
.logo-section {
  background: #0b032b;
  height: 80px;
  z-index: 1;
  border-bottom: 1px solid;
  padding-left: 14px;
  font-family: Futura, Helvetica Neue For Number, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  div {
    font-size: 30px;
    color: darkcyan;
    line-height: 80px;
  }
}
.video-sidebar {
  width: 300px;
  border: 1px solid #0b032b;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}
.collapse-item-name {
  padding-left: 20px;
  line-height: 30px;
  cursor: pointer;
}
.collapse-item-name.active {
  background: #607d8b;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.video-container {
  display: flex;
  height: 100vh;
  .video-mainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    .video-header {
      border: 1px solid #0b032b;
      border-left: none;
      display: flex;
      height: 80px;
      background: #0b032b;
      color: #03a9f4;
      font-size: 18px;
      .course-name {
        width: 300px;
        line-height: 80px;
        padding-left: 30px;
        font-size: 20px;
      }
      .video-title {
        position: relative;
        text-align: center;
        flex: 1;
        line-height: 80px;
        color: cornsilk;
        .video-img {
          width: 36px;
          height: 36px;
          position: absolute;
          left: 0;
          top: 20px;
        }
      }
    }
    .video-body {
      flex: 1;
    }
  }
}
</style>
