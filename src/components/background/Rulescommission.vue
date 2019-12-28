<template>
<div class="box-list table-container">
  <div class="top-l strong">
    <span>{{$t('leftlist.title4')}}</span>
    <el-button type="primary" @click="newadd()">{{$t('button.add')}}</el-button>
  </div>
  <notdata v-if="tableData == [] || tableData.length == 0" :datatext="$t('message.notdata')"></notdata>
  <el-table stripe v-if="tableData != [] && tableData.length != 0" :data="tableData" border style="width: 100%">
    <el-table-column prop="name" :label="$t('message.RuleName')"></el-table-column>
    <el-table-column prop="relationCount" :label="$t('message.Associatedaccount')"></el-table-column>
    <!-- <el-table-column prop="inviteCode" label="邀请码" ></el-table-column> -->
    <el-table-column fixed="right" :label="$t('message.operation')" width="142">
      <template slot-scope="scope">
        <el-button-group>
          <el-tooltip :content="$t('message.examine')" placement="top">
            <el-button type="primary" @click="lookat(scope.row.id)" icon="el-icon-view"></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.relationCount == 0" :content="$t('message.change')" placement="top">
            <el-button type="primary" @click="handleClick(scope.row.id)" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip v-if="!scope.row.defaultValue" :content="$t('message.delete')" placement="top">
            <el-button v-if="scope.row.relationCount == 0" @click="del(scope.row.id)" type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
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
      tableData: []
    };
  },
  created() {
    this.commissionfun();
  },
  methods: {
    lookat(id) {
      this.$router.push({
        path: '/Rulesiscommission',
        query: {
          id,
          type: 'look'
        }
      });
    },
    commissionfun() {
      this.$api.user.commissionlist({}, res => {
        this.tableData = res.data.list;
      });
    },
    handleClick(id) {
      this.$router.push({
        path: '/Rulesiscommission',
        query: {
          id
        }
      });
    },
    newadd() {
      this.$router.push({
        path: '/Rules'
      });
    },
    del(id) {
      this.$confirm(this.$t('message.isdel'), this.$t('hint.hint'), {
          confirmButtonText: this.$t('message.affirm'),
          cancelButtonText: this.$t('button.cancel'),
          type: 'warning'
        })
        .then(() => {
          this.$api.user.commissiondelete({
              id: id
            },
            res => {
              this.$message({
                type: 'success',
                message: this.$t('Rulescommission.hint1')
              });
              this.commissionfun();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('Rulescommission.hint2')
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';

.box-list {
  border: 1px $bordercolor solid;
  border-radius: 5px;
  background: $text-color;

  .top-l {
    background: $text-color;
    border-radius: 5px;
    padding: 10px;
    color: $enterprisecolor;
    display: flex;
    justify-content: space-between;
  }
}

.box-list:hover {
  box-shadow: 1px 1px 1px 1px $backgroundstyle;
}
</style>
