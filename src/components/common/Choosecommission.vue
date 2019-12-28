<template>
  <div class="box-list">
    <div class="top-l strong">
      <span>{{$t('message.namemaid')}}:{{params.name}}</span>
      <div>
        <el-button type="warning" @click="shoutalter">{{$t('message.return')}}</el-button>
      <!-- <el-button type="primary" >{{$t('message.save')}}</el-button> -->
      </div>
      
    </div>
    <p class="common-title">{{$t("message.commissios")}}</p>
    <table class="tb_box">
      <thead class="tb_header">
        <th>{{$t('message.product')}}</th>
        <th>{{$t('message.mytradecommission')}}</th>
        <th>
          {{$t('message.additionalmaid')}}
        </th>
        <th>
          {{$t('message.customerslowerlevel')}}
        </th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tablelist" v-if="item.type == 1">
          <td>{{item.name}}</td>
          <td>{{item.amount}}</td>
          <td>
              <!-- <el-input 
            @change="onChange($event,index)"
            type="number"
            min="0"
            placeholder="" 
            v-model="item.profit" clearable></el-input> -->

             <el-input-number  
             @change="onChange(item.profit,index)" 
             v-model="item.profit" 
              :min="0"
              :max="30-item.amount"
             ></el-input-number>
            <!-- {{item.profit}} -->
            </td>
          <td>
            {{item.subAmount}}
          
            <!-- <van-stepper
              :value="item.subAmount"
              @change="onChange($event,index)"
              min="0"
              :max="item.amount"
              step="1"
            />-->
          </td>
        </tr>
      </tbody>
    </table>
    <p class="common-title">{{$t('message.Internalreturn')}}</p>
    <table class="tb_box">
      <thead class="tb_header">
        <th>{{$t('message.product')}}</th>
        <th>
          {{$t('message.totalmaid')}}</th>
        <th>
          {{$t('message.maidlowerlevel')}}</th>
        <th>
          {{$t('title.MyEarnings')}}</th>
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
            
            <!-- <el-input 
            @change="onChangetow(item.subAmount,index,item.amount)"
            type="number"
            :max="item.amount"
            placeholder="请输入内容" v-model="item.subAmount" clearable></el-input> -->
            <!-- {{item.subAmount}} -->
          </td>
          <td>{{item.profit}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
   data() {
    return {
      tablelist: [],
      id:'',
      params:[]
    };
  },
  watch: {
 
  },
  props:['id'],
  methods: {
  
    shoutalter(){
      this.$emit('shoutalter')
    },
     changedata(id) {
      // if (this.relationCount > 0) {
      //   this.$notify({type:'warning',message:this.$t("err.onchange")});
      //   return;
      // }
      // if (this.defaultValue) {
      //   this.$notify({type:'warning',message:this.$t("message.notchange")});
      //   return;
      // }
      // if (this.params.name == "") {
      //   this.$notify({type:'warning',message:this.$t("message.Pleaseinput") + this.$t("name")});
      //   return;
      // }
      // var that = this;
      // if (this.params.name == "") {
      //   this.$notify({type:'warning',message:this.$t("message.Pleaseinput") + this.$t("name")});
      //   return;
      // }
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
      this.$api.user.commissionedit(
        {
          id: this.id,
          info: JSON.stringify(aSearch),
          name: this.params.name
        },
        res => {
          this.$notify({
            type: "success",
            message: this.$t("message.success"),
            duration: 1000
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
        }
      );
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onChangetow(value, i,max) {
     
      // if (value > max) {
      //   var value = max
      // }
      this.tablelist[i].subAmount = value;
      this.tablelist[i].profit= Number(this.tablelist[i].amount - value)
    },
    onChange(value, i) {
     
      this.tablelist[i].profit = value;
      this.tablelist[i].subAmount = Number(this.tablelist[i].amount + value) 
    },
    showlist(){
      this.$api.user.commissionid(
      {
        id: this.id
      },
      res => {
        this.tablelist = res.data.entity.items;
        this.params.name = res.data.entity.name;
            this.defaultValue = res.data.entity.defaultValue;
            this.relationCount = res.data.entity.relationCount;
            this.allshow = false
      }
    );
    }
  }
 
};
</script>
<style scoped lang="scss">
@import "@/style/_style.scss";
.box-list{
  border:1px $bordercolor solid;
  border-radius: 5px;
  
  .top-l{
   background: $bordercolor;
  padding: 10px;
  color: $enterprisecolor;
    display: flex;
  justify-content: space-between;
}
}

.common-title{
   border:1px $bordercolor solid;
  text-align: center;
  padding: 10px;
  margin: 0px
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