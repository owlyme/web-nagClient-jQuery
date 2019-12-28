<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card :span="24" class="mgb20">
        <el-form :inline="true" class="demo-form-inline form-inline-container">
          <el-form-item label="關鍵詞">
            <el-input v-model="screen.key" style="width:180px" placeholder="用戶名/電話/郵箱"></el-input>
          </el-form-item>

          <el-form-item :label="$t('message.marketleve')">
            <el-select v-model="screen.rating" :placeholder="$t('message.Pleasechoose')">
              <el-option v-for="item in mratings" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.Stateinvitation')">
            <el-select v-model="screen.inviteStatus" :placeholder="$t('message.Pleasechoose')">
              <el-option v-for="item in invitattype" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('message.creardtime')">
            <el-select class v-model="screen.dateType" :placeholder="$t('message.Pleasechoose')" @change="changedate()">
              <el-option v-for="item in datelist" :label="item.datename" :value="item.datevalue"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-show="showdate" :label="$t('Toactivate.hint')">
            <el-date-picker v-model="datearr" type="daterange" value-format="yyyy-MM-dd" range-separator="-" :start-placeholder="$t('Toactivate.hint2')" :end-placeholder="$t('Toactivate.hint3')"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="Determine_screening()"></el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit()">{{$t('message.new')}}</el-button>
          </el-form-item>
        </el-form>

        <div class="table-container">
          <el-table stripe :data="tableData" height="500" border style="width: 100%" :default-sort="{prop: 'createTime', order: 'descending'}">

            <el-table-column align="left" flex prop="displayStatus" :label="$t('Toactivate.hint4')"></el-table-column>
            <!-- <el-table-column flex prop="displayStatus" label="+資料" width="100"></el-table-column> -->
            <el-table-column align="left" prop="lastName" :label="$t('message.lastname')"></el-table-column>
            <el-table-column align="left" prop="surName" :label="$t('message.surName')"></el-table-column>
            <!-- <el-table-column align="left" prop="displayName" :label="$t('message.othernames')">
                                <template slot-scope="scope" >
                                    {{scope.row.displayName == 'null null'?'-':scope.row.displayName}}
                                </template>
                            </el-table-column> -->
            <!-- <el-table-column align="left" prop="employerName" label="公司"></el-table-column> -->
            <!-- <el-table-column align="left" prop="displayName" label="客户姓名"></el-table-column> -->
            <!-- <el-table-column align="left" prop="address" label="任务"></el-table-column> -->
            <!-- <el-table-column width="120px" align="left" prop="address" :label="$t('Toactivate.hint5')" ></el-table-column> -->
            <el-table-column align="left" prop="email" :label="$t('message.mail')"></el-table-column>
            <el-table-column align="left" prop="phone" :label="$t('message.cellphonenumber')"></el-table-column>
            <!-- <el-table-column align="left" prop="address" :label="$t('Toactivate.hint6')"></el-table-column> -->
            <!-- <el-table-column align="left" prop="payMethod" label="来源"></el-table-column>
                            <el-table-column align="left" prop="remarks" label="账户货币"></el-table-column>-->
            <el-table-column align="left" prop="rating" :label="$t('message.marketleve')"></el-table-column>
            <el-table-column align="left" prop="state" :label="$t('adduser.hint7')"></el-table-column>
            <el-table-column align="left" prop="country" :label="$t('message.country')"></el-table-column>
            <el-table-column align="left" prop="city" :label="$t('adduser.hint8')"></el-table-column>
            <el-table-column align="left" prop="createTime" :label="$t('Toactivate.hint7')"></el-table-column>
            <el-table-column align="left" prop="inviteTime" :label="$t('Toactivate.hint8')"></el-table-column>
            <!-- <el-table-column prop="updateTime" label="+注冊時間" width="150"></el-table-column>
                            <el-table-column prop="address" label="+销售经理"></el-table-column> -->
            <el-table-column align="left" fixed="right" prop="id" :label="$t('message.operation')" min-width="230">
              <template slot-scope="scope">
                <!-- flex flexcolumn rbox -->
                <div class="flex">
                  <el-button-group>
                    <el-popover placement="right" trigger="click" v-if="!scope.row.registered && scope.row.showCopy">
                      <div class="disabledbox">
                        <!-- class="onelist" -->
                        <div>
                          <span>{{url}}</span>
                          <el-button v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError" type="primary">{{$t('Toactivate.hint1')}}</el-button>
                        </div>
                      </div>
                      <!-- style="width:100%" -->
                      <el-button type="primary" @click="copylink(scope.row)" slot="reference">
                        <el-tooltip :content="$t('adduser.hint2')" placement="top">
                          <i class="iconfont icon-80"></i>
                        </el-tooltip>
                      </el-button>
                    </el-popover>
                    <el-tooltip :content="$t('message.invite')" placement="top">
                      <el-button type="primary" icon="iconfont icon-youjian" v-if="!scope.row.registered && scope.row.showInvite" @click="handleClick(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip :content="$t('Toactivate.hint10')" placement="top">
                      <el-button type="primary" icon="iconfont icon-genjin" @click="showdetails(scope.row.id)"></el-button>
                    </el-tooltip>
                    <el-tooltip v-if="!scope.row.registered" :content="$t('message.change')" placement="top">
                      <el-button @click="changedata(scope.row.id)" type="primary" icon="iconfont icon-xiugai"></el-button>
                    </el-tooltip>
                  </el-button-group>
                  <!-- <el-tooltip content="邀请" placement="top">
                                            <el-button
                                                class="tb-margin"
                                                size="small"
                                                v-if="!scope.row.registered && scope.row.showInvite"
                                                @click="handleClick(scope.row)"
                                            >
                                                <i class="iconfont icon-youjian"></i>
                                            </el-button>
                                        </el-tooltip>
                                        <el-tooltip content="编辑" placement="top">
                                            <el-button
                                                class="tb-margin"
                                                type="success"
                                                size="small"
                                                @click="showdetails(scope.row.id)"
                                            >
                                                <i class="el-icon-edit"></i>
                                            </el-button>
                                        </el-tooltip>
                                        <el-tooltip content="修改" placement="top">
                                            <el-button
                                                class="tb-margin"
                                                type="danger"
                                                size="small"
                                                @click="showdetails(scope.row.id)"
                                            >
                                                <i class="el-icon-edit"></i>
                                            </el-button>
                                        </el-tooltip>-->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
            text: this.$t('Toactivate.hint11'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('Toactivate.hint12'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('Toactivate.hint13'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      datearr: '',
      tableData: [],
      showdate: false,
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
          datename: this.$t('time.custom'),
          datevalue: 9
        }
      ],
      invitattype: [{
          name: this.$t('message.Unsentinvitation'),
          value: 1
        },
        {
          name: this.$t('replenished.hint13'),
          value: 2
        },
        {
          name: this.$t('message.invitationbeenaccepted'),
          value: 3
        },
        {
          name: this.$t('message.Invitationaccepted'),
          value: 4
        }
      ],
      screen: {
        dateType: '', //创建时间
        inviteStatus: '', //邀请状态
        startDate: '', //开始时间
        endDate: '', //结束时间
        rating: '', //客户级别筛选
        key: ''
      },
      disabledList: {}, //规则列表
      mratings: '',
      contactId: '', //被邀请人id
      url: '',
      countrieslist: JSON.parse(sessionStorage.countries)
      //alllink: ''
    };
  },
  created() {
    this.$api.matches.systemratings({}, res => {
      this.mratings = res.data.list;
    });
    this.havedata();
    this.$api.user.commissionlist({}, res => {
      this.disabledList = res.data.list;
    });
    // this.$api.user.contactsave({}, res => {
    //     console.log(res);
    //     this.alllink = res.data.url;
    // });
  },
  methods: {
    onSubmit() {
      this.$router.push({
        path: '/adduser',
      });
    },
    changedata(id) {
      this.$router.push({
        path: '/changeuser',
        query: {
          id
        }
      });
    },
    showdetails(id) {
      this.$router.push({
        path: '/details',
        query: {
          id,
          isactivate: false
        }
      });
    },
    useraddcommission(id) {
      //确认用户添加规则
      this.$api.user.contactinvite({
          commissionId: id,
          contactId: this.contactId
        },
        res => {
          this.$message({
            type: 'success',
            message: this.$t('message.success')
          });
        }
      );
    },
    onError() {
      this.$message({
        type: 'error',
        message: 'error'
      });
    },
    onCopy(num) {
      this.$message({
        type: 'success',
        message: 'Success'
      });
    },
    copylink(num) {
      //复制链接

      this.url = '';
      this.$api.user.contactinvite({
          contactId: num.id,
          inviteType: 2
        },
        es => {
          console.log(es);
          this.url = es.data.url;
        }
      );
    },
    handleClick(num) {
      //邀请客户
      this.contactId = num.id;
      this.$api.user.contactinvite({
          contactId: num.id,
          inviteType: 3
        },
        e => {
          this.$message({
            type: 'success',
            message: e.message
          });
          console.log(e);
        }
      );
      // this.$alert('', "HTML 片段", {
      //   dangerouslyUseHTMLString: true,
      //   confirmButtonText: "保存"
      // });
    },
    changedate() {
      if (this.screen.dateType != 9) {
        this.showdate = false;
      } else {
        this.showdate = true;
      }
    },
    havedata() {
      // if (this.tableData != '') {
      //   this.screen.startDate = this.tableData[0]
      //   this.screen.endDate = this.tableData[1]
      // }

      var attrs = {};
      if (this.screen.key != '') {
        attrs.key = this.screen.key;
      }
      if (this.screen.dateType != '') {
        attrs.dateType = this.screen.dateType;
      }
      if (this.screen.inviteStatus != '') {
        attrs.inviteStatus = this.screen.inviteStatus;
      }
      if (this.screen.rating != '') {
        attrs.rating = this.screen.rating;
      }
      if (this.screen.dateType == 9) {
        attrs.startDate = this.datearr[0];
        attrs.endDate = this.datearr[1];
      }

      this.$api.user.contactlist(attrs, res => {
        this.tableData = res.data.list;
        if (this.countrieslist) {
          this.tableData.forEach(el => {
            this.countrieslist.forEach(e => {
              if (el.country == e.name) {
                el.country = e.displayName;
              }
            });
          });
        }
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
