<template>
  <div class="box">
    <img src="@/assets/common/img/notdata.png" alt />
    <p>{{datatext}}</p>
    <el-button
      v-show="isshow"
      type="primary"
      size="large"
      @click="goRules()"
    >{{buttontext}}</el-button>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    isshow: {
      default: false,
      type: Boolean
    },
    buttontext: {
      default: '',
      type: String
    },
    datatext: String,
    router: ""
  },
  data() {
    return {};
  },
  methods: {
    goRules() {
      this.$router.push(this.router);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/style/_style.scss";
.box {
  text-align: center;
  color: $fontcolor;
  padding: 10% 0px;
  background: $listbg;
}
</style>
