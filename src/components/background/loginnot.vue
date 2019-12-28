<template>
  <div class="login-box">
    <commonheader></commonheader>
    <div class="flex login-body">
      <div class="l-box"></div>
      <div class="r-box">
        <h2 class="login100-form-title">ACCOUNT LOGIN</h2>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container"
        >
          <div class="flex logininput">
            <el-input
              type="text"
              v-model="loginForm.account"
              auto-complete="off"
              placeholder="请输入账户"
            ></el-input>
            <el-input
              type="password"
              v-model="loginForm.checkPass"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
          </div>

          <el-button
            type="primary"
            class="loginBtn"
            @click.native.prevent="handleSubmit"
            :loading="logining"
          >{{$t('message.login')}}</el-button>
          <p class="txt1">
            Forgot
            <a href>User name / password?</a>
          </p>
          <p class="txt1">
            New to NAG
            <a href>click here to sign up.</a>
          </p>
        </el-form>
      </div>
    </div>

    <!-- <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">{{$t('message.login')}}</h3>
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
          type="primary"
          class="loginBtn"
          @click.native.prevent="handleSubmit"
          :loading="logining"
        >{{$t('message.login')}}</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          type="success"
          class="loginBtn"
          @click.native.register="register"
        >{{$t('message.register')}}</el-button>
      </el-form-item>
    </el-form>-->

    <div class="bottom">
      <el-tooltip placement="top">
        <div slot="content">
          <img class="er-img" src="../assets/common/img/er.png" alt />
        </div>
        <i class="iconfont icon-anzhuo"></i>
      </el-tooltip>
      <el-tooltip placement="top">
        <div slot="content">
          <img class="er-img" src="../assets/common/img/er.png" alt />
        </div>
        <el-button>Top center</el-button>
        <i class="iconfont icon-ios"></i>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import commonheader from "@/common/header";
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
  components: {
    commonheader
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
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
            sessionStorage.setItem("user", loginParams.username);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("displayName", res.data.info.displayName);
            alert(sessionStorage.displayName)
            this.$api.user.usertradeAccounts({}, ress => {
              sessionStorage.setItem(
                "tradeLoginId",
                ress.data.list[0].tradeLoginId
              );

              sessionStorage.setItem("nowactive", 0);

              this.$router.push("/");
              // location.href = '/'
            });
          });
          this.logining = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      // });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/style/_style.scss";

.login-body {
  width: 80%;
  height: 70%;
  margin: 5% auto;
  .l-box {
    background: url("../assets/common/img/login-bg.jpg") no-repeat;
    // background-size: 100%;
    height: 80vh;
    width: 100%;
  }
  .l-box:before {
    content: "";
    display: block;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .r-box {
    width: 100%;
    background: $listbg;
    text-align: center;
    padding-top: 10%;
    .login100-form-title {
      font-family: "Source Serif Pro", serif;
      font-size: 20px;
      color: #555555;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-align: center;
      width: 100%;
      display: block;
    }
    .logininput {
      padding: 0px 10%;
      input {
        border-radius: 0px;
      }
    }
    .loginBtn {
      background: $style-background;
      width: 80%;
      font-size: 20px;
      letter-spacing: 10px;
      margin: 5% 0px;
      padding: 10px;
    }
  }
}
.login-box {
  background: $bordercolor;
}
.txt1:hover{

}
.txt1 {
  font-family: "Source Serif Pro", serif;
  font-size: 16px;
  line-height: 1.4;
  color: #999999;
  margin: 5px;
  a {
    color: #999999;
  }
}
// .bottom{
//   position: absolute;
//   background: $style-background;
//   bottom: 0px;
//   width: 100vw;
//   text-align: right;
//   padding: 1%;
//   box-sizing: border-box;
//   i{
//     font-size: 2rem;
//     color: $text-color;
//   }

// }
//  .er-img{
//     width: 5rem;
//   }
//   @media screen and (min-width: 320px)and (max-width: 1024px) {
//    .login-container {
//   -webkit-border-radius: 5px;
//   border-radius: 5px;
//   -moz-border-radius: 5px;
//   background-clip: padding-box;
//   margin: 2% auto;
//   width: 90%;
//   padding: 2%;
//   border: 1px solid #eaeaea;
//   background: #2d3a4b;
//   color: #fff;
//   .title {
//     margin: 0px auto 40px auto;
//     text-align: center;
//   }
//   .remember {
//     margin: 0px 0px 35px 0px;
//   }
//   .loginBtn {
//     width: 100%;
//     font-size: 20px;
//     letter-spacing: 10px;
//   }
// }

//   }
//     @media screen  and (min-width: 1024px) and (max-width: 3000px) {
//    .login-container {
//   -webkit-border-radius: 5px;
//   border-radius: 5px;
//   -moz-border-radius: 5px;
//   background-clip: padding-box;
//   margin: 2% auto;
//   width: 30%;
//   padding: 35px 35px 15px 35px;
//   border: 1px solid #eaeaea;
//   background: #2d3a4b;
//   color: #fff;
//   .title {
//     margin: 0px auto 40px auto;
//     text-align: center;
//   }
//   .remember {
//     margin: 0px 0px 35px 0px;
//   }
//   .loginBtn {
//     width: 100%;
//     font-size: 20px;
//     letter-spacing: 10px;
//   }
// }

//   }
</style>