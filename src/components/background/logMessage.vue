<template>
<div>

  <el-card shadow="hover" class="mgb20">
    <div slot="header" class="clearfix">
      <span>{{$t('leftlist.title7')}}</span>

    </div>
    <div class="flex">
      <div class="text box-card">
        <div style="flex-shrink: 1;">
          <div class="text-title">{{$t('logMessage.hint')}}</div>
          <div class="text-title">{{$t('message.mail')}}</div>
          <div class=" text-title">{{$t('message.cellphonenumber')}}</div>
          <div class=" text-title">{{$t('message.country')}}</div>
          <div class=" text-title">{{$t('message.site')}}</div>
        </div>
        <div>
          <div class="text-info">：<span class='text-info-indent'>{{info.displayName=='nullnull'?'-':info.displayName}}</span></div>
          <div class="text-info">：<span class='text-info-indent'>{{!info.email?'-':info.email}}</span></div>
          <div class="text-info">：<span class='text-info-indent'>{{!info.phone?'-':info.phone}}</span></div>
          <div class="text-info">：<span class='text-info-indent'>{{!countries?'-':countries}}</span></div>
          <div class="text-info">：<span class='text-info-indent'>{{!info.idAddress?'-':info.idAddress}}</span></div>
        </div>

      </div>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      tradeLoginId: sessionStorage.tradeLoginId == undefined ? '/' : sessionStorage.tradeLoginId,
      countries: '',
      countrieslist: JSON.parse(sessionStorage.countries)
    };
  },
  created() {

    this.$api.user.userinfo({}, res => {
      sessionStorage.info = JSON.stringify(res.data.info);
      this.info = res.data.info;
      this.isdemo = res.data.info.demo;
      // this.isdemo = true
      // console.log(e.data.list) .name
      this.countrieslist.forEach(element => {
        if (element.name == this.info.country) {
          this.countries = element.displayName
        }

      })
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';

.text {
  font-size: 14px;
  align-items: center;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  display: flex;
  flex-shrink: 1;
  padding-top: 40px;
}

.infotetxt {
  font-size: 1rem;
  color: #333;
  margin: 6px;
  width: 100%;
  align-items: center;
  font-size: 13px;
  border-bottom: 1px solid #EBEEF5;
}

.text-title {
  font-size: 1rem;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
  white-space: nowrap;
  border-bottom: 1px solid #EBEEF5;
  margin: 10px 0;
  font-size: 12px;
}

.text-info {

  font-size: 1rem;
  white-space: nowrap;
  border-bottom: 1px solid #EBEEF5;
  margin: 10px 0;
  font-size: 12px;
  .text-info-indent{
    display: inline-block;
    padding-left: 5px;
  }
}
</style>
