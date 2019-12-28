<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20">
                    <div slot="header" class="clearfix titlepadding">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>{{$t('footer.home')}}</el-breadcrumb-item>
                            <el-breadcrumb-item>{{$t('leftlist.title2')}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="flex header-top">
                        <div class="h-l flex">
                            <!-- <div
                                class="l-name"
                            >{{!info.lastName?info.email.substr(0,3) :info.lastName}}</div>-->
                            <div class="l-name">
                                <img src="@/assets/img/avatar.jpg" />
                            </div>
                            <div class="flex flexcolumn flexbox infobox flexjustifybetween">
                                <div class="tb-margin">
                                    <span
                                        style="font-size:20px"
                                    >{{!info.lastName?info.email:info.displayName}}</span>
                                </div>
                                <div class="flex">
                                    <el-tag v-if="isdemo"  type="info">{{demoname}}</el-tag>
                                    <router-link v-if="isdemo" :to="'/Information?id='+info.id">
                                        <el-tag>{{$t('home.createdlive')}}</el-tag>
                                    </router-link>
                                    <router-link
                                        v-show="!isdemo && !info.approved "
                                        :to="'/Information?id='+info.id"
                                    >
                                        <el-tag>{{$t('home.certification')}}</el-tag>
                                    </router-link>

                                    <router-link
                                        v-show="info.idUploaded == 'AUDIT_APPROVE_REJECTED'"
                                        :to="'/Information?id='+info.id"
                                    >
                                        <el-tag>{{$t('button.Uploadagain')}}</el-tag>
                                    </router-link>

                                    <!-- <div v-if="!isdemo">
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
                                    </div>-->
                                    <div v-if="!isdemo">
                                        <el-tag
                                            v-if="info.approved"
                                            type="success"
                                        >{{info.userWholeStatusDisplay}}</el-tag>
                                        <el-tag
                                            class="lr-margin"
                                            v-if="!info.approved"
                                            type="warning"
                                        >{{info.userWholeStatusDisplay}}</el-tag>
                                        <!-- <el-tag
                                            v-if="info.idUploaded == 'AUDIT_NOT_UPLOAD'"
                                            type="danger"
                                        >{{info.approvedDisplay}}</el-tag>-->
                                    </div>

                                    <!-- <span v-show="showtime" class="lr-margin">提现时间:{{nftime}}</span> -->
                                </div>

                                <!-- <router-link class="lr-margin" to="/user">{{$t("message.Authentication")}}</router-link> -->
                            </div>
                        </div>

                        <div class="flex" v-show="!isdemo" style="padding-top: 10px">
                            <div
                                @click="opengo"
                                class="shortcut flex flexcolumn"
                                v-show="!businessshow && info.approved "
                            >
                                <img src="@/assets/img/t7.png" alt />
                                <div>{{$t('home.opensw')}}</div>
                            </div>

                            <router-link
                                v-show="businessshow && info.approved"
                                to="Toactivate"
                                class="shortcut flex flexcolumn"
                                tag="div"
                            >
                                <!-- <i class="el-icon-lx-people "></i> -->
                                <img src="@/assets/img/t1.png" alt />
                                <div>{{$t('home.Toactivate')}}</div>
                            </router-link>
                            <router-link
                                v-show="businessshow && info.approved"
                                to="Activated"
                                class="shortcut flex flexcolumn"
                                tag="div"
                            >
                                <img src="@/assets/img/t2.png" alt />
                                <div>{{$t('home.Activatedcustomer')}}</div>
                            </router-link>
                            <router-link to="deposit" class="shortcut flex flexcolumn" tag="div">
                                <img src="@/assets/img/t3.png" alt />
                                <div>{{$t('message.Deposit')}}</div>
                            </router-link>
                            <router-link to="withdraw" class="shortcut flex flexcolumn" tag="div">
                                <img src="@/assets/img/t4.png" alt />
                                <div>{{$t('message.withdraw')}}</div>
                            </router-link>
                            <router-link
                                to="upload"
                                class="shortcut flex flexcolumn"
                                tag="div"
                                v-show="info.idUploaded != 'AUDIT_NOT_UPLOAD'"
                            >
                                <img src="@/assets/img/t5.png" alt />
                                <div>{{$t('message.userinfo')}}</div>
                            </router-link>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" v-show="showalter">
                    <div class="flex-sb" style="margin-bottom: 8px">
                        <div>{{$t('home.opensw')}}</div>
                        <div>
                            <i @click="showalter = false" class="el-icon-close"></i>
                        </div>
                    </div>
                    <!-- interval="10000" -->
                    <el-carousel indicator-position="outside" height="653px">
                        <el-carousel-item v-for="(item,i) in lblist" :key="i">
                            <img :src="item.img" alt />

                            <div class="inner-bt">
                                <div class="inner-bg">
                                    <h1>{{item.h1}}</h1>
                                    <p v-html="item.p"></p>
                                </div>
                                <div class="bt">
                                    <sliderV :successFun="openbusiness"></sliderV>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </el-card>
                <!-- <el-card
                    shadow="hover"
                    v-show="!businessshow && info.idUploaded == 'AUDIT_APPROVE_REJECTED' || !isdemo && info.idUploaded == 'AUDIT_NOT_UPLOAD' || isdemo || !businessshow && info.idUploaded == 'AUDIT_UPLOADED'"
                >-->
                <el-card
                    shadow="hover"
                    v-show="!businessshow ||
                     info.infoFilled && info.idUploaded && !info.approved ||
                      !info.infoFilled && !info.idUploaded && !info.approved ||
                      info.infoFilled && !info.idUploaded && !info.approved ||
                      !info.infoFilled && info.idUploaded && !info.approved
                      "
                >
                    <div slot="header" class="clearfix">
                        <span class="title-color">{{$t('home.hint')}}</span>
                        <p v-show="!isdemo && !info.approved">
                            {{$t('home.hint1')}}
                            <router-link
                                class="text-color"
                                tag="a"
                                :to="'/Information?id='+info.id"
                            >{{$t('home.hint2')}}</router-link>
                            {{$t('home.hint3')}}
                        </p>
                        <p v-show="isdemo">
                            {{$t('home.hint4')}}
                            <router-link
                                class="text-color"
                                tag="a"
                                :to="'/Information?id='+info.id"
                            >{{$t('home.hint5')}}</router-link>
                            ，{{$t('home.hint6')}}
                        </p>
                        <p
                            v-show="!isdemo && info.idUploaded == 'AUDIT_UPLOADED'"
                        >{{$t('home.hint7')}}</p>
                    </div>
                    <el-row :gutter="0" class="mgb20">
                        <el-col :span="12" class="img-box">
                            <img class="main-img" src="@/assets/img/h1.png" alt />
                            <p class="p-text">{{$t('home.hint14')}}</p>
                            <p class="p-text">{{$t('home.hint15')}}</p>
                            <button class="bt-style">{{$t('home.hint16')}}</button>
                        </el-col>
                        <el-col :span="4" class="img-box">
                            <img class="m-img" src="@/assets/img/h2.png" alt />
                        </el-col>
                        <el-col :span="8" class="text-main">
                            <div class="text-conter">
                                <h2 class="text-title">{{$t('home.hint16')}}</h2>
                                <!-- <h4 class="text-title2">Through NAG MT5 Platform, you can</h4> -->
                                <p class="text">
                                    <span class="strong">+</span>
                                    {{$t('home.hint17')}}
                                </p>
                                <p class="text">
                                    <span class="strong">+</span>
                                    {{$t('home.hint18')}}
                                </p>
                                <p class="text">
                                    <span class="strong">+</span>
                                    {{$t('home.hint19')}}
                                </p>
                                <p class="text">
                                    <span class="strong">+</span>
                                    {{$t('home.hint20')}}
                                </p>
                            </div>
                            <button class="bt-style">{{$t('home.hint21')}}</button>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card shadow="hover" v-show=" !isdemo && info.approved &&  businessshow">
                    <div slot="header" class="clearfix">
                        <span class="title-color">{{$t('home.hint8')}}</span>
                    </div>

                    <el-row :gutter="40" class="mgb20">
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <div class="ionic-img l">
                                        <img src="@/assets/img/t1.png" alt />
                                    </div>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{userCount}}</div>

                                        <div class="fontw fontc">{{$t('message.monthactivated')}}</div>
                                        <div class="fontw">{{$t('message.monthactivated')}}:--</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <div class="ionic-img m">
                                        <img src="@/assets/img/t2.png" alt />
                                    </div>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{contactCount}}</div>

                                        <div class="fontw fontc">{{$t('message.Newactivatedmonth')}}</div>
                                        <div class="fontw">{{$t('message.Newactivatedmonth')}}:--</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <div class="ionic-img r">
                                        <img src="@/assets/img/t6.png" alt />
                                    </div>

                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{commissionProfit || 0}}</div>

                                        <div class="fontw fontc">{{$t('message.TodayIncome')}}</div>
                                        <div class="fontw">{{$t('message.TodayIncome')}}:--</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <!-- <div class="flex m-list">
                        <div class="flex flexcolumn lr-margin flexcentr">
                            <span class="m-title">99</span>
                            <span>待跟进客户</span>
                        </div>
                        <div class="flex flexcolumn lr-margin flexcentr">
                            <span class="m-title">99</span>
                            <span>已开户总数</span>
                        </div>
                    </div>-->
                </el-card>
                <el-card shadow="hover" v-show="info.approved || isdemo " class="table-container">
                    <el-table :data="tableData" border style="width: 100%" stripe>
                        <el-table-column
                            align="left"
                            prop="tradeLoginId"
                            :label="$t('message.tradingaccount')"
                        ></el-table-column>
                        <el-table-column align="left" :label="$t('message.LeveragedAccounts')">
                            <template slot-scope="scope">1:{{scope.row.info.marginleverage}}</template>
                        </el-table-column>
                        <el-table-column
                            align="left"
                            prop="typeDisplay"
                            :label="$t('message.accounttype')"
                        ></el-table-column>
                        <el-table-column align="left" :label="$t('message.Accountcurrency')">
                            <template slot-scope="scope">USD</template>
                        </el-table-column>
                        <el-table-column
                            align="left"
                            prop="info.balance"
                            :label="$t('message.balance')"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            prop="info.floating"
                            :label="$t('message.floatingprofitandloss')"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            prop="info.credit"
                            :label="$t('message.CreditLimit')"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            prop="info.equity"
                            :label="$t('message.networth')"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            prop="info.marginfree"
                            :label="$t('message.UsableMargin')"
                        ></el-table-column>
                        <el-table-column
                            min-width="120"
                            align="left"
                            prop="info.marginlevel"
                            :label="$t('message.UsableMargin')+'%'"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            :resizable="false"
                            fixed="right"
                            :label="$t('message.operation')"
                            min-width="130"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    style="color: #00a3db;"
                                    type="text"
                                    @click="changegg(scope.row.tradeLoginId)"
                                    size="small"
                                >{{$t('home.hint10')}}</el-button>
                                <el-button
                                    style="color: #00a3db;"
                                    type="text"
                                    size="small"
                                    @click="changepassword(scope.row.tradeLoginId)"
                                >{{$t('title.changepassword')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

            <el-dialog
                :title="$t('home.hint11')"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item :label="$t('message.tradingaccount')">
                        <el-input disabled v-model="form.tradeAccountId"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.mail')">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.phone')">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">{{$t('button.cancel')}}</el-button>
                    <el-button type="primary" @click="subgo()">{{$t('message.affirm')}}</el-button>
                </span>
            </el-dialog>

            <el-dialog
                :title="$t('message.changetrade')"
                :visible.sync="showloginalter"
                width="30%"
                :before-close="handleClose"
            >
                <el-form ref="form" :model="changedata" label-width="120px">
                    <el-form-item :label="$t('message.accounttype')">
                        <el-select
                            class="fullwidth"
                            v-model="changedata.type"
                            :placeholder="$t('message.accounttype')"
                        >
                            <el-option v-for="(e,i) in actions" :key="i" :label="e.name" :value="e.value"></el-option>
                            <!-- <el-option label="区域二" value="beijing"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('message.newpassword')">
                        <el-input class="fullwidth" show-password v-model="changedata.password"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.Repeatnewpassword')">
                        <el-input
                            class="fullwidth"
                            show-password
                            v-model="changedata.repeatPassword"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showloginalter = false">{{$t('button.cancel')}}</el-button>
                    <el-button type="primary" @click="changepasswordfn()">{{$t('message.affirm')}}</el-button>
                </span>
            </el-dialog>

            <el-dialog
                :title="$t('home.hint10')"
                :visible.sync="showgg"
                width="30%"
                :before-close="handleClose"
            >
                <el-form ref="form" :model="gg" label-width="80px">
                    <el-form-item :label="$t('home.hint12')">
                        <el-select v-model="gg.leverage" :placeholder="$t('home.hint12')">
                            <el-option
                                v-for="(e,i) in otherExplist"
                                :key="i"
                                :label="e.key"
                                :value="e.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showgg = false ">{{$t('button.cancel')}}</el-button>
                    <el-button type="primary" @click="onChangeforExp()">{{$t('message.affirm')}}</el-button>
                </span>
            </el-dialog>

            <!--
            <el-dialog
                :visible.sync="showalter"
                width="100%"
                :before-close="handleClose">
                <el-carousel indicator-position="outside" interval="10000"  height="653px">
                    <el-carousel-item v-for="item in lblist" :key="item">
                            <img :src="item" alt="">
                            <div class="bt">
                                <sliderV :successFun="openbusiness"></sliderV>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
            </el-dialog>-->
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import sliderV from '@/components/common/sliderV.vue';

import bus from '../common/bus';
import banner from '@/i18n/homeProfile';
export default {
    data() {
        return {
          // demoname:'-',
            showalter: false,
            lblist: banner,
            businessshow: false,
            isdemo: false,
            otherExplist: [
                {
                    value: 100,
                    key: 100
                },
                {
                    value: 200,
                    key: 200
                },
                {
                    value: 400,
                    key: 400
                },
                {
                    value: 800,
                    key: 800
                }
            ],
            form: {
                email: '',
                phone: '',
                tradeAccountId: this.$route.query.tradeAccountId
            },
            changedata: {
                type: 1,
                password: '',
                repeatPassword: '',
                resetToken: this.$route.query.resetToken
            }, //修改密码数据
            name: localStorage.getItem('ms_username'),
            tableData: [],
            info: {
                email: 'demo'
            },
            commissionProfit: '--',
            contactCount: '--',
            userCount: '--',
            nftime: '--',
            showtime: false,
            dialogVisible: false,
            showloginalter: false,
            actions: [
                {
                    name: this.$t('message.Masterpassword'),
                    value: 1
                }
                // {
                //   name: this.$t('message.Investorpassword'),
                //   value:2
                // }
            ],
            gg: {
                tradeLoginId: '',
                leverage: ''
            },
            showgg: false
        };
    },
    created() {
        this.$api.matches.countries({}, e => {
            sessionStorage.countries = JSON.stringify(e.data.list);
        });
        this.$api.user.paytradeAccounts2(
            {
                userid: JSON.parse(sessionStorage.getItem('info')).id
            },
            res => {
                if (sessionStorage.tradeLoginId) {
                    if (sessionStorage.tradeLoginId.substr(0, 1) == 3) {
                        this.showtime = true;
                        this.nftime = res.data.ibActivateTime;
                    }
                }

                this.tableData = res.data.list;
            }
        );

        this.$api.user.userstat({}, res => {
            this.commissionProfit = res.data.commissionProfit;
            this.contactCount = res.data.contactCount;
            this.userCount = res.data.userCount;
        });
        this.$api.user.userinfo({}, res => {

            sessionStorage.info = JSON.stringify(res.data.info);
            sessionStorage.defaultTradeLoginId = res.data.info.defaultTradeLoginId
            this.info = res.data.info;
            this.isdemo = res.data.info.demo;
            // this.demoname = 'demo',
            this.businessshow = res.data.info.partner
            localStorage.businessshow = res.data.info.partner;
            // this.isdemo = true
            // if (res.data.info.infoFilled && res.data.info.idUploadedDisplay == 'AUDIT_UPLOADED' && !res.data.info.approved && !res.data.info.approveRejected) {
            //   console.log('審核中')
            //   return
            // }
            // if (!res.data.info.infoFilled && res.data.info.idUploadedDisplay == 'AUDIT_NOT_UPLOAD') {
            //   console.log('資料未上傳')
            //   return
            // }
            // if (res.data.info.approveRejected) {
            //   console.log('資料駁回')
            //   return
            // }
            // if (res.data.info.approved) {
            //   console.log('資料通過')
            //   return
            // }
            // if (!res.data.info.approved) {
            //   console.log('未認證')
            //   return
            // }
        });
    },
    components: {
        Schart,
        sliderV
    },
    // computed: {
    //     role() {
    //         return this.name === 'admin' ? '超级管理员' : '普通用户';
    //     }
    // },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        opengo() {

            this.showalter = true;
        },
        openbusiness() {
            this.$api.user.useropenPartner({}, e => {
                this.$message({
                    type: 'success',
                    message: this.$t('message.success')
                });
                localStorage.businessshow = true;
                this.businessshow = true;
                this.showalter = false;
            });
        },
        changegg(id) {
            this.gg.tradeLoginId = id;
            this.showgg = true;
        },
        onChangeforExp() {
            //切换账户杠杆
            this.$api.user.paymodifyLeverage(
                {
                    tradeLoginId: this.gg.tradeLoginId,
                    leverage: this.gg.leverage
                },
                res => {
                    this.$message({
                        type: 'info',
                        message: res.message
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                }
            );

            this.showforExp = false;
        },
        changepasswordfn() {
            if (this.changedata.password.length < 6) {
                this.$message({
                    type: 'error',
                    message: this.$t('replenished.hint17')
                });
                return;
            }
            if (this.changedata.password != this.changedata.repeatPassword) {
                this.$message({
                    type: 'error',
                    message: this.$t('message.Enteredpasswordsdiffer')
                });
                return;
            }
            this.$api.user.userresetTradePassword(this.changedata, res => {
                this.changedata.password = '';
                this.changedata.repeatPassword = '';
                this.$message({
                    type: 'success',
                    message: this.$t('message.success')
                });
                this.showloginalter = false;
            });
        },
        handleClose() {
            this.dialogVisible = false;
            this.showgg = false;
            this.showloginalter = false;
            this.showalter = false;
        },
        changepassword(loginid) {
            this.form.tradeAccountId = loginid;
            this.dialogVisible = true;
        },
        subgo() {
            if (this.form.email == '' || this.form.phone == '' || this.form.tradeAccountId == '') {
                this.$message({
                    type: 'error',
                    message: this.$t('err.completiontasks')
                });
                return;
            }
            this.$api.user.usergetResetTradePasswordToken(this.form, res => {
                this.changedata.resetToken = res.data.resetToken;
                this.dialogVisible = false;
                this.showloginalter = true;
            });
        }
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>

<style lang="scss" scoped>
@import '@/style/_style.scss';

.thstyle {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.shortcut {
    cursor: pointer;
    background: $style-background;
    text-align: center;
    border: 1px solid $bordercolor;
    min-width: 100px;
    align-items: center;
    height: 50px;
    // line-height: 2rem;
    padding: 8px;

    color: $text-color;
    font-size: 10px;

    i {
        font-size: 35px;
    }

    img {
        width: 30px;
        height: 30px;
    }
}

.titlepadding {
    padding: 0px;
}

.header-top {
    justify-content: space-between;
    align-items: center;
}

.home-header {
    justify-content: space-between;
    align-items: center;

    .flexbox {
        justify-content: space-around;
    }
}

.infobox {
    align-items: left;
    padding: 0rem 0px;
    font-size: 14px;
    margin-left: 20px;
}

.l-name {
    text-align: center;
    width: 83px;
    height: 83px;
    line-height: 83px;
    border-radius: 50%;
    // border: 1px solid $fontcolor;
    margin: 0 10px;
    color: $fontcolor;
    font-weight: 600;

    img {
        width: 83px;
        height: 83px;
        border-radius: 50%;
    }
}

.h-l {
    align-items: center;
}

.ionic-img {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
    background: $style-background;
}

.l {
    background: $style-background;
}

.m {
    background: $hovercolor;
}

.r {
    background: $enterprisecolor;
}

.el-divider--horizontal {
    margin: 0px;
}

.fontw {
    color: $fontcolorw;
    line-height: 28px;
}

.title-color {
    color: $style-background;
    font-size: 1.2rem;
    font-weight: 600;
}

.m-list {
    background: $bordercolor;
    padding: 10px;

    .m-title {
        color: $enterprisecolor;
        font-size: 30px;
        font-weight: 600;
    }
}

.img-box {
    text-align: center;

    .main-img {
        width: 80%;
        margin: 0 auto;
    }

    .m-img {
        width: 100%;
    }

    .p-text {
        font-size: 12px;
        margin: 5px 0px;
    }
}

.bt-style {
    background: $style-background;
    color: $text-color;
    padding: 10px;
    border: none;
}

.text-main {
    text-align: center;

    .text-conter {
        text-align: left;
        padding: 5% 0px;

        .text-title {
            color: $style-background;
            font-size: 25px;
        }

        .text-title2 {
            color: $style-background;
        }

        .text {
            font-size: 18px;
            margin: 5px 0px;
        }
    }

    .bt-style {
        margin: 0 auto;
    }
}

.el-carousel__item {
    height: 100%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item img {
    width: 100%;
    height: 100%;
}

.el-carousel__item {
    .inner-bt {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        padding: 2px 0px;
        border: none;
        bottom: 20px;
        left: 50%;
        height: 75%;
        cursor: pointer;
        width: 600px;
        margin-left: -300px;
        .inner-bg {
            background: rgba(60, 60, 60, 0.3);
        }
        h1 {
            padding-top: 30px;
            color: #ffffff;
            font-size: 30px;
            text-align: center;
            margin-bottom: 30px;
        }
        p {
            color: #ffffff;
            text-align: center;
            font-size: 20px;
            margin-bottom: 30px;
        }
    }

    // .inner-bt:hover {
    //     background: rgba(198, 216, 226, 0.88);
    // }
    .bt {
        margin: 0 auto;
        width: 330px;
        margin-bottom: 80px;
    }
    p {
      color: #ffffff;
      text-align: center;
      font-size: 20px;
      margin-bottom: 30px;
    }

  .bt {
    margin: 0 auto;
    width: 330px;
    margin-bottom: 80px;
  }
}

.fontc {
    display: inline-block;
    border-bottom: 1px solid #999999;
}

// .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//     background-color: #d3dce6;
// }
</style>
