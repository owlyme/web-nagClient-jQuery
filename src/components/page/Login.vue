<template>
<div class="bg-class">
  <div class="flex-end" style="width: 100%; height: 100%;background-color: rgba(5,5,5, .3);">
    <!-- <commonheader></commonheader> -->
    <!-- :xs="24" :sm="10" :md="10" :lg="14" :xl="14" -->
    <div class="signbox">
      <div class="flex-end">
        <div class="fg-l border">
          <h3 style="font-size: 22px;">CHRISTMAS PROCESS ING RE MINDER</h3>
          <p class="fg-l-text-b">
            It's a busy time of year.

          </p>
          <p class="fg-l-text-b">
            For Christmas and New Year payment processing impacts,
            plaease refer to our message located in your 'Mailbox' within NAG Connect.
          </p>
          <p class="fg-l-text-b">
            Have a happy and safe holiday season!
          </p>
        </div>
        <div class="size-auto">
          <div class="rg-r">
            <el-header class="" style="display: flex;justify-content: flex-end;">
              <!-- <span class="text">{{$t('message.login')}}</span> -->
              <img class="logininoic" @click="openOfficalPage" src="../../assets/common/img/logo.png" alt="">
            </el-header>
            <el-main>
              <el-form class="login-form" ref="loginForm" :model="loginForm">
                <h2 class="logintitle" style="color: #86D6DD">My <span class="strong">NAG</span></h2>
                <!-- label="账户" -->
                <el-form-item>
                  <el-input :placeholder="$t('login.Pleaseemail')" v-model="loginForm.account"></el-input>
                </el-form-item>
                <!-- :label="$t('message.password')" -->
                <el-form-item>
                  <el-input onkeyup="this.value=this.value.replace(/\s+/g,'')" class="allinputstyle" show-password :placeholder="$t('login.Pleaseepassword')" v-model="loginForm.checkPass"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-checkbox size="medium" label="记住密码"></el-checkbox>
                </el-form-item>

                <!-- buttons -->
                <el-form-item class="btn-item" style="margin-top: 35px;">
                  <el-button class="bt-color" style="width:100%" type="primary" @click.native.prevent="handleSubmit">{{$t('message.login')}}</el-button>
                </el-form-item>
                <el-form-item class="btn-item">

                  <el-button class="registerbt" plain style="background: #1C53A5; border-color:  #1C53A5;width:100%" @click.native.prevent="register">{{$t('replenished.establish')}}</el-button>
                </el-form-item>

                <el-form-item class="btn-item">
                  <router-link class="l-float" to="forgotpassword">{{$t('message.fgpaswd')}}</router-link>
                </el-form-item>
              </el-form>
            </el-main>
          </div>
        </div>
      </div>
    </div>
    <!-- 發送的數據 -->
    <iframe id="receiver" v-show="false" src="https://www.nagmarkets.asia/en/receiver.html" frameborder="2"></iframe>
    <!-- 發送的數據 -->
  </div>
</div>
</template>

<script>
import commonheader from '../common/loginheader';
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: '',
        checkPass: ''
      },
      loginRules: {
        account: [{ required: true, message: this.$t('login.Pleaseemail'), trigger: 'blur' }],
        checkPass: [{ required: true, message: this.$t('login.Pleaseepassword'), trigger: 'blur' }]
      },
      checked: true
    };
  },
  created() {
    let that = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.handleSubmit(); // 登录方法名
        return false;
      }
    };
  },
  components: {
    commonheader
  },
  methods: {
    register() {
      this.$router.push('/register-live');
    },
    handleSubmit(ev) {
      // this.$refs.loginForm.validate(valid => {
      if (!this.loginForm.account) {
        // this.usernamemessage = this.$t('login.Pleaseemail');
        this.$message({
          type: 'info',
          message: this.$t('login.Pleaseemail')
        });
        return;
      } else if (!this.loginForm.checkPass) {
        // this.passwordmessage = this.$t('login.Pleaseepassword');
        this.$message({
          type: 'info',
          message: this.$t('login.Pleaseepassword')
        });
        return;
      } else {
        this.logining = true;
        var loginParams = {
          username: this.loginForm.account,
          password: this.loginForm.checkPass,
          ln: sessionStorage.getItem('localeLanguage')
        };

        this.$api.matches.login(loginParams, res => {
          sessionStorage.setItem('user', loginParams.username);
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('displayName', res.data.info.displayName);
          sessionStorage.setItem('info', JSON.stringify(res.data.info));
          //向前臺發送數據
          var receiver = document.getElementById('receiver').contentWindow;
          var user = sessionStorage.user;
          var token = sessionStorage.token;
          receiver.postMessage({ user }, 'https://www.nagmarkets.asia');
          receiver.postMessage({ token }, 'https://www.nagmarkets.asia');
          //向前臺發送數據
          this.$api.user.usertradeAccounts({}, ress => {
            if (ress.data.list.length == 0) {
              this.$router.push("/");

              // location.href = '/';
            } else {
              sessionStorage.setItem('tradeLoginId', ress.data.list[0].tradeLoginId);

              sessionStorage.setItem('nowactive', 0);

              this.$router.push("/");
              // location.href = '/';
            }
          });
        });
        this.logining = false;
      }
      // if (valid) {

      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      // });
    },
    openOfficalPage() {
        window.open('https://wwww.nagmarkets.asia');
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';
@import '@/style/input.scss';

.logininoic {
  width: 50px;
  height: 50px;
  position: relative;
  right: 0;
}

.bg-class {
  background: url('../../assets/common/img/bg.jpg') no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
}

.el-main {
  padding: 0px 4% 0px 4%;
}

.no-bt {
  background: $bordercolor;
  border: 1px solid $bordercolor;
}

.fg-l {
  max-height: 465px;
  // background: url('../../assets/common/img/login-bg.jpg') no-repeat;
  // background-position-x: 50%;
  // background-size: 100% 100%;
  width: 137px;
  background: rgba(29, 52, 83, 0.9);
  margin-right: 16px;
  color: #E6F2F2;
  padding: 10px 7px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  .fg-l-text {
    font-size: 14px;
  }

  .fg-l-text-b {
    font-size: 14px;
    margin-top: 20%
  }
}

.el-row {
  margin-bottom: 0px;
}

.file-input {
  width: 12rem;
  height: 9rem;
  position: absolute;
  left: 61px;
  opacity: 0;
}

.center {
  text-align: center;

  img {
    width: 15rem;
    height: 10rem;
  }
}

.bt-color {
  background: $style-background;
  border: 1px $style-background solid;
}

.signbox {
  // border: 1px solid $bordercolor;
  margin-top: 15vh;
  margin-right: 10vw;
  overflow: hidden;
  width: 800px;
}

.border {
  // border-right: 1px solid $bordercolor;
  // padding: 20px;
}

.size-auto {
  overflow: hidden;
  min-width: 321px;
  width: 25vw;
  height: 80vh;
}

.logo {
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid $bordercolor;

  img {
    width: 50px;
  }

  .text {
    font-size: 40px;
    font-weight: 600;
  }
}

.rg-r {
  background: #fff;
  padding: 6% 15px 10%;
  padding-bottom: 55px;
}

.title {
  padding: 5px;

  .text {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: $style-background;
  }
}

.end {
  .el-select {
    width: 100%;
  }
}

.ok-box {
  img {
    width: 5rem;
    height: 5rem;
  }

  p {
    color: $fontcolor;
    font-size: 0.5rem;
  }
}

.logintitle {
  color: $text-color;
  padding: 5px;
  text-align: left;
  margin-bottom: 17px;
}

.l-float {
  color: $text-color;
}

.r-float {
  color: $text-color;
}

.registerbt {
  border: 1px #fff solid;
  background: rgba($color: #000000, $alpha: 0);
  color: #fff
}

.login-form /deep/ {

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
  }

  .el-input__inner {
    border: none;
    border-radius: 0px;
    color: #999999;
    border-bottom: 1px solid #A6B1C2;
    padding: 0;
  }

  .el-checkbox__inner {
    zoom: 1.1;
    border-radius: 0px;
    border-color: #20324C;
  }

  .el-checkbox__label {
    font-size: 12px;
  }

  .btn-item {
    &.el-form-item {
      margin-bottom: 8px;

    }

    button {
      border-radius: 0px;
      height: 30px !important;
    }

    a {
      height: 28px !important;
      color: #8CC7CC;
      border: 1px solid #8CC7CC;
      width: 100%;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
