<template>
  <div class="page-container">
    <div class="login-section">
      <div class="login-left">
        <div class="login-left-content">
          <div class="login-left-title">EDU Pro</div>
          <div class="login-left-desc">
            整合企业与学校资源，实现企业实战替代理论知识，打造实用性人才
          </div>
          <div class="login-left-Icon"></div>
        </div>
      </div>
      <div class="login-right">
        <div class="account-login-contaienr">
          <div class="account-login-bd">
            <div class="company-title-container">
              <span class="company-title-name">欢迎使用EDU Pro</span>
            </div>
            <div class="account-login-mainer">
              <div class="login-form-container">
                <div class="login-form-phone">
                  <el-form
                    :model="smsFrom"
                    status-icon
                    :rules="smsRules"
                    ref="smsFrom"
                  >
                    <el-form-item prop="phone">
                      <el-input
                        type="number"
                        placeholder="请输手机号"
                        v-model="smsFrom.phone"
                        autocomplete="off"
                      >
                        <template slot="prepend">+86</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                      <div class="flex-cell">
                        <el-input
                          class="flex-cell-bd"
                          type="number"
                          placeholder="请输入验证码"
                          v-model="smsFrom.code"
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
                    <el-form-item prop="code">
                      <el-link :href="wachat" type="success" target="_self"
                        >使用微信登录</el-link
                      >
                    </el-form-item>
                    <el-form-item class="form-item">
                      <el-button
                        type="primary"
                        style="width: 100%"
                        @click="submitForm('smsFrom')"
                        >登录</el-button
                      >
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../gloabl/request/user";
import wachatUrl from "../../wachat.config";
import DStorage from "../gloabl/stirage/index";
export default {
  name: "Login",
  data() {
    return {
      wachat: wachatUrl.url,
      smsFrom: {
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
      },
      buttonName: "获取验证码",
      disabled: false
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          User.sms_login(this.smsFrom).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              const that = this;
              setTimeout(function() {
                that.$router.push({ path: "/" });
              }, 1000);
              DStorage.setToken(res.data.token);
              DStorage.setUserInfo(res.data.userinfo);
            } else {
              this.$message({
                message: "登录失败," + res.message,
                type: "error"
              });
            }
          });
        }
      });
    },
    handleSendCode() {
      if (this.disabled) {
        return;
      }
      let phone = this.smsFrom.phone;
      User.sms_send({ phone });
      this.$refs.smsFrom.validateField("phone", errMsg => {
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
.form-item {
  margin-top: 100px;
}
.code-wrapper {
  position: relative;
  width: 100%;
  margin-top: 0.85rem;
  display: flex;
  justify-content: space-between;
  font-size: 36px;
  font-weight: bold;
  .code-item {
    width: 1.07rem;
    height: 1.09rem;
    line-height: 1.09rem;
    border-bottom: 0.03rem solid;
    text-align: center;
  }

  .code-input {
    height: 1.09rem;
    position: absolute;
    outline: none;
    color: transparent;
    text-shadow: 0 0 0 transparent;
    width: 200%;
    margin-left: -100%;
    border: none;
    background: none;
    -webkit-appearance: none;
  }
}
.page-container {
  height: 100%;
  .login-section {
    width: 100%;
    height: 100%;
    display: flex;
    .login-left {
      width: 25%;
      height: 100%;
      border-right: 1px solid;
      .login-left-content {
        text-align: left;
        padding: 20px 60px;
        .login-left-desc {
          margin-top: 40%;
        }
        .login-left-title {
          font-size: 28px;
        }
        .login-left-Icon {
          margin: 40px auto;
          width: 0;
          height: 0;
          border: 150px solid;
          border-color: lightcoral rgb(16, 180, 192) rgb(10, 189, 79)
            rgba(128, 6, 228, 0.918);
        }
      }
    }
    .login-right {
      flex: 1;
      .login-right-content {
        width: 50%;
        margin: 10% auto;
        .login-right-title {
          font-size: 18px;
          margin-top: 10px;
        }
        .login-input {
          margin: 50px auto;
          width: 70%;
        }
      }
    }
  }
}
.account-login-contaienr {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 40px;
  box-sizing: border-box;
}
.account-login-bd {
  width: 500px;
  height: 500px;
  background-color: #607d8b;
  margin: auto;
  padding-top: 100px;
}
.company-title-container {
  text-align: left;
  max-width: 388px;
  margin: 0 auto;
  .company-title-name {
    font-family: cursive;
    line-height: 44px;
    font-size: 33px;
    font-weight: 800;
  }
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
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
