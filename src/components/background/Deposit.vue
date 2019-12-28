<template>
<div >
  <!-- header -->
  <commonheader :title="$t('message.withdraw')"></commonheader>

  <div class="form-container flex">
    <div style="width: 30%; min-width: 280px; margin-right: 30px">
      <div class="width-draw-steps">
        <div style="height: 140px;"></div>
      </div>
    </div>

    <div class="flex1" style="max-width: 400px;">
      <div class="withdrawbox">

        <el-form ref="form" label-width="80px" size="medium" label-position="left"  :model="form" >
          <el-form-item :label="$t('message.goldenway')" class="form-line">
            <el-select class="fullwidth" v-model="form.radio" :placeholder="$t('message.selectdeposit')">
              <el-option v-for="(item,i) in gateways" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-line deposit-margin-top" :label="$t('message.tradingaccount')">
            <!-- <el-select  class="fullwidth" v-model="form.userid" :placeholder="$t('message.Pleasechoose')+$t('message.tradingaccount')" @change="changetab()">
              <el-option v-for="(item,i) in userlist" :label="item.tradeLoginId" :value="item.tradeLoginId"></el-option>
            </el-select> -->
            <el-input v-model="form.userid" readonly></el-input>
          </el-form-item>

          <el-form-item class="form-line deposit-margin-top" label="入金貨幣">
            <el-select class="fullwidth" v-model="form.currency" placeholder="入金貨幣">
              <el-option v-for="(item,i) in currencylist" :label="item.currencyname" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-line deposit-margin-top" :label="$t('message.amountgold')">
            <el-select class="fullwidth" v-model="form.amount" :placeholder="$t('message.amountgold')">
              <el-option v-for="(item,i) in moneylist" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <!-- <div>
            <el-form-item label-width="0px" class="form-line">
              <div style="padding-left: 12px; color: #000714;">
                {{$t('message.amountgold')}}
              </div>
              <el-input placeholder="请输出金额额" v-model="form.amount" clearable type="textarea">
              </el-input>
            </el-form-item>
          </div> -->
        </el-form>
        <div class="withdrawbox tb-margin deposit-margin-top" style="text-align: center">
          <el-button style="width: 80%;" type="primary" @click="onSubmit">{{$t('message.affirm')}}</el-button>
        </div>
      </div>

    </div>
  </div>


</div>
</template>

<script>
import commonheader from '@/components/common/commonheader';
export default {
  components: {
    commonheader
  },
  data() {
    return {
      showGif:true,
      activeName: "5",
      form: {
        amount: "", //金额
        userid: sessionStorage.tradeLoginId, //用户账户
        currency: 0, //货币类型
        radio: '', //入金方式
      },
      moneylist: [],
      currencylist: [{
          currencyname: this.$t("message.USdollar"),
          value: 0
        },
        // {
        //   currencyname: this.$t("message.Euro"),
        //   value: 1
        // },
        // {
        //   currencyname: this.$t("message.RMB"),
        //   value: 2
        // }
      ],
      input1: "",
      userlist: [],
      balance: "",
      depositOrWithdrawToken: "",
      gateways: '',

    };
  },
  created() {
    // this.$api.user.usertradeAccounts({}, res => {
    //   this.userlist = res.data.list;

    //   this.form.userid = res.data.list[0].tradeLoginId;
    //   // this.username = sessionStorage.getItem('tradeLoginId')==undefined?res.data.list[0].tradeLoginId: sessionStorage.getItem('tradeLoginId');

    // });
         this.havebalance();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      if (this.form.amount <= 0) {
        this.$message({
          type: 'info',
          message: this.$t("message.amountdeposit")
        });
        return;
      }
      if (this.form.amount == 0 || this.form.amount == "") {
        this.$message({
          type: 'info',
          message: this.$t("message.Pleaseinput") + this.$t("message.money")
        });
        return;
      }
      this.isgo = false;
      this.$api.user.userstartDeposit({
          amount: this.form.amount,
          tradeLoginId: this.form.userid,
          depositOrWithdrawToken: this.depositOrWithdrawToken,
          payTypeId: this.form.radio,
          source:'WEB'
        },
        res => {
          this.$confirm(this.$t("deposit.hint"), this.$t("hint.hint"), {
              confirmButtonText: this.$t("message.affirm"),
              cancelButtonText: this.$t("button.cancel"),
              type: "warning"
            })
            .then(() => {
              // window.open('https://'+res.data.email);
              location.reload()
              this.$router.push('/accountdetails')
            })
            .catch(() => {
              location.reload()
            });
        }
      );
    },
    changetab() {
      this.havebalance();
    },
    havebalance() {
      this.$api.user.userbalance({
          tradeAccountId: this.form.userid,
          deposit: true
        },
        ress => {
          this.balance = ress.data.amount;
          this.depositOrWithdrawToken = ress.data.depositOrWithdrawToken;
          this.moneylist = ress.data.amountList
          this.gateways = ress.data.payTypes
          this.form.radio = this.gateways[0].id

        }
      );
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import "@/style/_style.scss";
.deposit-margin-top{
  // margin-top: 29px
}
.width-draw-steps {
  min-height: 292px;
  padding: 0px 50px;
  background: url('../../assets/common/img/rj.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  position: relative;
}

/deep/ .form-line {
  background: #ffffff;
  .el-input__inner,
  .el-textarea__inner {
    border: none;
    border-radius: 0px;
    color: #999999;
    text-align: right;
  }

  .el-textarea__inner {
    color: #999999;
    text-align: left;
    font-size: 20px;
  }

  .el-form-item__label {
    padding-left: 12px;
    background: #ffffff;
    font-size: 12px;
  }

  &.el-form-item {
    margin-bottom: 14px;
  }
}

/deep/ .form-line-2 {
  background: #ffffff;

  .el-input__inner {
    border: none;
    border-radius: 0px;
    color: #999999;
  }

  &.el-form-item {
    padding-bottom: #EDF1F1;
    margin-bottom: 0px;
  }
}

/deep/ .bank-number {
  .el-form-item__label {
    padding-left: 12px;
    background: #ffffff;
  }

  &.el-form-item {
    margin-bottom: 14px;
  }
}

.success-step .form-line {
  margin-bottom: 14px;
  text-align: left;
  padding: 10px 20px;
}

.money-gif {
  position: absolute;
  z-index: 3;
  width: 196px;
  bottom: -42px;
  right: -37px;
}
</style>
