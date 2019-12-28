<template>
      <div>
  
         <commonheader :title="$t('message.newcustomer')"></commonheader>
        <!-- <div class="container" v-show="!commissionshow">
            <Choosecommission @shoutalter="shoutalter" :id="params.commissionId"></Choosecommission>
        </div> -->
        <!-- :before-close="handleClose" -->
        <el-dialog :title="$t('message.commission')" :visible.sync="commissionshow">
            <Choosecommission
                @shoutalter="shoutalter"
                :id="params.commissionId"
                ref="Choosecommission"
            ></Choosecommission>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="commissionshow = false">取 消</el-button>
                <el-button type="primary" @click="commissionshow = false">确 定</el-button>
            </span>-->
        </el-dialog>
        <!-- :before-close="handleClose" -->
        <el-dialog :title="$t('adduser.hint4')" :visible.sync="newcommissionshow">
            <newcommission @haveid="haveid" ref="newcommission"></newcommission>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="newcommissionshow = false">取 消</el-button>
                <el-button type="primary" @click="newcommissionshow = false">确 定</el-button>
            </span>-->
        </el-dialog>
        <!-- v-show="commissionshow" -->
        <div class="form-container">
            <el-row>
                <el-col :span="24" v-show="linkshow" class="tb-margin">
                    <!-- <el-card :span="24" shadow="hover" class="mgb20"> -->
                        <!-- <div slot="header" class="clearfix">
                            <span>{{$t('adduser.hint1')}}</span>
                            <el-button
                                @click="copy()"
                                class="lr-margin r-float"
                                type="primary"
                            >{{$t('adduser.hint2')}}</el-button>
                        </div> -->
                        <div class="flex">
                            <el-input
                                @change="changdata()"
                                readonly
                                v-model="alllink"
                                :placeholder="$t('adduser.hint5')"
                            ></el-input>
                             <el-button
                                @click="copy()"
                                class="lr-margin r-float"
                                type="primary"
                            >{{$t('adduser.hint2')}}</el-button>
                            <el-button
                                class="lr-margin"
                                v-clipboard:copy="alllink"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"
                                type="primary"
                            >{{$t('button.copylink')}}</el-button>
                           
                            
                        </div>
                    <!-- </el-card> -->
                </el-col>
                <el-col
                    :xs="24" :sm="24" :md="24" :lg="14" :xl="14" >
                    <!-- <el-card :span="24" shadow="hover" class="mgb20"> -->
                        <div class="">
                            <el-form ref="form" :model="params" label-width="150px" label-position="left" size="medium">

                                <el-form-item :label="$t('adduser.hint6')" class="fullwidth">
                                    <div class="flex-sb">
                                        <div style="flex: 1;">
                                            <el-select
                                                class="fullwidth"
                                                v-model="params.commissionId"
                                                @change="changecommission"
                                                :placeholder="$t('message.Pleasechoose')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in commissionlist"
                                                    :key="i"
                                                    :label="e.name"
                                                    :value="e.id"
                                                    v-show="!e.defaultValue"
                                                ></el-option>
                                            </el-select>
                                        </div>
                                        <div>
                                            <el-button
                                                class="margin-l-10"
                                                size="medium"
                                                type="primary"
                                                @click="cheackcommission"
                                            >{{$t('adduser.hint3')}}</el-button>
                                            <el-button
                                                class="margin-l-10"
                                                size="medium"
                                                @click="lookcommission"
                                            >{{$t('adduser.hint4')}}</el-button>
                                        </div>
                                    </div>



                                </el-form-item>
                                <el-form-item :label="$t('message.lastname')">
                                    <el-input @change="changdata()" v-model="params.lastName"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.surName')">
                                    <el-input @change="changdata()" v-model="params.surName"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.othernames')">
                                    <el-input @change="changdata()" v-model="params.nickName"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.cellphonenumber')">
                                    <el-input @change="changdata()" v-model="params.phone"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.mail')">
                                    <el-input @change="changdata()" v-model="params.email"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.marketleve')">
                                    <el-select
                                        @change="changdata()"
                                        v-model="params.rating"
                                        :placeholder="$t('message.Pleasechoose')"
                                        class="fullwidth"
                                    >
                                        <el-option
                                            v-for="(e,i) in levelclass"
                                            :key="i"
                                            :label="e"
                                            :value="e"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('message.country')">
                                    <!-- <el-select
                                        @change="changdata()"
                                        v-model="params.phoneCtCode"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="(e,i) in columns"
                                            :key="i"
                                            :label="e.displayName"
                                            :value="e.code"
                                        ></el-option>
                                    </el-select>-->

                                    <el-select
                                        v-model="countryname"
                                        class="fullwidth"
                                        @change="changdata('country')"
                                        filterable
                                        allow-create
                                        default-first-option
                                        :placeholder="$t('message.Pleasechoose')"
                                    >
                                        <el-option
                                            v-for="(e,i) in columns"
                                            :key="i"
                                            :label="e.displayName"
                                            :value="e.code"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="国家区号">
                        <el-select  @change="changdata()" v-model="params.region" placeholder="请选择">
                            <el-option v-for="(e,i) in levelclass" :key="i" :label="e" :value="e"></el-option>
                        </el-select>
                                </el-form-item>-->
                                <el-form-item :label="$t('message.countrycode')">
                                    <el-input
                                        @change="changdata()"
                                        v-model="params.phoneCtCode"

                                    ></el-input>
                                </el-form-item>
                                <!-- <el-form-item :label="$t('adduser.hint7')">
                                    <el-input @change="changdata()" v-model="params.state"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('adduser.hint8')">
                                    <el-input @change="changdata()" v-model="params.city"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('adduser.hint9')">
                                    <el-input @change="changdata()" v-model="params.employerName"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('adduser.hint10')">
                                    <el-input @change="changdata()" v-model="params.compAddress"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('adduser.hint11')">
                                    <el-input @change="changdata()" v-model="params.department"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('adduser.hint12')">
                                    <el-input @change="changdata()" v-model="params.position"></el-input>
                                </el-form-item>-->
                                <el-form-item style="padding-top: 30px">
                                    <el-button style="width: 180px" type="primary" @click="register(1)" size="medium">{{text}}</el-button>
                                    <el-button style="width: 180px" @click="back" size="medium">{{$t('button.cancel')}} </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    <!-- </el-card> -->
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import commonheader from '@/components/common/commonheader';
import Choosecommission from '@/components/common/Choosecommission';
import newcommission from '@/components/common/newcommission';
export default {
    name: 'baseform',
    data() {
        return {
            dsa: 'dsad',
            text: this.$t('message.save'),
            copetext: '', //拷贝链接
            // isshowcopylink: false,
            issave: false,
            activeNames: '1',
            id: '',
            cheackid: this.$route.query.cheackid, //获得id
            showcite: false,
            showlevel: false,
            commissionshow: false, //外佣规则是否显示
            rulesdetails: false,
            commissionlist: [], //外佣规则列表
            commissionname: '', //外佣规则名称
            radio: 1,
            result: [],
            levelclass: '',
            columns: [],
            // titles: this.$t("message.adduser"),
            countryname: '',
            params: {
                city: '', //城市
                commissionId: '', //外佣规则id
                compAddress: '', //公司地址
                country: '', //国家/地区
                department: '', //所属部门
                email: '', //邮箱
                employerName: '', //公司名称
                lastName: '', //姓
                nickName: '', //其他名字
                phone: '', //手机号码
                phoneCtCode: '', //国家区号
                position: '', //岗位
                rating: '', //销售评级
                state: '', //州/省
                surName: '', //名
                saveType: '' // 保存方式
            },
            userdataid: this.$route.query.id,
            alllink: '',
            newcommissionshow:false,
            linkshow:false
        };
    },
    components: {
        Choosecommission,
        newcommission,
        commonheader
    },
    created() {
        this.$api.user.commissionlist({}, res => {
            this.commissionlist = res.data.list;
            if (this.cheackid) {
                this.commissionlist.forEach(e => {
                    if (e.id == this.cheackid) {
                        this.params.name = e.name;
                        this.commissionname = e.name;
                        this.params.commissionId = e.id;
                        // this.isshowcopylink = true;
                    }
                });
            }
            
        });
        this.$api.matches.systemratings({}, res => {
            this.levelclass = res.data.list;
        });
        if (this.userdataid != undefined) {
            this.$api.user.contactinfo(
                {
                    id: this.userdataid
                },
                res => {
                    this.params.compAddress = res.data.info.address;
                    this.params.department = res.data.info.a;
                    this.params.city = res.data.info.city, //城市
                        this.params.commissionId = res.data.info.commissionId, //外佣规则id
                        this.params.country = res.data.info.country, //国家/地区
                        this.params.email = res.data.info.email, //邮箱
                        this.params.employerName = res.data.info.employerName, //公司名称
                        this.params.lastName = res.data.info.lastName, //姓
                        this.params.nickName = res.data.info.nickName, //其他名字
                        this.params.phone = res.data.info.phone, //手机号码
                        this.params.phoneCtCode = res.data.info.phoneCtCode, //国家区号
                        this.params.position = res.data.info.position, //岗位
                        this.params.rating = res.data.info.rating, //销售评级
                        this.params.state = res.data.info.state, //州/省
                        this.params.surName = res.data.info.surName; //名
                    if (this.params.commissionId != '') {
                        // this.saveid(this.params.commissionId);
                         this.changecommission()
                     this.linkshow = true
                    }
                   
                }
            );
        }
        this.$api.matches.countries({}, res => {
            this.columns = res.data.list;
            if (this.userdataid != undefined) {
                this.$api.user.contactinfo(
                    {
                        id: this.userdataid
                    },
                    res => {
                        this.params.phoneCtCode = res.data.info.phoneCtCode;
                        this.columns.forEach(e => {
                            if (e.code == this.params.phoneCtCode) {
                                this.countryname = e.displayName;
                                this.params.phoneCtCode = e.code;
                                this.params.country = e.name;
                            }
                        });
                    }
                );
                //this.changdata();
            }
        });
    },
    methods: { back(){
            this.$router.push('/Toactivate')
        },
        haveid(id) {
            this.$api.user.commissionlist({}, res => {
                this.commissionlist = res.data.list;
                if (id) {
                    this.commissionlist.forEach(e => {
                        if (e.id == id) {
                            this.params.name = e.name;
                            this.commissionname = e.name;
                            this.params.commissionId = e.id;
                            // this.isshowcopylink = true;
                        }
                    });
                }
            });
            this.newcommissionshow = false;
        },
        changecommission() {
            console.log(this.params.commissionId);
            this.params.saveType = 2;
            this.register(3);
            this.linkshow = true
        },
        changdata(typename) {
            if (typename == 'country') {
                this.columns.forEach(e=>{
                    if ( this.countryname == e.code   ) {
                        
                        this.params.country = e.name
                        this.params.phoneCtCode = e.code
                    }
                })
               
            }
            var lengths = 0;
            var num = 0;
            //  || (this.params.phone != '' && this.params.phone != null)
            if (this.params.email != '' && this.params.email != null) {
                this.params.saveType = 3;
                this.text = this.$t('button.saveinvite');
            } else {
                this.params.saveType = 1;
                this.text = this.$t('message.save');
            }
            for (let key of Object.keys(this.params)) {
                lengths++;
                let mealName = this.params[key];
                if (mealName == '') {
                    num++;
                }
            }
            if (num == lengths) {
                this.issave = false;
            } else {
                this.issave = true;
            }
        },
        copy() {
            this.params.saveType = 2;
            this.register();
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
        shoutalter() {
            this.commissionshow = false;
        },
        cheackcommission() {
            if (!this.params.commissionId) {
                this.$message({
                    type: 'error',
                    message: this.$t('adduser.hint13')
                });
                return;
            } else {
                this.commissionshow = true;
                this.$nextTick(() => {
                    this.$refs.Choosecommission.showlist();
                });
            }
            console.log(this.params.commissionId);
        },
        lookcommission() {
             this.newcommissionshow = true;
            this.$nextTick(() => {
                this.$refs.newcommission.newdata();
            });

           
        },
        register(number) {
            if (this.params.phone) {
                 if ( !this.isRealNum(this.params.phone)) {
                this.$message('請輸入手機號')
                return
            }
            }
            if (number == 1) {
            //     if (!this.linkshow) {
            //      this.$message({ type: 'warning', message:this.$t('adduser.hint14')  });
            //      return
            // }
                if ((this.params.email != '' && this.params.email != null) || (this.params.phone != '' && this.params.phone != null)) {
                    this.params.saveType = 3;
                    this.text = this.$t('button.saveinvite');
                    if (this.params.commissionId == '') {
                        this.$message({ type: 'warning', message: this.$t('message.Pleasechoose') + this.$t('message.commission') });

                        return;
                    }
                } else {
                    this.params.saveType = 1;
                    this.text = this.$t('message.save');
                }
            }
            if (number == 3) {
                this.$api.user.contactsave(
                    {
                        saveType: 2,
                        commissionId: this.params.commissionId
                    },
                    res => {
                        this.alllink = res.data.url;
                        
                    }
                );
                return
            }
            if (this.userdataid != undefined) {
                this.params.id = this.userdataid;
            }

            this.$api.user.contactsave(this.params, res => {
                if (this.params.saveType == 1) {
                    this.$message({
                        type: 'success',
                        message: this.$t('message.success')
                    });
                    if (number == 1) {
                 
                        this.params.saveType = 1;
                        this.$router.push('/Toactivate');
                    }
                    //  location.reload()
                } else if (this.params.saveType == 2) {
                    this.alllink = res.data.url;
                    this.$nextTick(function() {
                        // document.getElementById('danhao').select(); // 选择对象
                        // document.execCommand('Copy'); // 执行浏览器复制命令
                        this.$message({
                            type: 'success',
                            message: this.$t('message.success')
                        });
                    });
                    if (number == 1) {
                 
                        this.params.saveType = 1;
                        this.$router.push('/Toactivate');
                    }
                } else if (this.params.saveType == 3) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                       this.params.saveType = 1;
                      this.$router.push('/Toactivate')
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.list-center {
    align-items: end;
    button {
        margin: 0px 10px;
    }
}
</style>