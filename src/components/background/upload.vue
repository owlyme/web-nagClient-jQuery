<template>
<div class="table-container">

  <div class="container">
    <div class="handle-box">{{$t('message.Authentication')}}</div>

    <el-table stripe :data="state" border class="table" ref="multipleTable">
      <el-table-column :label="$t('upload.hint2')" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <!-- <el-table-column label="提交时间" align="center">
            <template slot-scope="scope">￥{{scope.row.money}}</template>
        </el-table-column> -->
      <el-table-column :label="$t('accountdetails.hint5')" align="center">
        <template slot-scope="scope">
          {{scope.row.state}}
          <span v-show="scope.$index == 0 && scope.row.isapprove">
            ({{scope.row.text}})
          </span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('message.operation')" align="center" :width="actionColWidth">
        <template slot-scope="scope">
          <el-button size="small" v-show="scope.$index == 0 && scope.row.idUploaded" style="margin:0px 10px 0px 0px" type="info" icon="el-icon-upload">
            {{$t('upload.hint')}}</el-button>
          <el-button size="small" v-show="scope.$index == 0 && !scope.row.idUploaded" style="margin:0px 10px 0px 0px" type="primary" @click="goupdata" icon="el-icon-upload">
            {{$t('upload.hint')}}</el-button>
          <!--
            <el-button v-show="scope.$index == 1 && scope.row.idUploaded" type="primary" @click="goupdata"  icon="el-icon-upload">
            {{scope.row.state}}</el-button>

            <el-button v-show="scope.$index == 1 && !scope.row.idUploaded" type="primary" @click="goupdata"  icon="el-icon-upload">
            可以上传</el-button> -->

          <el-button size="small" v-show="scope.$index == 1 && scope.row.idUploaded" style="margin:0px 10px 0px 0px" type="info" icon="el-icon-upload">
            {{$t('upload.hint')}}</el-button>

          <el-button size="small" v-show="scope.$index == 1 && !scope.row.idUploaded" style="margin:0px 10px 0px 0px" type="primary" @click="goupdata" icon="el-icon-upload">
            {{$t('upload.hint')}}</el-button>
          <!-- <el-button-group>
                <el-button type="primary" @click="goupdata"  v-show="scope.row.idUploaded == 'AUDIT_UPLOADED'" icon="el-icon-upload">{{$t('upload.hint')}}</el-button>

                <el-button type="info" disabled  v-show="scope.row.approved" icon="el-icon-upload">{{$t('upload.hint')}}</el-button>
                    <el-button type="primary" icon="el-icon-share">更新</el-button>
                <el-button type="primary" @click="goupdata" v-show="!scope.row.updata && scope.row.idUploaded == 'AUDIT_APPROVE_REJECTED'" icon="el-icon-upload">{{$t('button.Uploadagain')}}</el-button>

                <el-button type="primary" @click="goupdata" v-show="!scope.row.updata && scope.row.idUploaded == 'AUDIT_NOT_UPLOAD'" icon="el-icon-upload">{{$t('upload.hint')}}</el-button>
            </el-button-group>  -->
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="container">
    <div class="handle-box flex">
      <span> {{$t('upload.hint1')}}</span>
      <router-link to="/addwithdraw?from=upload">
        <el-button type="primary" plain style="margin-top: -20px">{{$t('message.new')}}</el-button>
      </router-link>
    </div>

    <notdata :datatext="$t('upload.hint3')" v-show="backlist == [] || backlist == ''"></notdata>
    <el-table stripe :data="backlist" border class="table" ref="multipleTable" v-show="backlist != [] && backlist != ''">
      <el-table-column :label="$t('message.CardNo')" align="center">
        <template slot-scope="scope">{{scope.row.bankNumber}}</template>
      </el-table-column>
      <el-table-column :label="$t('upload.hint4')" align="center">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column :label="$t('message.banckname')" align="center">
        <template slot-scope="scope">{{scope.row.bankName}}</template>
      </el-table-column>
      <el-table-column :label="$t('message.operation')" align="center" :width="actionColWidth">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small" type="primary" icon="el-icon-edit" @click="editVisiblefn(scope.row)"> {{$t('message.examine')}}</el-button>
            <!-- <el-button type="primary" icon="el-icon-share">更新</el-button>
                            <el-button type="primary" icon="el-icon-delete">删除</el-button> -->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑弹出框 -->
  <el-dialog :title="$t('upload.hint5')" :visible.sync="editVisible" width="30%">
    <bankinfo :datalist='row' ref="bankinfos"></bankinfo>
  </el-dialog>
</div>
</template>

<script>
import bankinfo from '@/components/common/bankinfo';
import notdata from '@/components/common/notdata';
export default {
  components: {
    bankinfo,
    notdata
  },
  data() {
    return {
      actionColWidth: "150px",
      state: [{
          name: this.$t('upload.hint6'),
          state: '-',
          updata: false,
          idUploaded: false
        },
        // {
        //     name:this.$t('upload.hint7'),
        //     state:'-',
        //     updata:false,
        //     idUploaded:false
        // },
        {
          name: this.$t('upload.hint8'),
          state: '-',
          updata: false,
          idUploaded: false
        }
      ],
      info: [],
      editVisible: false,
      backlist: [],
      row: []
    };
  },
  created() {
    this.$api.user.bankAccountlist({}, res => {
      this.backlist = res.data.list;

    });
    this.$api.user.userinfo({}, res => {
      this.info = res.data.info;
      this.$nextTick(e => {
        this.state = [{
            name: this.$t('upload.hint6'),
            state: this.info.idUploadedDisplay,
            updata: this.info.approved,
            idUploaded: this.info.approved,
            text: this.info.approveRejectedRemark,
            isapprove: this.info.approveRejected
          }
          // ,{
          //     name:this.$t('upload.hint7'),
          //     state:this.info.idStatusDisplay,
          //     updata: this.info.approved,
          //     idUploaded:this.info.approved
          // }
          , {
            name: this.$t('upload.hint8'),
            state: this.info.infoFilledDisplay,
            updata: this.info.approved,
            idUploaded: this.info.approved,
            text: this.info.approveRejectedRemark,
            isapprove: this.info.approveRejected
          }
        ]
      })
    });
  },
  methods: {
    editVisiblefn(row) {

      //   this.$refs.bankinfos.datalists()
      //     this.editVisible = true

      this.editVisible = true
      this.$nextTick(() => {
        this.row = JSON.stringify(row)
        this.$refs.bankinfos.datalists()

      })

    },
    goupdata() {
      this.$router.push({
        path: '/Information',
        query: {
          id: this.info.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';

.handle-box {
  height: 22px;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: flex-end;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
