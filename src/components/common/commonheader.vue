<template>
<div>
  <div class="top-header">
    <div class="title">
      <div class="title-inner">{{title}}</div>
    </div>
    <div class="top-contanier">
      <div class="info-card">
        <div class="left">
          <img src="@/assets/img/avatar.jpg" />
        </div>
        <div class="right">
          <div class="r-up">早安，{{username}},祝你开心每一天！</div>
          <div class="r-btm">
            <el-tag v-if="info.approved" type="success">{{info.userWholeStatusDisplay}}</el-tag>
            <el-tag class="lr-margin" v-if="!info.approved" type="warning">{{info.userWholeStatusDisplay}}</el-tag>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    title: String,
    router: ''
  },
  data() {
    return {
      username: JSON.parse(sessionStorage.info).displayName,
      info: JSON.parse(sessionStorage.info)
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import '@/style/_style.scss';

.top-header {
    background: #ffffff;
    margin-bottom: 20px;
    * {
        box-sizing: border-box;
    }
    .title {
        // padding: 0 30px;
        // height: 42px;
        border-bottom: 1px solid #EBEEF5;
        padding: 18px 20px;
        .title-inner {
            // padding-top: 4px;
            // height: 40px;
            // line-height: 40px;
            font-size: 14px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color:  #606266;


        }
    }
    .info-card {
        display: flex;
        .left {
            margin-right: 10px;
            img {
                width: 81px;
                height: 81px;
                border-radius: 50%;
                display: block;
            }
        }
        .right {
            box-sizing: border-box;
            padding: 5px 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .r-up {
                color: #333333;
            }
            .r-btm {}
        }
    }
    .top-contanier {
        padding: 12px 30px;
        background: rgba(255, 255, 255, 1);
    }
}
</style>
