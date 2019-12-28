<template>
<div>
  <el-card shadow="hover" class="mgb20">
    <div slot="header" class="clearfix">
      <span>{{$t('title.changepassword')}}</span>
    </div>
    <el-form :label-position="labelPosition" style="width:350px" width="200">
      <el-form-item :label="$t('message.oldpassword')">
        <el-input v-model="params.oldPassword" type="password" :placeholder="$t('message.oldpassword')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.newpassword')">
        <el-input v-model="params.password" type="password" :placeholder="$t('message.newpassword')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('message.Repeatnewpassword')">
        <el-input v-model="params.repeatPassword" type="password" :placeholder="$t('message.Repeatnewpassword')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="logo">{{$t("message.affirm")}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      passwordmessage: '',
      params: {
        oldPassword: '',
        password: '',
        repeatPassword: ''
      }
    };
  },
  created() {},
  methods: {
    logo() {
      this.passwordmessage = '';
      if (this.params.password != this.params.repeatPassword) {
        this.$message({
          type: 'error',
          message: this.$t('message.Enteredpasswordsdiffer')
        });

        return;
      }
      this.$api.user.usermodifyPassword(this.params, res => {
        this.params.password = '';
        this.params.repeatPassword = '';
        this.$message({
          type: 'success',
          message: this.$t('message.success')
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';
</style>
