<template>
<div>
  <commonheader :title="$t('message.withdraw')"></commonheader>
  <div class="form-container flex">
    <div style="width: 30%; min-width: 280px; margin-right: 30px">
      <div class="width-draw-steps">
        <img v-if="showGif" class="money-gif" src="@/assets/img/money.gif">
        <el-steps style="height: 140px;" direction="vertical" :active="active">
          <el-step :title="$t('deposit.hint1')"></el-step>
          <el-step :title="$t('deposit.hint2')"></el-step>
          <el-step :title="$t('deposit.hint3')"></el-step>
        </el-steps>
      </div>
    </div>

    <div class="flex1" style="max-width: 400px;">
      <div v-show="active==0" class="withdrawbox">

        <el-form ref="form" label-width="80px" size="medium" label-position="left">
          <el-form-item :label="$t('message.tradingaccount')" class="form-line">

            <el-input v-model="tradeAccountId" readonly></el-input>
          </el-form-item>

          <el-form-item class="bank-number" label="银行帐号">
            <div class="flex-sb">
              <div class="form-line flex1">
                <el-select v-show="havecard || true" class="fullwidth" v-model="bankAccountId" :placeholder="$t('message.Pleasechoose')">
                  <el-option v-for="(item,i) in backlist" :key="i" :label="item.bankName+item.jm" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="form-line margin-l-10" style="width: 120px;padding-left: 12px;cursor: pointer;" @click="addbanck">
                <span class="el-icon-plus"></span><span style="color: #000714">{{$t('deposit.hint4')}}</span>
              </div>
            </div>
          </el-form-item>

          <el-form-item class="form-line form-line-2" :label="$t('message.Accountcurrency')">
            <el-select class="fullwidth" v-model="Accountcurrency" :placeholder="$t('message.Pleasechoose')">
              <el-option v-for="(item,i) in options" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label-width="0px" class="form-line">
              <div style="padding-left: 12px; color: #000714;">
                出金金额
              </div>
              <el-input placeholder="请输入金额额" v-model.number="amount" clearable type="textarea">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-show="active==1" class="success-box">
        <!-- <i class="ionicstyle el-icon-warning-outline"></i> -->
        <!-- <el-button type="warning" icon="el-icon-warning-outline" circle></el-button> -->
        <!-- <p class="title-bold">{{$t('message.Pleasecheck')}}{{$t('message.goldinformation')}}</p> -->
        <!-- <p>{{$t('message.affirm')}}{{$t('message.Pleasecheck')}}</p> -->
        <div class="success-step">
          <div class="form-line">
            <span class="l-name">{{$t('message.tradingaccount')}}:</span>
            <span class="r-name">{{tradeAccountId}}</span>
          </div>
          <div class="form-line">
            <span class="l-name">{{$t('message.withdraw')}}{{$t('message.money')}}:</span>
            <span class="r-name">{{amount}}</span>
          </div>
          <div class="form-line">
            <span class="l-name">{{$t('message.CardNo')}}:</span>
            <span class="r-name">{{banckcardname}}</span>
          </div>

          <div class="form-line">
            <span class="l-name">{{$t('message.banckname')}}:</span>
            <span class="r-name">{{backinfo.bankName}}</span>
          </div>
          <div class="form-line">
            <span class="l-name">{{$t('message.openingbank')}}:</span>
            <span class="r-name">{{backinfo.branch}}</span>
          </div>
        </div>

      </div>
      <div v-show="active==2 || active==3" class="success-box end-box">
        <i class="ionicstyleok el-icon-check"></i>
        <p class="success-text">{{$t('deposit.hint5')}}</p>
      </div>
      <div class="withdrawbox">
        <div :gutter="20">
          <div :span="12" class="flexC">
            <el-button style="width: 80%;" v-show="active != 0 && active != 3" type="success" size="medium" @click="laststep">{{$t('button.laststep')}}</el-button>
          </div>
          <div :span="big" :offset="goleft" size="medium" class="flexC">
            <el-button type="primary" style="width: 80%;" @click="next">{{button}}</el-button>
          </div>
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
      showGif: false,
      big: 24,
      Accountcurrency:'1',
      options: [{
          value: '1',
          label: this.$t('message.USdollar')
        }
        // ,{
        //     value: '2',
        //     label: this.$t('message.Euro')
        // }
      ],
      userlist: [],
      backlist: [],
      value: '1',
      input23: '',
      active: 1,
      balance: '',
      amount: '', //出金金额
      tradeAccountId: sessionStorage.tradeLoginId != undefined ? sessionStorage.tradeLoginId : '', //交易账户
      depositOrWithdrawToken: '', //token
      bankAccountId: '', //银行卡id
      button: this.$t('button.next'),
      banckcardname: '',
      backinfo: {
        bankName: '',
        branch: ''
      },
      goleft: 0,
      havecard: false,

    };
  },
  watch: {
    bankAccountId() {
      this.backlist.forEach(e => {
        if (e.id == this.bankAccountId) {
          this.banckcardname = e.bankNumber;
          this.backinfo.bankName = e.bankName;
          this.backinfo.branch = e.branch;
        }
      });
    }
  },
  created() {
    this.$api.user.usertradeAccounts({}, res => {
      this.userlist = res.data.list;

      this.userid =
        sessionStorage.getItem('tradeLoginId') == undefined ?
        res.data.list[0].tradeLoginId :
        sessionStorage.getItem('tradeLoginId');
      this.username =
        sessionStorage.getItem('tradeLoginId') == undefined ?
        res.data.list[0].tradeLoginId :
        sessionStorage.getItem('tradeLoginId');
      this.havebalance();
    });
    this.$api.user.bankAccountlist({}, res => {
      this.backlist = res.data.list;
      var reg = /^(\d{4})\d+(\d{4})$/;
      this.backlist.forEach(e => {
        var str = e.bankNumber
        console.log(str)
        e.jm = str.replace(reg, '$1****$2');
      });

      if (this.backlist.length == 0) {
        this.havecard = false;
      } else {
        this.havecard = true;
      }
    });
  },
  mounted() {
    this.showGif = true
    setTimeout(() => {
      this.showGif = false
    }, 3000)
  },
  methods: {
    laststep() {
      if (this.active-- < 1) this.active = 0;
      if (this.active == 0 || this.active == 3 || this.active == 4) {
        this.big = 24;
      } else {
        this.big = 12;
      }
    },
    next() {
      this.goleft = 0;
      if (this.active == 0) {
        if (this.balance < this.amount) {
          this.$message({ message: this.$t('err.oversize'), type: 'warning' });
          return;
        }
       
        if (this.amount <= 0) {
          this.$message({ message: this.$t('err.nonnegativenumber'), type: 'warning' });
          return;
        }
        if (this.amount == 0 || this.amount == '') {
          this.$message({ message: this.$t('message.Pleaseinput') + this.$t('message.money'), type: 'warning' });
          return;
        }
        if (this.bankAccountId == '') {
          this.$message({ message: this.$t('message.Pleasechoose') + this.$t('message.CardNo'), type: 'warning' });
          return;
        }
        this.active = 1;
        this.big = 12;
        return;
      }
      if (this.active == 1) {
        this.big = 12;

        this.$api.user.userstartWithdraw({
            amount: this.amount,
            tradeAccountId: this.userid,
            depositOrWithdrawToken: this.depositOrWithdrawToken,
            bankAccountId: this.bankAccountId,
            source: 'WEB'
          },
          res => {
            this.big = 12;
            this.button = this.$t('button.ok');
            this.goleft = 6;
            this.active = 3;
          }
        );
      }
      if (this.active == 3) {
        this.$router.push('/accountdetails');
        // this.big = 24;
        // this.active = 0;
        // this.amount = '';
        // this.userid = '';
        // this.depositOrWithdrawToken = '';
        // this.bankAccountId = '';
        // this.button = this.$t('button.next');
      }
      // this.isgo = false
    },
    havebalance() {
      this.$api.user.userbalance({
          tradeAccountId: this.userid
        },
        ress => {
          this.balance = ress.data.amount;
          this.depositOrWithdrawToken = ress.data.depositOrWithdrawToken;
        }
      );
    },
    addbanck() {
      this.$router.push({
        path: '/addwithdraw',
        query: {
          from: 'withdraw'
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import '@/style/_style.scss';

.withdrawbox {
  // padding: 0% 16%;
}

.inputlist {
  // text-align: left;
  // display: flex;
  // justify-content: flex-start;
  overflow: hidden;

  .input-title {
    float: left;
    color: $fontcolor;
    width: 12%;
  }

  .el-input {
    float: left;
    width: 20%;
  }

  .el-select-dropdown {
    float: left;
  }
}

.ionicstyle {
  color: #e6a23b;
  font-size: 5rem;
}

.ionicstyleok {
  color: #66c23a;
  font-size: 5rem;
  border: 5px solid #66c23a;
  border-radius: 50%;
}

.success-box {
  text-align: center;

  .title-bold {
    font-weight: 600;
  }

  .succcess-body {
    background: $backgroundstyle;
    text-align: left;
    padding: 10px;
    margin: 10px 0px;

    div {
      span {
        width: 50%;
      }
    }
  }
}

.end-box {
  padding: 5% 0px;
}

.banckinfolist {
  padding: 0px 40%;
  display: flex;

  .l-name {
    width: 40%;
  }

  .r-name {
    width: 60%;
  }
}

.success-text {
  margin: 2% 0px 1%;
  color: $fontcolor;
}

.el-step__title.is-process {
  font-size: 30px !important;
}

.width-draw-steps {
  min-height: 292px;
  padding: 0px 50px;
  background: #8cc7cc;
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
    font-size: 12px;
    background: #ffffff;
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
  font-size: 12px;
}

.money-gif {
  position: absolute;
  z-index: 3;
  width: 196px;
  bottom: -42px;
  right: -37px;
}
</style>
