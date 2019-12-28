<template>
    <el-row class="bg-class" :gutter="0">
        <el-col class="signbox" :span="20" :xs="24" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
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
                            <span class="text">Nag</span>
                        </el-header>
                        <el-main>
                            <el-col
                                :xs="0"
                                :sm="24"
                                :md="24"
                                :lg="24"
                                :xl="24"
                                :span="24"
                                style="height: 100px;"
                            >
                                <el-steps
                                    direction="vertical"
                                    :active="active"
                                    finish-status="success"
                                >
                                    <el-step :title="$t('demo.createddemo')"></el-step>

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
                                <el-steps :active="active" finish-status="success">
                                    <el-step :title="$t('demo.createddemo')"></el-step>

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
                    class="border size-auto-l"
                    :xs="24"
                    :sm="16"
                    :md="16"
                    :lg="16"
                    :xl="16"
                    :span="16"
                >
                    <div class="paddingbox" v-show="active == 0">
                        <el-header class="flex flexcolumn title">
                            <span class="text">{{$t('message.create_account')}}</span>
                            <p>{{$t('hint.Registrationprompt')}}</p>
                        </el-header>
                        <el-main>
                            <el-form ref="form" :model="form">
                                <el-form-item>
                                    <!-- <el-select
                                        class="fullwidth"
                                        v-model="form.country"
                                        @change="changeidinfodata()"
                                        :placeholder="$t('message.Pleasechoose')+$t('message.country')"
                                    >
                                        <el-option
                                            v-for="(e,i) in columns"
                                            :label="e.displayName"
                                            :value="e.name"
                                        ></el-option>
                                    </el-select> -->
                                    <el-select
                                        v-model="form.country"
                                        style="width:100%"
                                        filterable
                                        allow-create
                                        default-first-option
                                        @change="changeidinfodata()"
                                        :placeholder="$t('message.Pleasechoose')+$t('message.country')"
                                    >
                                        <el-option
                                            v-for="(e,i) in columns"
                                            :label="e.displayName"
                                            :value="e.name"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-row :gutter="10">
                                    <el-form-item>
                                        <el-col :span="6">
                                            <el-input
                                                :placeholder="$t('message.Pleasechoose')+$t('message.countrycode')"
                                                v-model="form.countryCode"
                                            >
                                                <template slot="prepend">+</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-input
                                                :placeholder="$t('message.Pleaseinput')+$t('message.phone')"
                                                v-model="form.phone"
                                            ></el-input>
                                        </el-col>
                                    </el-form-item>
                                </el-row>
                                <el-form-item>
                                    <el-input
                                        :placeholder="$t('message.Pleaseinput')+$t('message.mail')"
                                        v-model="form.username"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input
                                        type="password"
                                        :placeholder="$t('message.set')+$t('message.login')+$t('message.password')"
                                        v-model="form.password"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input
                                        type="password"
                                        :placeholder="$t('message.confirm')+$t('message.password')"
                                        v-model="form.repeatPassword"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-checkbox v-model="checked">{{$t('signup.hint2')}}</el-checkbox>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        style="width:100%"
                                        type="primary"
                                        @click="register"
                                    >{{$t('message.register')}}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-main>
                    </div>
                    <div v-show="active == 1 || active == 2">
                        <el-header class="flex flexcolumn title"></el-header>
                        <el-main>
                            <el-row :gutter="10" justify="center">
                                <el-col :span="24" class="center tb-margin ok-box">
                                    <img class src="../../assets/common/img/newadd.png" alt />
                                    <h2 class="tb-margin">{{$t('signup.savesuccess')}}</h2>
                                    <p>{{$t('demo.hint1')}}</p>
                                    <p>{{$t('demo.hint2')}}</p>
                                    <a href="/">
                                        <el-button class="bt-color tb-margin" type="primary">{{$t('signup.inhome')}}</el-button>
                                    </a>
                                </el-col>
                            </el-row>
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
export default {
    data() {
        return {
            checked: true,
            active: 0,
            form: {
                country: '', //居住国家或地区
                countryCode: '', //国家区号
                password: '', //密码
                phone: '', //手机号
                repeatPassword: '', //重复密码
                username: '', //用户名
                demo: true
            },
            columns: [], //国家列表
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,

            alllist: [],
            info: []
        };
    },
    created() {
        this.$api.matches.systemfillInfoCommonList({}, res => {
            console.log(res);
            this.alllist = res.data;
        });

        this.$api.matches.countries({}, res => {
            this.columns = res.data.list;
            this.$api.matches.systemlocation({}, res => {
                this.form.country = res.data.info.countryCode;

                this.form.countryCode = res.data.info.phoneCode;
            });
        });
    },
    methods: {
        go(e) {
            this.active = e;
        },

        changeidinfodata() {
            this.columns.forEach(e => {
                if (e.name == this.form.country) {
                    this.form.countryCode = e.code;
                }
            });
        },

        register() {
            var email = this.form.username;
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!reg.test(email)) {
                this.$message('郵箱格式有誤，請重新輸入');
                return;
            }
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
                 this.$message(this.$t('message.Pleasechoose')+this.$t('message.country'));
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
                this.active = 2;
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
    background: url('../../assets/common/img/bgtp.png') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
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
    margin-top: 8%;
    border-radius: 10px;
    background: $listbg;
}
.padding-border {
    padding: 20px;
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
    padding: 0px 2%;
    font-size: 19px;
    position: absolute;
    bottom: 0px;
}
.paddingbox {
    padding: 0px 15%;
}
.el-main {
    overflow: hidden;
}
</style>