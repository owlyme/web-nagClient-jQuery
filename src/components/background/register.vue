<template>
  <el-form
    :model="loginForm"
    :rules="loginRules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">{{$t('message.register')}}</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账户"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input
        type="password"
        v-model="loginForm.checkPass"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    

    <el-form-item style="width:100%;">
      <el-button
        type="success"
        class="loginBtn"
        @click.native.prevent="handleSubmit"
        :loading="logining"
      >{{$t('message.register')}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: "",
        checkPass: "123456"
      },
      loginRules: {
        account: [{ required: true, message: "请输入账户", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },

  methods: {
    handleSubmit(ev) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.loginForm.account,
            password: this.loginForm.checkPass,
            ln: sessionStorage.getItem("localeLanguage")
          };

          this.$api.matches.login(loginParams, res => {
            this.logining = false;
            sessionStorage.setItem("user", loginParams.username);
            sessionStorage.setItem("token", res.data.token);

            this.$api.user.usertradeAccounts({}, ress => {
              sessionStorage.setItem(
                "tradeLoginId",
                ress.data.list[0].tradeLoginId
              );

              sessionStorage.setItem("nowactive", 0);

              this.$router.push("/");
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/style/_style.scss";
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  background: #2d3a4b;
  color: #fff;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .loginBtn {
    width: 100%;
    font-size: 20px;
    letter-spacing: 10px;
  }
}
</style>