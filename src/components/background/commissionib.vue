<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card :span="24" class="mgb20 form-inline-container">

        <el-form :inline="true" class="demo-form-inline ">
          <el-form-item :label="$t('message.tradingaccount')">
            <el-select v-model="screen.rating" :placeholder="$t('message.Pleasechoose')">
              <el-option v-for="item in mratings" :label="item.tradeLoginId" :value="item.tradeLoginId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('Toactivate.hint')">
            <el-date-picker style="width: 260px" v-model="datearr" type="daterange" value-format="yyyy-MM-dd" range-separator="-" :start-placeholder="$t('Toactivate.hint2')" :end-placeholder="$t('Toactivate.hint3')"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="Determine_screening()"></el-button>
          </el-form-item>
        </el-form>

        <notdata :datatext="$t('commissionib.hint')" v-show="tableData == [] || tableData == ''"></notdata>
        <div class="table-container">

          <el-table stripe v-show="tableData != [] && tableData != ''" class="top-margin market-trend-box" :data="tableData" height="500" border style="width: 100%">
            <!-- <el-table-column flex prop="displayStatus" label="单号" ></el-table-column> -->
            <el-table-column prop="tradeAccountId" :label="$t('message.tradingaccount')"></el-table-column>
            <el-table-column prop="userName" :label="$t('commissionib.hint1')"></el-table-column>
            <!-- <el-table-column prop="displayName" label="账户货币"></el-table-column> -->
            <!-- <el-table-column prop="address" label="时间" width="100"></el-table-column> -->
            <el-table-column prop="commission" :label="$t('message.commissios')" width="100"></el-table-column>

            <el-table-column prop="rebate" :label="$t('message.Internalreturn')" width="150"></el-table-column>
            <el-table-column :label="$t('message.total')">
              <template slot-scope="scope">{{scope.row.commission + scope.row.rebate}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import notdata from '@/components/common/notdata';
export default {
  data() {
    return {

      datearr: '',
      tableData: [],
      showdate: false,
      screen: {
        startDate: '', //开始时间
        endDate: '', //结束时间
        rating: sessionStorage.tradeLoginId == undefined ? ' ' : sessionStorage.tradeLoginId //交易账户
      },
      mratings: '',
      url: '',
    };
  },
  created() {
    this.$api.user.usertradeAccounts({}, res => {
      this.mratings = res.data.list;
    });
    this.writeCurrentDate()
    this.havedata()

  },
  components: {
    notdata
  },
  methods: {
    writeCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      if (month < 10) month = 0 + month;
      var time = "";
      time = year + "-" + month + "-" + date;
      this.datearr = [time, time]
      console.log(time)
    },
    havedata() {

      var attrs = {};

      if (this.screen.rating != '') {
        attrs.tradeAccountId = this.screen.rating;
      }

      attrs.start = this.datearr[0];
      attrs.end = this.datearr[1];

      this.$api.user.usercommissionReport(attrs, res => {
        this.tableData = res.data.list;
      });
    },
    Determine_screening() {
      this.havedata();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';

.search-top {
  justify-content: space-between;
  align-items: center;
}

.disabledbox {
  max-height: 400px;
  overflow: auto;

  .iconfont {
    font-size: 12px !important;
  }

  .onelist:hover {
    background: $hovercolor;
    color: $text-color;
    cursor: pointer;
  }

  .onelist {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px $bordercolor solid;
    padding: 10px;
  }
}

.rbox {
  text-align: center;
}
</style>
