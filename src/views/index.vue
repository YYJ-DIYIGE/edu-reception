<template>
  <div class="index-container">
    <div class="index-section">
      <div class="index_banner" :style="{ width: list[0].width + 'px' }">
        <el-carousel
          :interval="5000"
          arrow="always"
          :height="list[0].height + 'px'"
        >
          <el-carousel-item
            v-for="(item, index) in list[0].material"
            :key="index"
          >
            <el-link :href="item.link" type="success" :target="item.window">
              <img
                :src="item.image_url"
                :style="{
                  width: list[0].width + 'px',
                  height: list[0].height + 'px'
                }"
            /></el-link>
          </el-carousel-item>
        </el-carousel>
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
      list: [
        {
          width: "",
          height: "",
          material: []
        }
      ]
    };
  },
  created() {
    this.getAdvertise();
  },
  methods: {
    getAdvertise() {
      index.advertise().then(res => {
        console.log(res);
        this.list = res;
      });
    }
  }
};
</script>
<style lang="less">
.index-section {
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
</style>
