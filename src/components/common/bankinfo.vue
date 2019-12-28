<template>
    <div>
        <el-row :gutter="20" class="tb-margin">
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-form label-width="80px" class="tablist">
                        <el-form-item :label="$t('message.banckname')">
                            <el-input
                            readonly
                                v-model="params.bankName"
                                :placeholder="$t('message.Pleaseinput')+$t('message.banckname')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('message.openingbank')">
                            <el-input
                            readonly
                                v-model="params.branchName"
                                :placeholder="$t('message.Pleaseinput')+$t('message.openingbank')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('message.CardNo')">
                            <el-input
                            readonly
                                v-model="params.cardNumber"
                                :placeholder="$t('message.Pleaseinput')+$t('message.CardNo')"
                            ></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Information.hint')">
                            <el-input
                            readonly
                                v-model="params.state"
                                :placeholder="$t('message.Pleaseinput')+$t('Information.hint')"
                            ></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('adduser.hint8')">
                            <el-input
                            readonly
                                v-model="params.city"
                                :placeholder="$t('message.Pleaseinput')+$t('adduser.hint8')"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="街道地址">
                            <el-input
                                v-model="params.address"
                                :placeholder="$t('message.Pleaseinput')+'街道地址'"
                            ></el-input>
                        </el-form-item> -->
                        <!-- <el-form-item>
                            <el-button type="primary" @click="onSubmit">{{$t('message.confirm')}}</el-button>
                            <el-button @click="cancel">{{$t('button.cancel')}}</el-button>
                        </el-form-item> -->
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
                city: '',
                address: ''
            }
        };
    },
    props: ['datalist'],
    created() {},
    watch: {
        datalist() {
            console.log(JSON.parse(this.datalist))
            this.params.bankName = JSON.parse(this.datalist).bankName;
            this.params.branchName = JSON.parse(this.datalist).branch;
            this.params.cardNumber = JSON.parse(this.datalist).bankNumber;
            this.params.state = JSON.parse(this.datalist).state;
            this.params.city = JSON.parse(this.datalist).city;
            this.params.address = JSON.parse(this.datalist).address;
        }
    },
    methods: {
        datalists() {
            console.log(JSON.parse(this.datalist))
            this.params.bankName = JSON.parse(this.datalist).bankName;
            this.params.branchName = JSON.parse(this.datalist).branch;
            this.params.cardNumber = JSON.parse(this.datalist).bankNumber;
            this.params.state = JSON.parse(this.datalist).state;
            this.params.city = JSON.parse(this.datalist).city;
            this.params.address = JSON.parse(this.datalist).address;
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.tablist {
    width: 100%;
}
</style>