<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card :span="24" class="mgb20">
        <div class="flex search-top flexwrap form-inline-container">

          <el-form :inline="true" class="demo-form-inline form-inline-container">
            <el-form-item :label="$t('message.tradingaccount')">
              <el-select v-model="screen.tradeLoginId" :placeholder="$t('message.Pleasechoose')">
                <el-option v-for="item in mratings" :label="item.tradeLoginId" :value="item.tradeLoginId"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('message.creardtime')">
              <el-select class v-model="screen.dateType" :placeholder="$t('message.Pleasechoose')" @change="changedate()">
                <el-option v-for="item in datelist" :label="item.datename" :value="item.datevalue"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('Toactivate.hint')" v-show="showdate" >
              <el-date-picker class="lr-margin"  v-model="datearr" type="daterange" value-format="yyyy-MM-dd" range-separator="-" :start-placeholder="$t('Toactivate.hint2')" :end-placeholder="$t('Toactivate.hint3')"></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button class="lr-margin" type="success" icon="el-icon-search" @click="Determine_screening()"></el-button>
            </el-form-item>
          </el-form>

        </div>
        <notdata v-if="tableData == [] || tableData.length == 0" :datatext="$t('message.notdata')"></notdata>
        <div class="table-container">
          <el-table stripe v-if="tableData != [] && tableData.length != 0" :data="tableData" height="500" border style="width: 100%">
            <el-table-column prop="deal" :label="$t('transactionrecord.hint')"></el-table-column>
            <el-table-column prop="login" :label="$t('message.tradingaccount')"></el-table-column>
            <el-table-column prop="time" :label="$t('transactionrecord.hint1')"></el-table-column>
            <el-table-column prop="address" :label="$t('accountdetails.hint4')">
              <template slot-scope="scope">
                {{scope.row.action == 1?'Sell':'Buy'}}
              </template>

            </el-table-column>
            <el-table-column prop="symbol" :label="$t('transactionrecord.hint2')"></el-table-column>
            <el-table-column prop="volumeclosed" :label="$t('transactionrecord.hint3')">
              <template slot-scope="scope">
                {{scope.row.volumeclosed/10000}}
              </template>
            </el-table-column>
            <el-table-column prop="priceposition" :label="$t('transactionrecord.hint4')"></el-table-column>
            <!-- <el-table-column prop="address" label="S/L"></el-table-column>
                            <el-table-column prop="address" label="T/P"></el-table-column> -->
            <el-table-column prop="price" :label="$t('transactionrecord.hint5')"></el-table-column>
            <el-table-column prop="storage" :label="$t('transactionrecord.hint6')"></el-table-column>
            <el-table-column prop="profit" :label="$t('transactionrecord.hint7')"></el-table-column>
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
  components: {
    notdata
  },
  data() {
    return {
      tableData: [],
      datelist: [{
          datename: this.$t('time.thismonth'),
          datevalue: 1
        },
        {
          datename: this.$t('time.currentseason'),
          datevalue: 2
        },
        {
          datename: this.$t('time.thisyear'),
          datevalue: 3
        },
        {
          datename: this.$t('time.yesterday'),
          datevalue: 4
        },
        {
          datename: this.$t('time.today'),
          datevalue: 5
        },
        {
          datename: this.$t('time.thisweek'),
          datevalue: 6
        },
        {
          datename: this.$t('time.lastweek'),
          datevalue: 7
        },
        {
          datename: this.$t('time.lastmonth'),
          datevalue: 8
        },
        {
          datename: this.$t('transactionrecord.hint8'),
          datevalue: 10
        },
        {
          datename: this.$t('transactionrecord.hint9'),
          datevalue: 11
        },
        {
          datename: this.$t('transactionrecord.hint10'),
          datevalue: 12
        },
        {
          datename: this.$t('transactionrecord.hint11'),
          datevalue: 13
        },
        {
          datename: this.$t('transactionrecord.hint12'),
          datevalue: 14
        },
        {
          datename: this.$t('time.custom'),
          datevalue: 9
        },
      ],
      datearr: '',
      showdate: false,
      mratings: '',
      screen: {
        dateType: '', //创建时间
        startDate: '', //开始时间
        endDate: '', //结束时间
        tradeLoginId: sessionStorage.tradeLoginId == undefined ? ' ' : sessionStorage.tradeLoginId
      }
    };
  },
  created() {

    this.$api.user.usertradeAccounts({}, res => {
      this.mratings = res.data.list;
      this.havedata();
    });

  },
  methods: {
    changedate() {
      if (this.screen.dateType != 9) {
        this.showdate = false;
      } else {
        this.showdate = true;
      }
    },
    havedata() {
      var attrs = {};
      if (this.screen.dateType != '') {
        attrs.dateType = this.screen.dateType;
      }
      if (this.screen.tradeLoginId != '') {
        attrs.tradeLoginId = this.screen.tradeLoginId;
      }
      if (this.screen.rating != '') {
        attrs.rating = this.screen.rating;
      }
      if (this.screen.dateType == 9) {
        attrs.startDate = this.datearr[0];
        attrs.endDate = this.datearr[1];
      }

      this.$api.user.paymt5TradeLogs(attrs, res => {
        this.tableData = res.data.list;
        console.log(this.tableData[0]);
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
</style>
