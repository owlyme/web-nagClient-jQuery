<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20">
                    <div slot="header" class="clearfix">
                        <span>{{$t('message.namemaid')}}</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                    </div>
                    <div>
                        <el-input v-model="params.name" :placeholder="$t('message.namemaid')"></el-input>
                    </div>
                </el-card>
            </el-col>
         
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20">
                    <div slot="header" class="clearfix">
                        <span>{{$t('message.commissionallocation')}}</span>
                        <div style="float: right; padding: 3px 0">
                        <!-- <span>{{$t('message.POTX')}}</span> -->
                        <!-- <el-switch v-model="params.show" active-color="#13ce66"></el-switch> -->
                       
                        <el-button @click="save()" type="primary">{{$t('message.save')}}</el-button>
                    </div>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                    </div>
                    <div>
                        <p class="common-title">{{$t("message.commissios")}}</p>
                        <table class="tb_box">
                            <thead class="tb_header">
                                <th>{{$t('message.product')}}</th>
                                <th>{{$t('message.mytradecommission')}}</th>
                                <th>{{$t('message.additionalmaid')}}</th>
                                <th>{{$t('message.customerslowerlevel')}}</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in tablelist" v-if="item.type == 1">
                                    <td>{{item.name}}</td>
                                    <td>{{item.amount}}</td>
                                    <td>
                                        <el-input-number
                                            @change="onChange(item.profit,index)"
                                            v-model="item.profit"
                                            :min="0"
                                            :max="30-item.amount"
                                        ></el-input-number>
                                    </td>
                                    <td>{{item.subAmount}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="common-title">{{$t('message.Internalreturn')}}</p>
                        <table class="tb_box">
                            <thead class="tb_header">
                                <th>{{$t('message.product')}}</th>
                                <th>{{$t('message.totalmaid')}}</th>
                                <th>{{$t('message.maidlowerlevel')}}</th>
                                <th>{{$t('title.MyEarnings')}}</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in tablelist" v-if="item.type == 2">
                                    <td>{{item.name}}</td>
                                    <td>{{item.amount}}</td>
                                    <td>
                                        <el-input-number
                                            @change="onChangetow(item.subAmount,index,item.amount)"
                                            v-model="item.subAmount"
                                            :max="item.amount"
                                            :min="0"
                                        ></el-input-number>
                                    </td>
                                    <td>{{item.profit}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-card>
            </el-col>
           
        </el-row>
        <!-- <div class="box-list">
            <div class="top-l strong">
                <span>{{$t('message.namemaid')}}</span>
            </div>
            <div>
                <el-input v-model="params.name" :placeholder="$t('message.namemaid')"></el-input>
            </div>
        </div>
        <div class="box-list">
            <div class="top-l strong">
                <span>{{$t('message.commissionallocation')}}</span>
            </div>
            <p class="common-title">{{$t("message.commissios")}}</p>
            <table class="tb_box">
                <thead class="tb_header">
                    <th>{{$t('message.product')}}</th>
                    <th>{{$t('message.mytradecommission')}}</th>
                    <th>{{$t('message.additionalmaid')}}</th>
                    <th>{{$t('message.customerslowerlevel')}}</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tablelist" v-if="item.type == 1">
                        <td>{{item.name}}</td>
                        <td>{{item.amount}}</td>
                        <td>
                            <el-input-number
                                @change="onChange(item.profit,index)"
                                v-model="item.profit"
                                :min="0"
                            ></el-input-number>
                        </td>
                        <td>{{item.subAmount}}</td>
                    </tr>
                </tbody>
            </table>
            <p class="common-title">{{$t('message.Internalreturn')}}</p>
            <table class="tb_box">
                <thead class="tb_header">
                    <th>{{$t('message.product')}}</th>
                    <th>{{$t('message.totalmaid')}}</th>
                    <th>{{$t('message.maidlowerlevel')}}</th>
                    <th>{{$t('title.MyEarnings')}}</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tablelist" v-if="item.type == 2">
                        <td>{{item.name}}</td>
                        <td>{{item.amount}}</td>
                        <td>
                            <el-input-number
                                @change="onChangetow(item.subAmount,index,item.amount)"
                                v-model="item.subAmount"
                                :max="item.amount"
                            ></el-input-number>
                        </td>
                        <td>{{item.profit}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="box-list">
            <div class="top-l strong">
                <span>{{$t('message.namemaid')}}</span>
            </div>
            <div class="center">
                <span>{{$t('message.POTX')}}</span>
                <el-switch v-model="params.show" active-color="#13ce66"></el-switch>
                <el-button @click="save()" type="primary">{{$t('message.save')}}</el-button>
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    methods: {
        save() {
            if (!localStorage.businessshow ) {
                this.$message('請開啓商務進行操作')
                return
            }
            var that = this;
            if (this.params.name == '') {
                this.$message({
                    type: 'info',
                    message: this.$t('message.Pleaseinput') + this.$t('message.RuleName')
                });
                return;
            }
            var aSearch = [];

            var aTemp = this.tablelist;

            aTemp.forEach((el, i) => {
                var append = {
                    type: el.type,
                    seq: el.seq,
                    amount: el.subAmount
                };
                aSearch.push(append);
            });
            this.params.info = JSON.stringify(aSearch);
            this.$api.user.commissionadd(this.params, res => {
                this.$message({
                    type: 'info',
                    message: that.$t('message.success')
                });
                // Notify( {type: 'success', message:that.$t("message.success") })
                this.$router.replace('/Rulescommission');
            });
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        onChangetow(value, i, max) {
            // if (value > max) {
            //   var value = max
            // }
            this.tablelist[i].subAmount = value;
            this.tablelist[i].profit = Number(this.tablelist[i].amount - value);
        },
        onChange(value, i) {
            console.log(value)
            this.tablelist[i].profit = value;
            this.tablelist[i].subAmount = Number(this.tablelist[i].amount + value);
        }
    },
    data() {
        return {
            checked: true,
            active: 0,
            value: '',
            tablelist: '',
            params: {
                info: '',
                name: '',
                show: true
            }
        };
    },
    created() {
        this.$api.user.commissionpreAdd(
            {
                tradeLoginId: this.params.tradeAccountId
            },
            res => {
                this.tablelist = res.data.list;
            }
        );
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.box-list {
    border: 1px $bordercolor solid;
    border-radius: 5px;
    margin-top: 10px;
    .top-l {
        background: $bordercolor;
        padding: 10px;
        color: $enterprisecolor;
        display: flex;
        justify-content: space-between;
    }
    .center {
        padding: 10px;
        text-align: left;
    }
}

.common-title {
    border: 1px $bordercolor solid;
    text-align: center;
    padding: 10px;
    margin: 0px;
}
.tb_box {
    background: $listbg;
    border: 1px solid $bordercolor;
    width: 100%;
    td,
    tr {
        border: 1px solid $bordercolor;
        margin: 0px;
        text-align: center;
        font-size: 1rem;
    }
    .tb_header {
        border: 1px solid $bordercolor;
        background: $bordercolor;
        th {
            border: 1px solid $bordercolor;
            font-size: 1rem;
            font-weight: 0;
            color: $fontcolor;
        }
    }
}
</style>