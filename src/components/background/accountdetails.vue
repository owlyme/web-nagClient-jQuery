<template>
<el-row :gutter="20" class="tb-margin">
  <el-col :span="24">
    <el-card shadow="hover">
      <!-- <div slot="header" class="clearfix tb-margin"> -->
      <!-- <div class="flex search-top flexwrap tb-margin">
                <div class="top-margin inputlist flex search-top">
                    <div class="lr-margin">
                    <span class="input-title lr-margin">交易账户</span>
                    <el-select v-model="screen.rating" placeholder="请选择">
                        <el-option v-for="item in mratings" :label="item.tradeLoginId" :value="item.tradeLoginId"></el-option>
                    </el-select>
                    </div>
                    <span  class="demonstration lr-margin">日期</span>
                    <el-date-picker

                        v-model="datearr"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                    <el-button
                    class="lr-margin"
                        type="success"
                        icon="el-icon-search"
                        @click="Determine_screening()"
                        circle
                    ></el-button>
                </div>
        </div>-->
      <!-- </div> -->
      <notdata v-if="tableData == [] || tableData.length == 0" datatext="暫無出入金數據"></notdata>
      <div class="table-container">
        <el-table stripe v-if="tableData != [] && tableData.length != 0" :data="tableData" style="width: 100%" height="500">
          <el-table-column fixed prop="createTime" :label="$t('Toactivate.hint')"></el-table-column>
          <el-table-column prop="ticket" :label="$t('accountdetails.hint')"></el-table-column>
          <el-table-column prop="amount" :label="$t('accountdetails.hint1')"></el-table-column>
          <el-table-column prop="tradeLoginId" :label="$t('message.tradingaccount')"></el-table-column>
          <el-table-column prop="source" :label="$t('accountdetails.hint2')"></el-table-column>
          <!-- <el-table-column prop="ip" label="服务器"></el-table-column> -->
          <el-table-column prop="userName" :label="$t('accountdetails.hint3')"></el-table-column>
          <el-table-column prop="tradeTypeDisplay" :label="$t('accountdetails.hint4')"></el-table-column>
          <el-table-column prop="statusDisplay" :label="$t('accountdetails.hint5')"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
import notdata from '@/components/common/notdata';
export default {
  components: {
    notdata
  },
  data() {
    return {
      tableData: [],
      screen: {
        startDate: '', //开始时间
        endDate: '', //结束时间
        rating: sessionStorage.tradeLoginId == undefined ? ' ' : sessionStorage.tradeLoginId //交易账户
      }
    };
  },
  created() {
    // this.$api.user.usertradeAccounts({}, res => {
    //     this.mratings = res.data.list;
    // });
    this.writeCurrentDate();
    this.getdatas();
  },
  methods: {
    writeCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      if (month < 10) month = 0 + month;
      var time = '';
      time = year + '-' + month + '-' + date;
      this.datearr = [time, time];
      console.log(time);
    },
    getdatas() {
      this.$api.user.paytransLogs({}, res => {
        console.log(res);
        this.tableData = res.data.list;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import '@/style/_style.scss';
</style>
