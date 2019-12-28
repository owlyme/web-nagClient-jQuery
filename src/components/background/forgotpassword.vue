<template>
    <el-row  class="bg-class" :gutter="0">
        <el-col class="signbox" :span="18" :xs="24" :sm="18" :md="18" :lg="18" :xl="18" :offset="3">
            <el-row :gutter="0">
                <el-col
                    class="fg-l border size-auto"
                    :xs="24"
                    :sm="8"
                    :md="8"
                    :lg="8"
                    :xl="8"
                    :span="8"
                >
                    <img src="../../assets/img/l2.png" alt />
                </el-col>
                <el-col
                    class="border size-auto"
                    :xs="24"
                    :sm="16"
                    :md="16"
                    :lg="16"
                    :xl="16"
                    :span="16"
                >
                    <div class="rg-r">
                        <el-header class="flex flexcolumn title">
                            <span class="text">{{$t('message.fgpaswd')}}</span>
                        </el-header>
                        <el-main>
                            <el-form ref="form" :model="form" label-width="100px">
                                <el-form-item
                                    :label="$t('message.mail')"
                                >
                                    <el-input
                                        :placeholder="$t('forgotpassword.Pleaseeyesmail')"
                                        v-model="form.email"
                                    ></el-input>
                                </el-form-item>
                                <el-row :gutter="10">
                                    <el-form-item :label="$t('forgotpassword.code')">
                                        <el-col :span="18">
                                            <el-input :placeholder="$t('message.Pleaseinput')+$t('forgotpassword.code')" v-model="form.verifyCode "></el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button
                                                :class="{ 'bt-color': isclick, 'no-bt': !isclick }"
                                                style="width:100%"
                                                type="primary"
                                                @click="haveverifyCode"
                                            >{{verifymessage}}</el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-row>

                                <el-form-item :label="$t('message.newpassword')">
                                    <el-input
                                                                     show-password
                                        :placeholder="$t('message.Pleasenewpassword')"
                                        v-model="form.password"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('message.confirm')+$t('message.password')">
                                    <el-input
                                                                       show-password
                                        :placeholder="$t('message.Pleaseconfirmpassword')"
                                        v-model="form.repeatPassword"
                                    ></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button
                                        class="bt-color"
                                        style="width:100%"
                                        type="primary"
                                        @click="affirm"
                                    >{{$t('message.confirm')}}</el-button>
                                </el-form-item>
                            </el-form>
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

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
                repeatPassword: '',
                verifyCode: ''
            },
            verifymessage: this.$t('forgotpassword.havecode'),
            isclick: true
        };
    },
    created() {
    },
    methods: {
        affirm() {
            if (this.form.password != this.form.repeatPassword) {
                this.$message({
                    type: 'error',
                    message: this.$t('message.Enteredpasswordsdiffer')
                });
                return;
            }
            if (this.form.email == '' || this.form.password == '' || this.form.repeatPassword == '' || this.form.verifyCode == '') {
                this.$message({
                    type: 'error',
                    message: this.$t('err.completiontasks')
                });
                return;
            }
            this.$api.user.userresetPassword(this.form, e => {
                this.$message({
                    type: 'success',
                    message: this.$t('message.modifysuccessfully')
                });
                this.$router.push('/login')
            });
        },
        haveverifyCode() {
            var timeend;
            if (!this.isclick) {
                this.$message({
                    type: 'error',
                    message: this.$t('forgotpassword.awaitmail')
                });
                return;
            }
            if (this.form.email == '') {
                this.$message({
                    type: 'error',
                    message:  this.$t('forgotpassword.Pleaseeyesmail')
                });
                return;
            }
            this.$api.user.userverifyCode(
                {
                    email: this.form.email
                },
                e => {
                    this.$message({
                        type: 'success',
                        message: this.$t('forgotpassword.sendmessage')
                    });

                    var time = 60;
                    this.isclick = false;
                    timeend = setInterval(() => {
                        time--;
                        this.verifymessage = time;

                        if (time == 0) {
                            clearInterval(timeend);
                            this.isclick = true;
                            this.verifymessage = this.$t('forgotpassword.havecode');
                        }
                    }, 1000);
                }
            );
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
@import '@/style/input.scss';
.bg-class {
    background: url('../../assets/common/img/bgtp.png') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
}
.el-main {
    padding: 0px 13%;
}
.no-bt {
    background: $bordercolor;
    border: 1px solid $bordercolor;
}
.fg-l {
    height: 600px;
    max-height: 600px !important;
    img {
        width: 100%;
        height: 100%;
    }
}
.el-row {
    margin-bottom: 0px;
}
.file-input {
    width: 16rem;
    height: 9rem;
    position: absolute;
    left: 61px;
    opacity: 0;
}
.center {
    text-align: center;
    img {
        width: 15rem;
        height: 10rem;
    }
}
.bt-color {
    background: $style-background;
    border: 1px $style-background solid;
    height: $allinputheight !important;
}
.signbox {
    border: 1px solid $bordercolor;
    margin-top: 8%;
    border-radius: 10px;
    background: $listbg;
}
.border {
    border-right: 1px solid $bordercolor;
    // padding: 20px;
}
.size-auto {
    overflow: hidden;
}
.logo {
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid $bordercolor;
    img {
        width: 50px;
    }
    .text {
        font-size: 40px;
        font-weight: 600;
    }
}
.rg-r {
    padding-top: 10%;
}
.title {
    .text {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: $style-background;
    }
}
.end {
    .el-select {
        width: 100%;
    }
}
.ok-box {
    img {
        width: 5rem;
        height: 5rem;
    }
    p {
        color: $fontcolor;
        font-size: 0.5rem;
    }
}

</style>