<template>
  <div class="security-section">
    <div class="security-title">
      账号安全
    </div>
    <div class="security-list">
      <div class="security-item">
        <div class="item-text">手机号</div>
        <div class="item-text">{{ userinfo.phone ? "已绑定" : "未绑定" }}</div>
        <div class="item-button" @click="opBind">
          {{ userinfo.phone ? "解绑" : "绑定" }}
        </div>
      </div>
      <div class="security-item">
        <div class="item-text">微信</div>
        <div class="item-text">
          {{ userinfo.unionid ? "已绑定" : "未绑定" }}
        </div>
        <div class="item-button" @click="WxBind">
          {{ userinfo.unionid ? "解绑" : "绑定" }}
        </div>
      </div>
    </div>
    <el-dialog
      title="绑定手机"
      :visible.sync="dialogFormVisible"
      class="dialog"
    >
      <el-form
        :model="PhoneForm"
        status-icon
        :rules="smsRules"
        ref="PhoneForm"
        class="PhoneForm"
      >
        <el-form-item prop="phone" :label-width="formLabelWidth">
          <el-input
            type="number"
            placeholder="请输手机号"
            v-model="PhoneForm.phone"
            autocomplete="off"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" :label-width="formLabelWidth">
          <div class="flex-cell">
            <el-input
              class="flex-cell-bd"
              type="number"
              placeholder="请输入验证码"
              v-model="PhoneForm.code"
              autocomplete="off"
              prefix-icon="el-icon-mobile"
            ></el-input>
            <el-button
              :disabled="disabled"
              class="flex-cell-ft"
              @click="handleSendCode"
              >{{ buttonName }}</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="PhoneBind">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import DStorage from "../gloabl/stirage/index";
import User from "../gloabl/request/user";
import Wachat from "../gloabl/request/wachat";
import wachatUrl from "../../wachat.config";
export default {
  data() {
    return {
      bindurl: wachatUrl.bind,
      buttonName: "获取验证码",
      disabled: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      userinfo: {},
      PhoneForm: {
        phone: "",
        code: ""
      },
      smsRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入六位数验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUserinfo();
    const code = this.$route.query.code;
    if (code) {
      this.bindWx(code);
    }
  },
  methods: {
    getUserinfo() {
      this.userinfo = DStorage.getUserInfo();
    },
    opBind() {
      if (!this.userinfo.phone) {
        this.dialogFormVisible = true;
      } else {
        this.$confirm("解绑后无法使用手机号登录此账号，确定解绑吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (!this.userinfo.unionid) {
              this.$confirm("此次操作会注销账号，确定吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                User.delete(this.userinfo.id).then(res => {
                  if (res.code == 200) {
                    User.Logout();
                    this.$router.push({ name: "index" });
                  }
                });
              });
              return;
            }
            User.unbound(this.userinfo.id).then(res => {
              if (res.code === 200) {
                DStorage.setUserInfo(res.userinfo);
                this.getUserinfo();
                this.$message({
                  type: "success",
                  message: "解绑成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消解绑"
            });
          });
      }
    },
    PhoneBind() {
      User.bind(this.userinfo.id, this.PhoneForm).then(res => {
        if (res.code === 200) {
          DStorage.setUserInfo(res.userinfo);
          this.getUserinfo();
          this.$message({
            type: "success",
            message: "绑定成功!"
          });
          this.dialogFormVisible = false;
        }
      });
    },
    WxBind() {
      if (!this.userinfo.unionid) {
        window.open(this.bindurl, "_self");
      } else {
        this.$confirm("解绑后无法使用微信登录此账号，确定解绑吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (!this.userinfo.phone) {
              this.$confirm("此次操作会注销账号，确定吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                User.delete(this.userinfo.id).then(res => {
                  if (res.code == 200) {
                    User.Logout();
                    this.$router.push({ name: "index" });
                  }
                });
              });
              return;
            }
            Wachat.unbound(this.userinfo.id).then(res => {
              if (res.code === 200) {
                DStorage.setUserInfo(res.userinfo);
                this.getUserinfo();
                this.$message({
                  type: "success",
                  message: "解绑成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消解绑"
            });
          });
      }
    },
    bindWx(code) {
      Wachat.bind(this.userinfo.id, { code }).then(res => {
        if (res.code == 200) {
          DStorage.setUserInfo(res.userinfo);
          this.getUserinfo();
        }
      });
      this.$router.push({ name: "UserSecurity" });
    },
    handleSendCode() {
      if (this.disabled) {
        return;
      }
      let phone = this.PhoneForm.phone;
      User.sms_send({ phone });
      this.$refs.PhoneForm.validateField("phone", errMsg => {
        if (errMsg) return;
        this.disabled = true;

        let time = 60;
        this.buttonName = `(${time})秒重新发送`;
        const interval = window.setInterval(() => {
          time -= 1;
          this.buttonName = `(${time})秒重新发送`;
          if (time <= 0) {
            this.buttonName = "重新发送";
            this.disabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.security-title {
  height: 80px;
  text-align: left;
  font-size: 20px;
  border-bottom: 1px solid;
  line-height: 80px;
  font-weight: 600;
}
.security-section {
  width: 1000px;
  margin: 0 auto;
}
.security-list {
  width: 800px;
  margin: 0 auto;
  height: 500px;
  margin-top: 100px;
  .security-item {
    width: 450px;
    display: flex;
    margin-top: 50px;
    justify-content: space-between;
    .item-button {
      color: #048ffd;
      cursor: pointer;
    }
  }
}
.el-form-item {
  padding-right: 70px;
}
.dialog {
  text-align: center;
}
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
</style>
