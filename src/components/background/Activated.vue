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
        </el-form>

        <!-- <div class="flex search-top flexwrap">
                        <div class="top-margin inputlist flex search-top">
                            <div class="lr-margin">
                            <span class="input-title lr-margin">{{$t('message.marketleve')}}</span>
                            <el-select v-model="screen.rating" :placeholder="$t('message.Pleasechoose')">
                                <el-option v-for="item in mratings" :label="item" :value="item"></el-option>
                            </el-select>
                            </div>
                            <div class="lr-margin">
                            <span class="input-title lr-margin">{{$t('message.Stateinvitation')}}</span>
                            <el-select v-model="screen.inviteStatus" :placeholder="$t('message.Pleasechoose')">
                                <el-option
                                    v-for="item in invitattype"
                                    :label="item.name"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            </div>
                            <div class="lr-margin">
                            <span class="input-title lr-margin">{{$t('message.creardtime')}}</span>
                            <el-select
                            class=""
                                v-model="screen.dateType"
                                :placeholder="$t('message.Pleasechoose')"
                                @change="changedate()"
                            >
                                <el-option
                                    v-for="item in datelist"
                                    :label="item.datename"
                                    :value="item.datevalue"
                                ></el-option>
                            </el-select>
                            </div>
                        </div>
                        <div class="block top-margin">
                            <span v-show="showdate" class="demonstration lr-margin">{{$t('Toactivate.hint')}}</span>
                            <el-date-picker
                            class="lr-margin"
                                v-show="showdate"
                                v-model="datearr"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="-"
                                :start-placeholder="$t('Toactivate.hint2')"
                                :end-placeholder="$t('Toactivate.hint3')"
                            ></el-date-picker>
                            <el-button
                            class="lr-margin"
                                type="success"
                                icon="el-icon-search"
                                @click="Determine_screening()"
                                circle
                            ></el-button>
                        </div>
                    </div> -->

        <div class="table-container">
          <el-table class="top-margin" stripe :data="tableData" height="500" border style="width: 100%">
            <!-- <el-table-column flex prop="approvedDisplay" :label="$t('Toactivate.hint4')" width="100"></el-table-column> -->
            <!-- <el-table-column flex prop="--" label="資料狀態" width="100"></el-table-column> -->
            <!-- <el-table-column prop="lastName" :label="$t('message.lastname')"></el-table-column>
                <el-table-column prop="surName" :label="$t('message.surName')"></el-table-column> -->
            <el-table-column prop="displayName" :label="$t('logMessage.hint')">
              <template slot-scope="scope">
                {{scope.row.displayName == 'nullnull'?'-':scope.row.displayName}}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="employerName" label="公司"></el-table-column> -->
            <!-- <el-table-column prop="displayName" label="客户姓名"></el-table-column> -->
            <!-- <el-table-column prop="address" label="任务"></el-table-column> -->
            <!-- <el-table-column prop="address" :label="$t('Toactivate.hint5')" width="100"></el-table-column> -->

            <el-table-column prop="email" :label="$t('message.mail')" width="150"></el-table-column>
            <el-table-column prop="phone" :label="$t('message.cellphonenumber')"></el-table-column>
            <!-- <el-table-column prop="address" :label="$t('Toactivate.hint6')"></el-table-column> -->
            <!-- <el-table-column prop="payMethod" label="来源"></el-table-column>
                <el-table-column prop="remarks" label="账户货币"></el-table-column> -->
            <el-table-column prop="rating" :label="$t('message.marketleve')"></el-table-column>

            <!-- <el-table-column prop="state" :label="$t('adduser.hint7')"></el-table-column> -->
            <!-- <el-table-column prop="country" :label="$t('message.country')"></el-table-column> -->
            <!-- <el-table-column prop="city" :label="$t('adduser.hint8')"></el-table-column> -->
            <!-- <el-table-column prop="commissionId" :label="$t('message.namemaid')"></el-table-column>  -->
            <el-table-column prop="createTime" :label="$t('Toactivate.hint7')" width="150"></el-table-column>

            <!-- <el-table-column prop="inviteTime" :label="$t('Toactivate.hint8')" width="150"></el-table-column> -->
            <el-table-column prop="updateTime" :label="$t('Toactivate.hint9')" width="150"></el-table-column>
            <!-- <el-table-column prop="address" label="销售经理"></el-table-column> -->
            <el-table-column fixed="right" prop="id" :label="$t('message.operation')">
              <template slot-scope="scope">

                <el-button class="tb-margin" type="primary" size="small" @click="showdetails(scope.row.id)">
                  <i class="el-icon-lx-profile"></i>
                </el-button>

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
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('Toactivate.hint12'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('Toactivate.hint13'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      datearr: "",
      tableData: [],
      showdate: false,
      datelist: [{
          datename: this.$t("time.thismonth"),
          datevalue: 1
        },
        {
          datename: this.$t("time.currentseason"),
          datevalue: 2
        },
        {
          datename: this.$t("time.thisyear"),
          datevalue: 3
        },
        {
          datename: this.$t("time.yesterday"),
          datevalue: 4
        },
        {
          datename: this.$t("time.today"),
          datevalue: 5
        },
        {
          datename: this.$t("time.thisweek"),
          datevalue: 6
        },
        {
          datename: this.$t("time.lastweek"),
          datevalue: 7
        },
        {
          datename: this.$t("time.lastmonth"),
          datevalue: 8
        },
        {
          datename: this.$t("time.custom"),
          datevalue: 9
        }
      ],
      invitattype: [{
          name: this.$t("message.Unsentinvitation"),
          value: 1
        },
        {
          name: this.$t("message.Invitationsent"),
          value: 2
        },
        {
          name: this.$t("message.invitationbeenaccepted"),
          value: 3
        },
        {
          name: this.$t("message.Invitationaccepted"),
          value: 4
        }
      ],
      screen: {
        dateType: "", //创建时间
        inviteStatus: "", //邀请状态
        startDate: "", //开始时间
        endDate: "", //结束时间
        rating: "", //客户级别筛选
        key: ''
      },
      mratings: [],
      countrieslist: JSON.parse(sessionStorage.countries)
    };
  },
  created() {
    this.$api.matches.systemratings({}, res => {
      this.mratings = res.data.list;
    });
    this.havedata();
  },
  methods: {
    showdetails(id) {

      this.$router.push({
        path: '/activateddetails',
        query: {
          id,
          isactivate: true
        }
      });
    },
    changedate() {
      console.log(this.screen.dateType)
      if (this.screen.dateType == 9) {
        this.showdate = true
      } else {
        this.showdate = false
      }
    },
    havedata() {
      // if (this.tableData != '') {
      //   this.screen.startDate = this.tableData[0]
      //   this.screen.endDate = this.tableData[1]
      // }

      var attrs = {};
      if (this.screen.key != "") {
        attrs.key = this.screen.key;
      }
      if (this.screen.dateType != "") {
        attrs.dateType = this.screen.dateType;
      }
      if (this.screen.inviteStatus != "") {
        attrs.inviteStatus = this.screen.inviteStatus;
      }
      if (this.screen.rating != "") {
        attrs.rating = this.screen.rating;
      }
      if (this.screen.dateType == 9) {
        attrs.startDate = this.datearr[0]
        attrs.endDate = this.datearr[1]

      }

      this.$api.user.userlist(attrs, res => {
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
@import "@/style/_style.scss";
</style>
