<template>
    <div>
        <el-row :gutter="20" class="tb-margin">
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-form label-width="80px" class="tablist">
                        <el-form-item :label="$t('message.banckname')">
                            <el-select
                                v-model="params.bankName"
                                style="width:100%"
                                filterable
                                allow-create
                                default-first-option
                                :placeholder="$t('message.Pleaseinput')+$t('message.banckname')"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('message.openingbank')">
                            <el-input
                                v-model="params.branchName"
                                :placeholder="$t('message.Pleaseinput')+$t('message.openingbank')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('message.CardNo')">
                            <el-input
                                v-model="params.cardNumber"
                                :placeholder="$t('message.Pleaseinput')+$t('message.CardNo')"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="省份">
                            <el-input
                                v-model="params.state"
                                :placeholder="$t('message.Pleaseinput')+'省份'"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="城市">
                            <el-input
                                v-model="params.city"
                                :placeholder="$t('message.Pleaseinput')+'城市'"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="街道地址">
        <el-input
          v-model="params.address"
          :placeholder="$t('message.Pleaseinput')+'街道地址'"
        ></el-input>
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">{{$t('message.confirm')}}</el-button>
                            <el-button @click="cancel">{{$t('button.cancel')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            params: {
                bankName: '',
                branchName: '',
                cardNumber: '',
                state: '',
                city: ''
                // address: "",
            },
            options: []
        };
    },
    created() {
        this.$api.matches.systembanks({}, res => {
            this.options = res.data.list;
            console.log(res);
        });
    },
    methods: {
        onSubmit() {
            // var regmessage = new RegExp('[\\u4E00-\\u9FFF]+$', 'g');
            // var val = 'fsdfsfsd';
            // console.log(!regmessage.test(this.bankName) , !regmessage.test(this.branchName) , !regmessage.test(this.state) || !regmessage.test(this.city))
            // if (!regmessage.test(this.bankName) || !regmessage.test(this.branchName) || !regmessage.test(this.state) || !regmessage.test(this.city)) {
            //     this.$message('請輸入中文字段');
            //     return
                
            // }
       
        let regs = /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
  
            if (!regs.test(this.params.bankName) || !regs.test(this.params.branchName) || !regs.test(this.params.state) || !regs.test(this.params.city)) {
                 this.$message('請輸入純中文');
                 return
            }

            //              var sname = this.params.branchName
            //    if(sname.indexOf(" ") >= 0  || sname == null){
            //        this.$message('開戶支行不能為空格或空');
            //        return;
            //    }
            // console.log(this.params.branchName);
            if (!this.params.bankName || !this.params.branchName || !this.params.cardNumber || !this.params.state || !this.params.city) {
                this.$message({ message: this.$t('err.completiontasks'), type: 'warning' });
                return;
            }
            var reg = /^[0-9]*$/;
            if (!reg.test(this.params.cardNumber)) {
                this.$message('銀行卡請輸入數字');
                return;
            }

            this.$api.user.bankAccountadd(this.params, res => {
                if (res.code == 406) {
                    this.$confirm('請確認卡片為本人持有', '提示', {
                        confirmButtonText: '確認',
                        cancelButtonText: '返回',
                        type: 'warning'
                    })
                        .then(() => {
                            this.$confirm(
                                '請確認姓名和銀行卡號【' +
                                    JSON.parse(sessionStorage.info).displayName +
                                    '】【' +
                                    this.params.cardNumber +
                                    '】',
                                '提示',
                                {
                                    confirmButtonText: '確認',
                                    cancelButtonText: '返回',
                                    type: 'warning'
                                }
                            )
                                .then(() => {
                                    this.$api.user.bankAccountadd(Object.assign({}, { skipCardCheck: true }, this.params), res => {
                                        this.$message({ type: 'success', message: this.$t('message.addnewcu') });
                                        this.$router.push({
                                            path: this.$route.query.from
                                        });
                                    });
                                })
                                .catch(() => {
                                    return;
                                });
                        })
                        .catch(() => {
                            return;
                        });
                } else if (res.code == 200) {
                    this.$message({ type: 'success', message: this.$t('message.addnewcu') });
                    this.$router.push({
                        path: this.$route.query.from
                    });
                }

                console.log(res);
            });
        },
        cancel() {
            this.$router.push(this.$route.query.from);
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.tablist {
    width: 50%;
}
</style>