<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card :span="24" shadow="hover" class="mgb20">
                    <div class="plugins-tips">{{$t('replenished.hint')}}</div>
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="18">
                                <el-card :span="24" shadow="hover" class="mgb20">
                                    <div slot="header" class="clearfix">
                                        <span>{{$t('replenished.hint1')}}</span>
                                    </div>
                                    <!-- class="user-info-list flex idbox flexjustify" -->
                                    <el-row>
                                        <!-- <el-col  class="tb-margin infotext">
                                            <span>{{$t('replenished.hint2')}}:{{info.displayName}}</span>
                                        </el-col>-->
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('message.phone')}}:{{info.phone?info.phone:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('message.mail')}}:{{info.email?info.email:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('message.Accountcurrency')}}:{{info.currency?info.currency:'-'}}</span>
                                        </el-col>
                                        <!-- <el-col  class="tb-margin infotext">
                                            <span>{{$t('message.nationality')}}:{{info.country}}</span>
                                        </el-col>-->
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('message.country')}}:{{info.country?info.country:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('adduser.hint7')}}:{{info.state?info.state:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('adduser.hint8')}}:{{info.city?info.city:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('message.site')}}:{{info.address?info.address:'-'}}</span>
                                        </el-col>
                                        <el-col class="tb-margin infotext">
                                            <span>{{$t('signup.birthdate')}}:{{info.birthday?info.birthday:'-'}}</span>
                                        </el-col>
                                        <!-- <el-col  class="tb-margin infotext">
                                            <span>{{$t('replenished.hint3')}}:{{info.zipCode}}</span>
                                        </el-col>-->
                                        <el-col class="tb-margin infotext">
                                            <el-dropdown @command="handleCommand">
                                                <span class="el-dropdown-link">
                                                    {{$t('message.marketleve')}}:{{info.rating?info.rating:'-'}}
                                                    <i
                                                        class="el-icon-arrow-down el-icon--right"
                                                    ></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item
                                                        v-for="(e,i) in mratings"
                                                        :command="e"
                                                    >{{e}}</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                            <!-- <el-dropdown @command="changerating">
                                                <span class="el-dropdown-link">
                                                    销售等级:{{info.rating}}
                                                    <i
                                                        class="el-icon-arrow-down el-icon--right"
                                                    ></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown" >
                                                    <el-dropdown-item  v-for="(e,i) in mratings">{{e}}</el-dropdown-item>

                                                </el-dropdown-menu>
                                            </el-dropdown>-->
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card :span="24" shadow="hover" class="mgb20">
                                    <div slot="header" class="clearfix">
                                        <span>{{$t('replenished.hint4')}}</span>
                                    </div>
                                    <div class="user-info-list flex lr-box">
                                        <span> {{$t('message.Authentication')}}:</span>
                                        <span>{{info.idUploadedDisplay}}</span>
                                    </div>
                                    <div class="user-info-list flex lr-box">
                                        <span> {{$t('message.perfect_information')}}:</span>
                                        <span>{{info.infoFilledDisplay}}</span>
                                    </div>
                                    <!-- <div class="user-info-list flex lr-box">
                                        <span>其他:</span>
                                        <span>未提交</span>
                                    </div>-->
                                </el-card>
                            </el-col>
                            <el-col :span="18">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane :label="$t('message.uprecords')" name="1">
                                        <el-col :span="20">
                                            <el-input type="textarea" v-model="form.desc"></el-input>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-button
                                                type="success"
                                                @click="issue()"
                                                style="width:100%"
                                            >{{$t('replenished.hint5')}}</el-button>
                                        </el-col>
                                        <el-col :span="24" class="rw-box market-trend-box">
                                            <notdata
                                                v-if="rwlist == [] || rwlist.length == 0"
                                                :datatext="$t('message.notdata')"
                                            ></notdata>
                                            <div
                                                v-if="rwlist != [] && rwlist.length != 0"
                                                v-for="(e,i) in rwlist"
                                                class="flex flexcolumn rw tb-margin"
                                            >
                                                <div class="flex flexcolumn rw-t">
                                                    <div>
                                                        <div class="strong">{{e.relationName}}</div>
                                                        <div class="rw-time">
                                                            <span>{{e.createTime}}</span>
                                                            <span>{{e.operateClient}}</span>
                                                        </div>
                                                    </div>
                                                    <div>{{e.content}}</div>
                                                </div>
                                                <div class="rw-ft flex rw-b">
                                                    <span class="del" @click="del(e.id)">{{$t('message.delete')}}</span>
                                                    <!-- <span>任務</span> -->
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-tab-pane>

                                    <el-tab-pane :label="$t('replenished.hint6')" name="5">
                                        <el-form
                                            ref="form"
                                            class="flex xxlist"

                                            label-width="80px"
                                        >
                                            <el-form-item :label="$t('logMessage.hint')">
                                                <el-input disabled  v-model="info.displayName"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('message.mail')">
                                                <el-input disabled  v-model="info.email"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('adduser.hint9')">
                                                <el-input disabled  v-model="xxlist.name"></el-input>
                                            </el-form-item>
                                            <!-- <el-form-item :label="公司网址 $t('logMessage.hint')">
                                                <el-input disabled v-model="xxlist.name"></el-input>
                                            </el-form-item> -->
                                            <el-form-item :label="$t('adduser.hint11')">
                                                <el-input disabled  v-model="xxlist.name"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('adduser.hint12')">
                                                <el-input disabled  v-model="xxlist.name"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('message.country')">
                                                <el-input disabled  v-model="info.country"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('adduser.hint7')">
                                                <el-input disabled  v-model="info.state"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('signup.birthdate')">
                                                <el-input disabled  v-model="info.birthday"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('message.cellphonenumber')">
                                                <el-input disabled  v-model="info.phone"></el-input>
                                            </el-form-item>
                                            <!-- <el-form-item :label="其他号码 $t('logMessage.hint')">
                                                <el-input disabled  v-model="xxlist.name"></el-input>
                                            </el-form-item> -->
                                            <el-form-item :label="$t('adduser.hint8')">
                                                <el-input disabled  v-model="info.city"></el-input>
                                            </el-form-item>
                                            <el-form-item :label="$t('message.marketleve')">
                                                <el-dropdown @command="handleCommand">
                                                    <span class="el-dropdown-link">
                                                        {{info.rating}}
                                                        <i
                                                            class="el-icon-arrow-down el-icon--right"
                                                        ></i>
                                                    </span>
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item
                                                            v-for="(e,i) in mratings"
                                                            :command="e"
                                                        >{{e}}</el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown>
                                            </el-form-item>
                                            <!-- <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
                                            </el-form-item>-->
                                        </el-form>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
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
            // tableData: [],
            userid: this.$route.query.id,
            isactivate:this.$route.query.isactivate,
            info: [],
            mratings: [],
            activeName: '1',
            form: [
                {
                    desc: ''
                }
            ],
            xxlist: [{}],
            rwlist: [], //任务列表
            countrieslist:JSON.parse(sessionStorage.countries)
        };
    },

    created() {
        console.log(this.isactivate)
        // this.$api.user.paytransLog(this.userid,{
        //      id: this.userid
        // }, res => {
        //     console.log(res);
        //     this.tableData = res.data.list;
        // });
        this.showfollowLoglist();
        // if(this.isactivate == true){
        //     this.$api.user.paytransLogs(
        //     {
        //         id: this.userid
        //     },
        //     res => {
        //         this.tableData = res.data.list;
        //     }
        // );
        // }


        this.$api.user.contactinfo(
            {
                id: this.userid
            },
            res => {
                this.info = res.data.info;

                var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(this.info.birthday)

                this.info.birthday = newDate[0]
                if (this.countrieslist) {

                        this.countrieslist.forEach(e => {
                            if ( this.info.country == e.name) {
                                 this.info.country = e.displayName;
                            }

                    });
                }
            }
        );
        this.$api.matches.systemratings({}, res => {
            this.mratings = res.data.list;
        });
    },
    methods: {
        issue() {
              if (!this.form.desc) {
                  this.$message(this.$t('err.completiontasks'));
                  return
            }
            this.$api.user.followLogadd(
                {
                    content: this.form.desc,
                    relationId: this.userid,
                    type: 1,
                    operateClient: 'Web'
                },
                res => {
                    this.form.desc = ''
                    this.showfollowLoglist();
                }
            );
        },
        del(id) {
            this.$confirm(this.$t('message.isdel')+'?', this.$t('hint.hint'), {
                confirmButtonText: this.$t('message.affirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning'
            })
                .then(() => {
                    this.$api.user.followLogdelete(
                        {
                            id
                        },
                        res => {
                            this.$message({
                                type: 'success',
                                message: this.$t('Rulescommission.hint1'),
                            });
                            this.showfollowLoglist();
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('Rulescommission.hint2'),
                    });
                });
        },
        showfollowLoglist() {
            this.$api.user.followLoglist(
                {
                    relationId: this.userid,
                    type: 1
                },
                res => {
                    this.rwlist = res.data.list;
                }
            );
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        handleCommand(type) {
            console.log(type);
            this.$api.user.contactmodifyRating(
                {
                    id: this.userid,
                    rating: type
                },
                res => {
                    this.info.rating = type;
                }
            );
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.idbox {
    justify-content: space-between;
    flex-wrap: wrap; /*换行*/
    font-size: 14px;
    color: #999;
}
.lr-box {
    justify-content: space-between;
    span {
        margin: 0px;
    }
}
.rw-box {
    max-height: 500px;
    overflow: auto;
}
.rw {
    border: 1px solid $fontcolor;
    padding-top: 10px;
    border-radius: 10px;
    .rw-t {
        padding: 10px;
    }
    .rw-b {
        padding: 10px;
    }
    .rw-time {
        color: $fontcolor;
        font-size: 0.5rem;
    }
    .rw-ft {
        background: $bordercolor;
        color: $allfont;
        flex-direction: row-reverse;
        border-radius: 0px 0px 10px 10px;
        span {
            font-size: 0.5rem;
            margin: 0px 10px;
        }
        .del {
            color: $delcolor;
        }
    }
}
.xxlist {
    flex-wrap: wrap; /*换行*/
}
</style>