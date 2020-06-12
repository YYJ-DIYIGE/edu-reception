<template>
  <el-upload
    class="avatar-uploader"
    :action="domain"
    :data="qiniuData"
    :show-file-list="false"
    :limit="1"
    :on-success="handleAvatarSuccess"
    :on-error="uploadError"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUlr" :src="imageUlr" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import qiniuToken from "../gloabl/request/api";
export default {
  props: {
    imageUlr: String
  },
  data() {
    return {
      qiniuData: {
        token: "",
        domain: ""
      },
      domain: "http://upload-z2.qiniup.com"
    };
  },
  watch: {
    imageUlr: function(newVal) {
      this.imageUlr = newVal;
    }
  },
  created() {
    this.getToken();
  },
  methods: {
    getToken() {
      qiniuToken.qiniuToken().then(res => {
        this.qiniuData.token = res.token;
        this.qiniuData.domain = res.domain;
      });
    },
    handleAvatarSuccess(res) {
      let image = "http://" + this.qiniuData.domain + "/" + res.key;
      this.$emit("tranImge", image);
    },
    uploadError(err) {
      console.log(err);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt10M;
    }
  }
};
</script>
<style lang="less">
.avatar-uploader {
  text-align: initial;
  height: 40px;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding-top: 5px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
}
.avatar {
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 50%;
}
</style>
