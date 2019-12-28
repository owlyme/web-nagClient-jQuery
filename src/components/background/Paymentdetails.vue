<template>
  <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="单号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="账户类型">
    </el-table-column>
    <el-table-column
      prop="address"
      label="账户货币">
    </el-table-column>
    <el-table-column
      prop="tradeLoginId"
      label="交易账户">
    </el-table-column>
    <el-table-column
      prop="address"
      label="交易平台">
    </el-table-column>
    <el-table-column
      prop="address"
      label="服务器">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="时间">
    </el-table-column>
    <el-table-column
      prop="address"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="payMethod"
      label="方式">
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="amount"
      :label="$t('message.money')">
    </el-table-column>
    <el-table-column
      prop="address"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="address"
      label="所属IB账户">
    </el-table-column>
    <el-table-column
      prop="address"
      label="客户经理姓名">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created () {
      this.$api.user.paytransLogs({}, res => {
      this.tableData = res.data.list;
    });
    }
  }
</script>