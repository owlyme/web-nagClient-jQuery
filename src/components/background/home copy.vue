<template>
  <div>
    <el-row class="top-one">
      <el-col :span="24">
        <div class="flex home-header">
          <div class="h-l flex">
            <div class="l-name">{{info.lastName}}</div>
            <div class="flex flexcolumn flexbox">
              <div>
                <span>{{info.displayName}}</span>
                <el-tag
                  v-if="info.idUploaded == 'AUDIT_UPLOADED'"
                  type="success"
                >{{info.approvedDisplay}}</el-tag>
                <el-tag
                  v-if="info.idUploaded == 'AUDIT_APPROVE_REJECTED'"
                  type="warning"
                >{{info.approvedDisplay}}</el-tag>
                <el-tag
                  v-if="info.idUploaded == 'AUDIT_NOT_UPLOAD'"
                  type="danger"
                >{{info.approvedDisplay}}</el-tag>
              </div>
              <router-link to="/user">{{$t("message.Authentication")}}</router-link>
            </div>
          </div>
          <div class="h-r flex">
            <router-lick class="shortcut" tag="div">入金</router-lick>
            <router-lick class="shortcut" tag="div">入金</router-lick>
            <router-lick class="shortcut" tag="div">入金</router-lick>
          </div>
        </div>
      </el-col>
    </el-row>
    <h4>数据总览</h4>
    <el-row class="top-margin">
      <el-col :span="24" class="flex top-tow">
        <div class="flex home-tow">
          <i class="iconfont icon-xinzengkehu"></i>

          <div class="flex flexcolumn home-tow-r">
            <span>1</span>
            <div>
              <span>今日新增客户</span>
              <el-divider></el-divider>
              <span>昨日新增客户:5</span>
            </div>
          </div>
        </div>
        <div class="flex home-tow">
          <i class="iconfont icon-kehu"></i>
          <div class="flex flexcolumn home-tow-r">
            <span>1</span>
            <div>
              <span>今日新增客户</span>
              <el-divider></el-divider>
              <span>昨日新增客户:5</span>
            </div>
          </div>
        </div>
        <div class="flex home-tow">
          <i class="iconfont icon-web-icon-"></i>
          <div class="flex flexcolumn home-tow-r">
            <span>1</span>
            <div>
              <span>今日新增客户</span>
              <el-divider></el-divider>
              <span>昨日新增客户:5</span>
            </div>
          </div>
        </div>
        <div class="flex home-tow">
          <i class="iconfont icon-daibanshixiang"></i>
          <div class="flex flexcolumn home-tow-r">
            <span>1</span>
            <div>
              <span>今日新增客户</span>
              <el-divider></el-divider>
              <span>昨日新增客户:5</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="top-one top-margin">
      <el-col :span="24">
        <div class="flex home-header">
          <div class="flex flexcolumn boxone">
            <span class="weight strong">{{commissionProfit}}</span>
            <span class="top-margin">{{$t('message.TodayIncome')}}</span>
          </div>
          <div class="flex flexcolumn boxone">
            <span class="weight strong">{{contactCount}}</span>
            <span class="top-margin">{{$t('message.Newactivatedmonth')}}</span>
          </div>
          <div class="flex flexcolumn boxone">
            <span class="weight strong">{{userCount}}</span>
            <span class="top-margin">{{$t('message.monthactivated')}}</span>
          </div>
          <!-- <div class="flex flexcolumn boxone">
            <span class="weight strong">100</span>
            <span class="top-margin">待跟进客户</span>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <el-row class="top-margin">
      <el-col :span="24">
        <div class="flex table-box">
          <div class="table-list">
            <div class="flex boxheader">
              <span class="strong">佣金贡献排行版</span>
              <el-button plain>近30日</el-button>
            </div>
            <el-table :data="tableData" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="排名"></el-table-column>
              <el-table-column prop="name" label="贡献佣金"></el-table-column>
              <el-table-column prop="address" label="IB名称"></el-table-column>
            </el-table>
          </div>
          <div class="table-list">
            <div class="flex boxheader">
              <span class="strong">佣金贡献排行版</span>
              <el-button plain>近30日</el-button>
            </div>
            <el-table :data="tableData" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="排名"></el-table-column>
              <el-table-column prop="name" label="贡献佣金"></el-table-column>
              <el-table-column prop="address" label="IB名称"></el-table-column>
            </el-table>
          </div>
          <div class="table-list">
            <div class="flex boxheader">
              <span class="strong">佣金贡献排行版</span>
              <el-button plain>近30日</el-button>
            </div>
            <el-table :data="tableData" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="排名"></el-table-column>
              <el-table-column prop="name" label="贡献佣金"></el-table-column>
              <el-table-column prop="address" label="IB名称"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    this.$api.user.userinfo({}, res => {
      this.info = res.data.info;
    });
    this.$api.user.userstat({}, res => {
      this.commissionProfit = res.data.commissionProfit
      this.contactCount = res.data.contactCount
      this.userCount = res.data.userCount
      
    });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/style/_style.scss";
.top-one {
  padding: 1rem;
  border: 1px solid $bordercolor;
}
.home-header {
  justify-content: space-between;
  align-items: center;
  .flexbox {
    justify-content: space-around;
  }
}
.l-name {
  text-align: center;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  border-radius: 50%;
  border: 1px solid $bordercolor;
  margin: 0 10px;
}
.h-r {
  width: 50%;
  flex-wrap: wrap;
  justify-content: space-around;
  .shortcut {
    text-align: center;
    border: 1px solid $bordercolor;
    width: 20%;
    height: 2rem;
    line-height: 2rem;
    padding: 1rem;
    margin: 10px;
  }
}
.top-tow {
  justify-content: space-between;
}
.home-tow {
  align-content: center;
  border: 1px solid $bordercolor;
  padding: 1rem;
  border-radius: 5px;

  i {
    font-size: 5rem;
  }
  .home-tow-r {
    text-align: center;
    .el-divider--horizontal {
      margin: 5px 0px;
    }
  }
}
.boxone {
  text-align: center;
}
.table-box {
  justify-content: space-between;
  .table-list {
    border: 1px solid $bordercolor;
  }
}
.boxheader {
  justify-content: space-between;
  padding: 10px;
  background: $backgroundstyle;
}
</style>