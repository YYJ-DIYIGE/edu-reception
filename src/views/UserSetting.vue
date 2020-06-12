<template>
  <div class="setting-section">
    <div class="setting-title">
      个人资料
    </div>
    <div class="from">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="头像" style="text-align: initial;">
          <Upload @tranImge="getImage" :imageUlr="form.avatar_url" />
        </el-form-item>
        <el-form-item label="昵称:" style="width: 35%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" style="text-align: initial;">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.sex"
              :label="item.label"
              :value="item.sex"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" style="text-align: initial;">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="个人简介:" style="text-align: initial;">
          <el-input
            class="textarea"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.introduction"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: initial;">
          <el-button class="Submit" type="primary" @click="onSubmit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Upload from "../components/Upload";
import DStorage from "../gloabl/stirage/index";
import User from "../gloabl/request/user";
export default {
  components: {
    Upload
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        name: "",
        sex: "",
        birthday: "",
        avatar_url: "",
        introduction: ""
      },
      options: [
        {
          sex: 0,
          label: "女"
        },
        {
          sex: 1,
          label: "男"
        }
      ]
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    getUserinfo() {
      const userinfo = DStorage.getUserInfo();
      this.form = userinfo;
    },
    getImage(img) {
      this.form.avatar_url = img;
    },
    onSubmit() {
      this.form.updated_at = new Date();
      User.update(this.form.id, this.form).then(res => {
        if (res.code === 200) {
          DStorage.setUserInfo(res.userinfo);
          this.getUserinfo();
          window.location.reload();
        }
      });
    }
  }
};
</script>
<style lang="less">
.form-item__content {
  text-align: initial;
}
.textarea {
  width: 300px;
}
.setting-title {
  height: 80px;
  text-align: left;
  font-size: 20px;
  border-bottom: 1px solid;
  line-height: 80px;
  font-weight: 600;
}
.setting-section {
  width: 1000px;
  margin: 0 auto;
}
.from {
  padding-top: 50px;
  padding-left: 50px;
}
</style>
