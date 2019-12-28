<template>
    <el-row class="bg-class" :gutter="0">
        <el-col class="signbox" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-row :gutter="0">
                <el-col
                    class="padding-border size-auto"
                    :xs="24"
                    :sm="8"
                    :md="8"
                    :lg="8"
                    :xl="8"
                    :span="8"
                >
                    <el-container>
                        <el-header class="flex logo">
                            <a href="/">
                                <img class="lr-margin" src="../../assets/common/img/logo.png" alt />
                            </a>
                            
                            <!-- <span class="text">NAG</span> -->
                        </el-header>
                        <el-main>
                            <el-col
                                :xs="0"
                                :sm="24"
                                :md="24"
                                :lg="24"
                                :xl="24"
                                :span="24"
                                style="height: 300px;"
                            >
                                <el-steps
                                    direction="vertical"
                                    :active="active"
                                    finish-status="finish"
                                >
                                    <el-step :title="$t('signup.uploadPhotoid')"></el-step>
                                    <el-step :title="$t('signup.moreinfo')"></el-step>
                                    <el-step :title="$t('signup.questionnaire')"></el-step>
                                    <el-step :title="$t('button.ok')"></el-step>
                                </el-steps>
                            </el-col>
                            <el-col
                                class="border"
                                :xs="24"
                                :sm="0"
                                :md="0"
                                :lg="0"
                                :xl="0"
                                :span="24"
                            >
                                <el-steps :active="active" finish-status="finish">
                                    <el-step :title="$t('signup.uploadPhotoid')"></el-step>
                                    <el-step :title="$t('signup.moreinfo')"></el-step>
                                    <el-step :title="$t('signup.questionnaire')"></el-step>
                                    <el-step :title="$t('button.ok')"></el-step>
                                </el-steps>
                            </el-col>
                        </el-main>
                        <el-footer class="tbpadding">
                            <i class="el-icon-timer"></i>
                            {{$t('hint.Registrationprompt')}}
                        </el-footer>
                    </el-container>
                </el-col>
                <el-col
                    class="border size-auto market-trend-box"
                    :xs="24"
                    :sm="16"
                    :md="16"
                    :lg="16"
                    :xl="16"
                    :span="16"
                >
                    <div class="paddingbox" v-show="active == 0">
                        <el-header class="flex flexcolumn title">
                            <span class="text">{{$t('signup.uploadPhotoid')}}</span>
                            <p>{{$t('signup.hint')}}</p>
                            <!-- <p v-show="!cnEtc">如暂无护照,可以点击下一步,稍后上传</p> -->
                        </el-header>
                        <el-main>
                            <!-- v-show="cnEtc" -->
                            <el-row v-show="cnEtc" class="tb-margin" :gutter="10">
                                <el-col :span="4" class="center">{{$t('signup.font')}}</el-col>
                                <el-col :span="8" class="center positionrelative">
                                    <img src="../../assets/img/addfont.png" alt />
                                    <input
                                        class="file-input"
                                        name="file"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        @change="fontupdate"
                                    />
                                </el-col>
                                <el-col :span="12" class="center">
                                    <img :src="fontaimg" alt />
                                </el-col>
                            </el-row>
                            <!-- v-show="cnEtc" -->
                            <el-row v-show="cnEtc" class="tb-margin" :gutter="10">
                                <el-col :span="4" class="center">{{$t('signup.back')}}</el-col>
                                <el-col :span="8" class="center positionrelative">
                                    <img src="../../assets/img/addback.png" alt />
                                    <input
                                        class="file-input"
                                        name="file"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        @change="backupdate"
                                    />
                                </el-col>
                                <el-col :span="12" class="center">
                                    <img :src="bankaimg" alt />
                                </el-col>
                            </el-row>
                            <el-row v-show="!cnEtc" class="tb-margin" :gutter="10">
                                <el-col :span="4" class="center">證件正面</el-col>
                                <el-col :span="8" class="center positionrelative">
                                    <img src="../../assets/img/addhz.png" alt />
                                    <input
                                        class="file-input"
                                        name="file"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        @change="fontzj"
                                    />
                                </el-col>
                                <el-col :span="12" class="center">
                                    <img :src="zjfontaimg" alt />
                                </el-col>
                            </el-row>
                            <el-row v-show="!cnEtc" class="tb-margin" :gutter="10">
                                <el-col :span="4" class="center">證件反面</el-col>
                                <el-col :span="8" class="center positionrelative">
                                    <img src="../../assets/img/addbk.png" alt />
                                    <input
                                        class="file-input"
                                        name="file"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        @change="backzj"
                                    />
                                </el-col>
                                <el-col :span="12" class="center">
                                    <img :src="zjbankaimg" alt />
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <!-- <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        style="width:80%"
                                        type="info"
                                        plain
                                        @click="go(1)"
                                    >{{$t('button.laststep')}}</el-button>
                                </el-col>-->
                                <el-col :span="20" class="lp-bt tb-margin">
                                    <el-button
                                        class="bt-color"
                                        style="width:100%"
                                        type="primary"
                                        @click="go(1)"
                                    >{{$t('button.next')}}</el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                    <div class="paddingbox" v-show="active == 1">
                        <el-header class="flex flexcolumn title">
                            <span class="text">{{$t('signup.moreinfo')}}</span>
                            <p>{{$t('signup.hint3')}}</p>
                        </el-header>
                        <el-main>
                            <el-form ref="form" :model="form">
                                <el-row :gutter="10">
                                     <el-col :span="12" v-show="cnEtc">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:90%"
                                                @change="changeidinfo('lastNameEN','cn')"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.cnlastname')"
                                                v-model="alldata.lastName"
                                            >
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" v-show="cnEtc">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:90%"
                                                @change="changeidinfo('surNameEN','cn')"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.cnsurName')"
                                                v-model="alldata.surName"
                                            >
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:90%"
                                                @change="changeidinfo('surNameEN','en')"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.ensurName')"
                                                v-model="alldata.surNameEN"
                                            >
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:90%"
                                                @change="changeidinfo('lastNameEN','en')"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.enlastname')"
                                                v-model="alldata.lastNameEN"
                                            >
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                   
                                     
                                    <el-col :span="12">
                                        <el-form-item v-show="!cnEtc" label=" " >
                                            <el-input
                                                style="width:90%;float:right;margin-right:1%"
                                                @change="changeidinfo('midNameEN','en')"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.enmidname')"
                                                v-model="alldata.midNameEN"
                                            >
                                                <!-- <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                   
                                    <el-col :span="cnEtc?24:12">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-select
                                                :style="cnEtc?'width:95%':'width:90%'"
                                                v-model="alldata.title"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.title')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in alllist.titles"
                                                    :label="e.name"
                                                    :value="e.id"
                                                ></el-option>
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:95%"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleaseinput')+$t('signup.idcard')"
                                                v-model="alldata.identity"
                                            >
                                                <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-date-picker
                                                style="width:90%"
                                                @change="changeidinfo()"
                                                value-format="yyyy-MM-dd"
                                                v-model="alldata.birthday"
                                                type="date"
                                                :placeholder="$t('signup.birthdate')"
                                            ></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item>
                                            <el-date-picker
                                                style="width:100%"
                                                @change="changeidinfo()"
                                                value-format="yyyy-MM-dd"
                                                v-model="alldata.expireDate"
                                                type="date"
                                                :placeholder="$t('signup.duedate')"
                                            ></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-input
                                                style="width:95%"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleaseinput')+$t('message.site')"
                                                v-model="alldata.idAddress"
                                            >
                                                <!-- <!-- <template slot="prepend"><span class="okionic">*</span></template> -->
                                                -->
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <!-- <el-col :span="12">
                                        <el-form-item label="邮编">
                                            <el-input
                                                :placeholder="$t('message.Pleasechoose')+'邮编'"
                                                v-model="alldata.zipCode"
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>-->
                                </el-row>
                            </el-form>
                            <el-row :gutter="10">
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        style="width:80%"
                                        type="info"
                                        plain
                                        @click="go(0)"
                                    >{{$t('button.laststep')}}</el-button>
                                </el-col>
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        class="bt-color"
                                        style="width:80%"
                                        type="primary"
                                        @click="go(2)"
                                    >{{$t('button.next')}}</el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                    <div class="paddingbox" v-show="active == 2">
                        <el-header class="flex flexcolumn title">
                            <span class="text">{{$t('signup.riskevaluation')}}</span>
                            <p>{{$t('signup.end')}}</p>
                        </el-header>
                        <el-main>
                            <el-form label-width="0px">
                                <el-row :gutter="10" class="end" justify="left">
                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.business"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.Profession')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in alllist.businesses"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.otherExp"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.Experiencetrading')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in alllist.investExps"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.incomeSource"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.incomeSource')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in alllist.incomeSources"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item
                                            :span="24"
                                            :rules="[{ required: true}]"
                                            label=" "
                                        >
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.investAim"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.investAim')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in alllist.investAims"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item
                                            :span="24"
                                            :rules="[{ required: true}]"
                                            label=" "
                                        >
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.isUsa"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.isUsa')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in yesorno"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item :rules="[{ required: true}]" label=" ">
                                            <el-select
                                                class="allselectstyle selewidth"
                                                v-model="okdatadatum.isPolitic"
                                                @change="changeidinfo()"
                                                :placeholder="$t('message.Pleasechoose')+$t('signup.isPolitic')"
                                            >
                                                <el-option
                                                    v-for="(e,i) in yesorno"
                                                    :label="e.value"
                                                    :value="e.key"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item :span="24">
                                            <el-checkbox
                                                v-model="ischecked"
                                                style="text-align: left"
                                            >
                                                {{$t('signup.hint4')}}
                                                <a>{{$t('signup.legal')}}</a>
                                            </el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-row :gutter="10">
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        style="width:80%"
                                        type="info"
                                        plain
                                        @click="go(1)"
                                    >{{$t('button.laststep')}}</el-button>
                                </el-col>
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        class="bt-color"
                                        style="width:80%"
                                        type="primary"
                                        @click="go(3)"
                                    >{{endbtn}}</el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                    <div class="paddingbox" v-show="active == 3 || active == 4">
                        <el-header class="flex flexcolumn title"></el-header>
                        <el-main>
                            <el-row :gutter="10" justify="center">
                                <el-col v-show="issave" :span="24" class="center tb-margin ok-box">
                                    <img class src="../../assets/common/img/newadd.png" alt />
                                    <h2 class="tb-margin">{{$t('signup.savesuccess')}}</h2>
                                    <p>{{$t('signup.hint5')}}</p>
                                    <p>{{$t('signup.hint6')}}</p>
                                    <a href="/">
                                        <el-button
                                            class="bt-color tb-margin"
                                            type="primary"
                                        >{{$t('signup.inhome')}}</el-button>
                                    </a>
                                </el-col>
                                <el-col v-show="!issave" :span="24" class="center tb-margin ok-box">
                                    <img class src="../../assets/common/img/newadd.png" alt />
                                    <h2 class="tb-margin">{{$t('signup.okuploaded')}}</h2>
                                    <p>{{$t('signup.hint7')}}</p>
                                    <a href="/">
                                        <el-button
                                            class="bt-color tb-margin"
                                            type="primary"
                                        >{{$t('signup.inhome')}}</el-button>
                                    </a>
                                </el-col>
                            </el-row>
                            <!-- <el-row :gutter="10">
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        style="width:80%"
                                        type="info"
                                        plain
                                        @click="go(3)"
                                    >{{$t('button.laststep')}}</el-button>
                                </el-col>
                                <el-col :span="12" class="center tb-margin">
                                    <el-button
                                        class="bt-color"
                                        style="width:80%"
                                        type="primary"
                                        @click="go(4)"
                                    >{{$t('button.next')}}</el-button>
                                </el-col>
                            </el-row>-->
                        </el-main>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios';
import urls from '@/api/matches/urls';
import font from '@/assets/img/font.png';
import abck from '@/assets/img/abck.png';
import zjfontaimg from '@/assets/img/hz.png';
import zjbankaimg from '@/assets/img/img.jpg';
export default {
    data() {
        return {
            cnEtc: true,
            endbtn: this.$t('message.save'),
            issave: true,
            yesorno: [
                {
                    value: this.$t('signup.yes'),
                    key: '1'
                },
                {
                    value: this.$t('signup.no'),
                    key: '0'
                }
            ],
            active: 0,
            checked: false,
            form: {
                country: '', //居住国家或地区
                countryCode: '', //国家区号
                password: '', //密码
                phone: '', //手机号
                repeatPassword: '', //重复密码
                username: '' //用户名
            },
            columns: [], //国家列表
            dialogImageUrl: '',
            dialogVisible: false,
            ischecked: true,
            fontaimg: font,
            bankaimg: abck,
            zjfontaimg: zjfontaimg,
            zjbankaimg: zjbankaimg,
            alldata: {
                birthCountry: '', //出生国家
                idFrontImg: '', //身份证正面图片
                idBackImg: '', //身份证反面图片
                birthday: '', //出生日期

                expireDate: '', //到期日

                idAddress: '', //证件地址

                identity: '', //证件号码

                identityOthers: '', //其他证件名称

                identityType: '', //证件类型，默认为身份证Default value : 1

                lastName: '', //姓

                nickName: '', //其他名字或中间名

                originBirthday: '', //自动识别:出生日期

                originExpireDate: '', //自动识别:到期日

                originIdAddress: '', //自动识别:证件地址

                originIdentity: '', //自动识别:证件号码

                originLastName: '', //自动识别:姓

                originSurName: '', //自动识别:名

                surName: '', //名

                title: '', //称谓,比如先生、小姐

                // zipCode: '', //邮编
                lastNameEN: '', // 英文姓
                surNameEN: '', // 英文名
                midNameEN: '' // 英文中间名
                // 护照: '' //护照照片
            },
            okdatadatum: {
                address: '', //住宅地址

                addressDate: '', //居住年限

                business: '', //行业

                city: '', //城市

                countryCode: '', //国家区号

                email: '', //电子邮箱

                employerName: '', //现雇主名称

                employment: '', //就业状况

                otherExp: '', //外汇/CFD投资经验

                homePhone: '', //住宅电话号码

                income: '', //年收入估计

                incomeSource: '', //收入来源

                investAim: '', //投资目标

                investFreq: '', //OTC外汇/CFD投资频率

                isEarnUsa: '', //是否拥有来自美国收入的非美国人士

                isForUsa: '', //是否代表“美国人士”行事

                isPolitic: '', //是否政治人物或政治人物的直系亲属

                isTax: '', //是否居住国家以外的纳税居民

                isUsa: '', //是否美国所得税纳税范围内的“美国人士”

                message: '', //留言

                netAsset: '', //资产净值（总资产减去负债）总和

                originBirthday: '', //自动识别:出生日期

                originExpireDate: '', //自动识别:到期日

                originIdAddress: '', //自动识别:证件地址

                originIdentity: '', //自动识别:证件号码

                originLastName: '', //自动识别:姓

                originSurName: '', //自动识别:名

                otherExp: '', //其他投资经验

                phone: '', //手机号

                position: '' //职位
            },
            alllist: [],
            info: [],
            userid: this.$route.query.id,
            changeentext: ''
        };
    },
    created() {
        this.$api.user.userinfo({}, res => {
            // console.log(res);
            this.info = res.data.info;
            this.cnEtc = res.data.info.cnEtc;
            this.alldata.birthCountry = res.data.info.country;
            this.okdatadatum.countryCode = res.data.info.phoneCtCode;
            //   this.fontaimg=res.data.info.idFrontImgFullName+'?token='+sessionStorage.token
            //     this.bankaimg=res.data.info.idBackImgFullName+'?token='+sessionStorage.token
            this.alldata.lastName = res.data.info.lastName;
            this.alldata.surName = res.data.info.surName;
            if (localStorage[this.userid] != undefined) {
                this.alldata = JSON.parse(localStorage[this.userid]).alldata;
                this.okdatadatum = JSON.parse(localStorage[this.userid]).okdatadatum;
            }
        });

        this.$api.matches.systemfillInfoCommonList({}, res => {
            console.log(res);
            this.alllist = res.data;
        });

        this.$api.matches.countries({}, res => {
            this.columns = res.data.list;
            this.$api.matches.systemlocation({}, res => {
                this.form.country = res.data.info.countryCode;

                this.form.countryCode = res.data.info.region;
            });
        });
    },
    methods: {
        GetAge(strBirthday) {
            var returnAge,
                strBirthdayArr = strBirthday.split('-'),
                birthYear = strBirthdayArr[0],
                birthMonth = strBirthdayArr[1],
                birthDay = strBirthdayArr[2],
                d = new Date(),
                nowYear = d.getFullYear(),
                nowMonth = d.getMonth() + 1,
                nowDay = d.getDate();
            if (nowYear == birthYear) {
                returnAge = 0; //同年 则为0周岁
            } else {
                var ageDiff = nowYear - birthYear; //年之差
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay; //日之差
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth; //月之差
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return returnAge; //返回周岁年龄
        },
        changeidinfo(type, lang) {
            if (this.alldata.lastName != '' && this.alldata.lastNameEN == '') {
                this.changepy('lastNameEN', 'cn');
            }
            if (this.alldata.surName != '' && this.alldata.lastNameEN == '') {
                this.changepy('surNameEN', 'cn');
            }
            if (type && lang) {
                this.changepy(type, lang);
            }
            // console.log(this.GetAge(this.alldata.birthday))

            if (this.GetAge(this.alldata.birthday) < 18) {
                this.alldata.birthday = '';
                this.$message(this.$t('replenished.no18'));
            }

            // this.alldata.originBirthday = this.okdatadatum.originBirthday = this.alldata.birthday; //自动识别:出生日期

            // this.alldata.originExpireDate = this.okdatadatum.originExpireDate = this.alldata.expireDate; //自动识别:到期日

            // this.alldata.originIdAddress = this.okdatadatum.originIdAddress = this.alldata.idAddress; //自动识别:证件地址

            // this.alldata.originIdentity = this.okdatadatum.originIdentity = this.alldata.identity; //自动识别:证件号码

            // this.alldata.originLastName = this.okdatadatum.originLastName = this.alldata.lastName; //自动识别:姓

            // this.alldata.originSurName = this.okdatadatum.originSurName = this.alldata.surName; //自动识别:名

            if (
                this.alldata.idFrontImg == '' || //身份证正面
                this.alldata.idBackImg == '' || //身份证反面
                this.alldata.birthday == '' || //出生日期
                this.alldata.idAddress == '' || //证件地址
                this.alldata.identity == '' || //证件号码
                // this.alldata.lastName == '' || //姓
                // this.alldata.surName == '' || //名
                this.alldata.title == '' || //称谓
                // this.alldata.lastNameEN == '' || //英文姓
                // this.alldata.surNameEN == '' || // 英文名
                // this.alldata.midNameEN == '' || // 英文中间名
                this.okdatadatum.business == '' || //职业
                this.okdatadatum.otherExp == '' || //外汇/CFD投资经验
                this.okdatadatum.incomeSource == '' || //收入来源
                this.okdatadatum.investAim == '' //投资目标
            ) {
                this.endbtn = this.$t('message.save');
                this.issave = true;
            } else {
                this.endbtn = this.$t('message.submit');
                this.issave = false;
            }
        },
        go(e) {
            if (e == 1) {
                this.$api.user.userfillIdentity2({
                    idBackImg:this.alldata.idBackImg,
                    idFrontImg:this.alldata.idFrontImg,
                }, res => {
                   
                });
            }
            if (e == 2) {
                if (
                    (!this.alldata.lastName && this.cnEtc) ||
                    (!this.alldata.surName && this.cnEtc) ||
                    (!this.alldata.lastNameEN && this.cnEtc) ||
                    (!this.alldata.surNameEN && this.cnEtc)
                ) {
                    this.$message('請填寫中英文姓名');
                    return;
                }
                if (!this.alldata.title) {
                    this.$message('請選擇稱謂');
                    return;
                }
                if (!this.alldata.identity) {
                    this.$message('請填寫證據號碼');
                    return;
                }
                if (!this.alldata.birthday) {
                    this.$message('請填寫出生日期');
                    return;
                }
                if (!this.alldata.idAddress) {
                    this.$message('請填寫地址');
                    return;
                }
                this.$api.user.userfillIdentity(this.alldata, res => {
                    if (res.code == 406) {
                        this.$confirm(this.$t('signup.hint8'), this.$t('hint.hint'), {
                            confirmButtonText: this.$t('message.affirm'),
                            cancelButtonText: this.$t('button.cancel'),
                            type: 'warning'
                        })
                            .then(() => {
                                this.$api.user.userfillIdentity(Object.assign({}, { skipIdCheck: true }, this.alldata), e => {
                                    console.log('身份证证' + e);
                                });
                                this.active = e;
                            })
                            .catch(() => {
                                return;
                            });
                    } else if (res.code == 200) {
                        this.active = e;
                    }
                });

                return;
            }
            if (e == 3) {
                if (
                    !this.okdatadatum.business ||
                    !this.okdatadatum.otherExp ||
                    !this.okdatadatum.incomeSource ||
                    !this.okdatadatum.investAim ||
                    !this.okdatadatum.isUsa ||
                    !this.okdatadatum.isPolitic
                ) {
                    this.$message(this.$t('err.completiontasks'));
                    return;
                }
                if (!this.ischecked) {
                    this.$message(this.$t('signup.hint9'));
                    return;
                }
                // if (this.issave) {
                localStorage.setItem(
                    this.info.id,
                    JSON.stringify({
                        okdatadatum: this.okdatadatum,
                        alldata: this.alldata
                    })
                );
                // } else {
                this.$api.user.userfillInfo(this.okdatadatum, e => {
                    console.log('注册-完善资料' + e);
                    this.active = 4;
                    return;
                });
                // }
            }
            this.active = e;
        },
        changepy(str, from) {
            var _this = this;

            if (str == 'lastNameEN' && from == 'en') {
                _this.changeentext = _this.alldata.lastNameEN;
            } else if (str == 'surNameEN' && from == 'en') {
                _this.changeentext = _this.alldata.surNameEN;
            } else if (str == 'midNameEN' && from == 'en') {
                _this.changeentext = _this.alldata.midNameEN;
            } else if (str == 'lastNameEN' && from == 'cn') {
                _this.changeentext = _this.alldata.lastName;
            } else if (str == 'surNameEN' && from == 'cn') {
                _this.changeentext = _this.alldata.surName;
            }

            let sttr = _this.changeentext;
            if (!sttr) {
                return;
            }
            _this.$api.matches.systempinyin(
                {
                    chineseStr: sttr
                },
                e => {
                    if (str == 'lastNameEN' && from == 'en') {
                        _this.alldata.lastNameEN = e.data.pinyin;
                    } else if (str == 'surNameEN' && from == 'en') {
                        _this.alldata.surNameEN = e.data.pinyin;
                    } else if (str == 'midNameEN' && from == 'en') {
                        _this.alldata.midNameEN = e.data.pinyin;
                    } else if (str == 'lastNameEN' && from == 'cn') {
                        _this.alldata.lastNameEN = e.data.pinyin;
                    } else if (str == 'surNameEN' && from == 'cn') {
                        _this.alldata.surNameEN = e.data.pinyin;
                    }
                }
            );
        },
        viidcard(bats64, isfront) {
            // 上传照片
            var self = this;
            // let file = e.target.files[0];
            // /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('image', bats64); // 通过append向form对象添加数据
            param.append('id_card_side', isfront);
            param.append('detect_direction', true);
            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            // 添加请求头
            axios
                .post(
                    'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token="24.f780e83ec2db5c37a69f8d4081bbb64a.2592000.1578829300.282335-17502825"',
                    param,
                    config
                )
                .then(response => {
                    if (isfront == 'front') {
                        var strname = response.data.words_result['姓名'].words;
                        var strbirthday = response.data.words_result['出生'].words;
                        this.$nextTick(() => {
                            self.alldata.originIdAddress = self.alldata.idAddress = self.okdatadatum.originIdAddress =
                                response.data.words_result['住址'].words; //住址

                            if (!strbirthday) {
                                self.alldata.originBirthday = self.alldata.birthday = self.okdatadatum.originBirthday = null;
                            } else {
                                self.alldata.originBirthday = self.alldata.birthday = self.okdatadatum.originBirthday =
                                    strbirthday.substr(0, 4) + '-' + strbirthday.substr(4, 2) + '-' + strbirthday.substr(6, 2); //出生日期
                            }

                            self.alldata.originBirthday = self.alldata.birthday = self.okdatadatum.originBirthday =
                                strbirthday.substr(0, 4) + '-' + strbirthday.substr(4, 2) + '-' + strbirthday.substr(6, 2); //出生日期

                            self.alldata.originLastName = self.alldata.lastName = self.okdatadatum.originLastName = strname.substr(0, 1); //姓
                            self.alldata.originSurName = self.alldata.surName = self.okdatadatum.originSurName = strname.substring(
                                strname.indexOf(strname.substr(0, 1)) + 1
                            ); //名
                            self.alldata.originIdentity = self.alldata.identity = self.okdatadatum.originIdentity =
                                response.data.words_result['公民身份号码'].words;
                            if (self.alldata.lastName) {
                                this.changeidinfo();
                            }
                        });
                    } else if (isfront == 'back') {
                        var strendtime = response.data.words_result['失效日期'].words;
                        if (!strendtime) {
                            self.alldata.originExpireDate = self.alldata.expireDate = self.okdatadatum.originExpireDate = null;
                        } else {
                            self.alldata.originExpireDate = self.alldata.expireDate = self.okdatadatum.originExpireDate =
                                strendtime.substr(0, 4) + '-' + strendtime.substr(4, 2) + '-' + strendtime.substr(6, 2); //出生日期
                        }
                    }
                });
        },

        imageToBase64(file, isfront) {
            var self = this;
            var fileObj = file;
            var reader = new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onload = () => {
                this.fileData = reader.result;
                this.fileData = this.fileData.split(',');
                this.fileData = this.fileData[1];
                this.viidcard(this.fileData, isfront);
            };
        },

        backzj(e) {
            // 上传照片
            var self = this;
            let file = e.target.files[0];
            /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('file', file); // 通过append向form对象添加数据
            param.append('token', sessionStorage.getItem('token'));
            param.append('id', JSON.parse(sessionStorage.getItem('info')).id); // 通过append向form对象添加数据
            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            // 添加请求头
            axios.post(urls.matches + '/user/uploadId', param, config).then(response => {
                if (response.data.code == 200) {
                    self.alldata.idBackImg = response.data.data.filename;
                    self.zjbankaimg = response.data.data.fileUrl + '&token=' + sessionStorage.token;

                    // this.imageToBase64(file, 'front');
                }
            });
        },
        fontzj(e) {
            // 上传照片
            var self = this;
            let file = e.target.files[0];
            /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('file', file); // 通过append向form对象添加数据
            param.append('token', sessionStorage.getItem('token'));
            param.append('id', JSON.parse(sessionStorage.getItem('info')).id); // 通过append向form对象添加数据
            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            // 添加请求头
            axios.post(urls.matches + '/user/uploadId', param, config).then(response => {
                if (response.data.code == 200) {
                    self.alldata.idFrontImg = response.data.data.filename;
                    self.zjfontaimg = response.data.data.fileUrl + '&token=' + sessionStorage.token;

                    // this.imageToBase64(file, 'front');
                }
            });
        },
        fontupdate(e) {
            // 上传照片
            var self = this;
            let file = e.target.files[0];
            /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('file', file); // 通过append向form对象添加数据
            param.append('token', sessionStorage.getItem('token'));
            param.append('id', JSON.parse(sessionStorage.getItem('info')).id); // 通过append向form对象添加数据
            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            // 添加请求头
            axios.post(urls.matches + '/user/uploadId', param, config).then(response => {
                if (response.data.code == 200) {
                    self.alldata.idFrontImg = response.data.data.filename;
                    self.fontaimg = response.data.data.fileUrl + '&token=' + sessionStorage.token;

                    this.imageToBase64(file, 'front');
                }
            });
        },
        backupdate(e) {
            // 上传照片
            var self = this;
            let file = e.target.files[0];
            /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('file', file); // 通过append向form对象添加数据
            param.append('token', sessionStorage.getItem('token'));
            param.append('id', JSON.parse(sessionStorage.getItem('info')).id); // 通过append向form对象添加数据
            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            // 添加请求头
            axios.post(urls.matches + '/user/uploadId', param, config).then(response => {
                if (response.data.code == 200) {
                    self.alldata.idBackImg = response.data.data.filename;
                    self.bankaimg = response.data.data.fileUrl + '&token=' + sessionStorage.token;
                    this.imageToBase64(file, 'back');
                }
            });
        },
        handleRemove(e) {
            var self = this;
            let file = e.raw;
            // let file = JSON.ify(e) ;
            /* eslint-disable no-undef */
            let param = new FormData(); // 创建form对象
            param.append('file', file); // 通过append向form对象添加数据
            param.append('token', sessionStorage.getItem('token'));
            param.append('id', JSON.parse(sessionStorage.getItem('info')).id); // 通过append向form对象添加数据

            // console.log(param.get('file')); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            // 添加请求头
            axios.post(urls.matches + '/user/uploadId', param, config).then(response => {
                // if (response.data.code === 0) {
                //     self.ImgUrl = response.data.data;
                // }
                // console.log(response);
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        changeidinfodata() {
            this.columns.forEach(e => {
                if (e.name == this.form.country) {
                    this.form.countryCode = e.code;
                }
            });
        },

        register() {
            if (this.checked == false) {
                this.$message(this.$t('signup.hint9'));
                return;
            }
            if (this.form.username == '') {
                this.$message(this.$t('message.Pleaseinput') + this.$t('message.username'));
                return;
            } else if (this.form.password == '') {
                this.$message(this.$t('message.Pleaseinput') + this.$t('message.password'));
                return;
            } else if (this.form.password != this.form.repeatPassword) {
                this.$message(this.$t('message.Enteredpasswordsdiffer'));
                return;
            } else if (this.form.phone == '') {
                this.$message(this.$t('message.Pleaseinput') + this.$t('message.phone'));
                return;
            } else if (this.form.country == '') {
                this.$message(this.$t('message.Pleasechoose') + this.$t('message.country'));
                return;
            } else if (this.form.lastName == '') {
                this.$message(this.$t('message.Pleaseinput') + this.$t('message.lastname'));
                return;
            } else if (this.form.surName == '') {
                this.$message(this.$t('message.Pleaseinput') + this.$t('message.surName'));
                return;
            }

            this.$api.matches.register(this.form, res => {
                sessionStorage.setItem('user', this.form.username);
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.info = JSON.stringify(res.data.info);
                this.active = 1;
            });
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
@import '@/style/input.scss';
.lp-bt {
    padding-left: 16% !important;
}
.el-row {
    margin-bottom: 0px;
}
.bg-class {
    background: $listbg;
}
.file-input {
    width: 10rem;
    height: 7rem;
    position: absolute;
    left: 0px;
    opacity: 0;
    cursor: pointer;
    top: 0px;
}
.center {
    text-align: center;
    img {
        width: 10rem;
        height: 7rem;
    }
}
.bt-color {
    background: $style-background;
}
.signbox {
    box-shadow: 1px -1px 1px 1px #cacaca36;
    border: 1px solid $bordercolor;

    border-radius: 10px;
    background: $listbg;
}
.padding-border {
    padding: 20px;
    background: $allstyle;
}
.border {
    box-shadow: inset 3px 0px 0px 0px #19141442;
    padding: 20px 0px 0px;
}

.size-auto {
    // overflow: auto;
    box-shadow: 4px 0px 0px 0px #eaeaea;
}
.size-auto-l {
    box-shadow: inset 4px 0px 0px 0px #eaeaea;
}
.logo {
    align-items: center;
    padding-bottom: 10px;
    // border-bottom: 1px solid $bordercolor;
    img {
        width: 50px;
    }
    .text {
        font-size: 40px;
        font-weight: 600;
    }
}
.title {
    .text {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1c53a5;
        margin: 8px 0px;
    }
    p {
        color: $fontcolor;
    }
}
.end {
    .el-select {
        width: 100%;
    }
}
.ok-box {
    h2 {
        color: $style-background;
    }
    img {
        width: 5rem;
        height: 5rem;
    }
    p {
        color: $fontcolor;
        font-size: 0.5rem;
    }
}
.tbpadding {
    color: #1c53a5;
    font-weight: 600;
    padding: 0px 4%;
    font-size: 19px;
}
.paddingbox {
    padding: 0px 15%;
}
.el-main {
    overflow: hidden;
}
</style>