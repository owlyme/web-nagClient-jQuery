<template>
  <div class="hello">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.number" v-for="(item,i) in leftlist" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(items,ins) in item.childer" :key="ins">
              <el-menu-item
                @click="go(items.url,items.title,items.number)"
                :index="items.number"
                link
              >{{items.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item
              :to="{ path:items.url }"
              v-for="(items,ins) in navigationlist"
            >{{items.title}}</el-breadcrumb-item>
          </el-breadcrumb> -->
          <div class="tab-header">
            <router-link exact  active-class="newactive" tag="span" :to="{ path:items.url }"  v-for="(items,ins) in navigationlist">
              {{items.title}} <i class="el-icon-close" @click="del(ins)"></i>
              </router-link>
          </div>
          <el-dropdown trigger="click" @command="changelang" >
            <i class="iconfont icon-yuyan" style="margin-right: 15px">{{$t('message.changetext')}}</i>
            
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command='item.lang' v-for="(item, i) in columns" :key="i">{{item.text}}</el-dropdown-item>
             
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown trigger="click" @command="handleCommand" >
            <i class="el-icon-setting" style="margin-right: 15px">{{$t('message.set')}}</i>
            
            <el-dropdown-menu slot="dropdown">
               <el-dropdown-item command='0' @click="go()" >{{$t('message.changeuser')}}</el-dropdown-item>
              <el-dropdown-item command='1' @click="outlogin()" >{{$t('button.quit')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{info.displayName}}</span>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
        <el-footer>copyright©xxx保留版权</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "",
      columns: [
        { text: this.$t("message.language1"), lang: "zh" },
        { text: this.$t("message.language2"), lang: "zhHk" },
        { text: this.$t("message.language3"), lang: "en" }
      ],
      navigationlist: [
      ],
      leftlist: [
        {
          title: "我的工作台",
          number: "1",
          childer: [
            {
              title: "工作总览",
              url: "/",
              number: "1-1"
            },
            // {
            //   title: "待办任务",
            //   url: "/",
            //   number: "1-2"
            // }
          ]
        },
        {
          title: "客户管理",
          number: "2",
          childer: [
            {
              title: "客户佣金配置",
              url: "/Rulescommission",
              number: "2-1"
            },
            {
              title: this.$t('message.Toactivate')+this.$t('message.customer'),
              url: "/Toactivate",
              number: "2-2"
            },
            {
              title: this.$t('message.Activated')+this.$t('message.customer'),
              url: "/Activated",
              number: "2-3"
            }
          ]
        },
        {
          title: "交易报表",
          number: "3",
          childer: [
            // {
            //   title: this.$t('title.transactionrecord'),
            //   url: "/transactionrecord",
            //   number: "3-1"
            // },
            {
              title: this.$t('title.tradeinformation'),
              url: "/market",
              number: "3-2"
            },
            {
              title: this.$t('message.Paymentdetails'),
              url: "/Paymentdetails",
              number: "3-3"
            }
          ]
        },
        // {
        //   title: "佣金管理",
        //   number: "4",
        //   childer: [
        //     {
        //       title: "佣金报表(IB)",
        //       url: "/Deposit",
        //       number: "4-1"
        //     },
        //     {
        //       title: "佣金管理（客户经理)",
        //       url: "/Deposit",
        //       number: "4-2"
        //     }
        //   ]
        // },
        {
          title: "资料管理",
          number: "5",
          childer: [
            {
              title: this.$t('title.dataverification'),
              url: "/dataverification",
              number: "5-1"
            }
          ]
        },
        {
          title: "出入金管理",
          number: "6",
          childer: [
            {
              title: "入金",
              url: "/Deposit",
              number: "6-1"
            },
            {
              title: "出金",
              url: "/withdraw",
              number: "6-2",
            }
          ]
        }
      ],
      join: true
    };
  },
  created() {
    this.$api.user.userinfo({}, res => {
      this.info = res.data.info;
    
    });
  },
  methods: {
    changelang(lang){
      // alert(i)
      
      //切换语言
      sessionStorage.setItem('localeLanguage',lang)
      location.reload()
    },
    handleCommand(command){
       if (command == 0) {
          this.$router.push('/login')
       }else  if (command == 1){

         this.$confirm( this.$t("message.isqut"), this.$t("hint.hint"), {
          confirmButtonText:  this.$t("message.affirm"),
          cancelButtonText: this.$t("button.cancel"),
          type: 'warning'
        }).then(() => {
          this.$api.user.userlogout({}, res => {
            sessionStorage.clear()
            this.$router.push("/");
          });
        }).catch(() => {
         
        });
         
       }
    },
    del(num){
      this.navigationlist.splice(num, 1); 
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    go(url, title, number) {
      if (url == "/withdraw" && !this.info.approved) {
           this.$notify({ type: 'warning', message: this.$t('hint.hintWithdraw') });
           return
        }
        if (url == "/Deposit" && !this.info.approved) {
           this.$notify({ type: 'warning', message: this.$t('hint.hintWithdraw') });
           return
        }
      this.join = true;
      this.navigationlist.find(e => {
        if (e.number == number) {
          this.join = false;
          return;
        }
      });
      if (this.join) {
        this.navigationlist.push({
          title,
          url,
          number
        });
        this.$router.push(url);
      } else {
        this.$router.push(url);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/style/_style.scss";
.tab-header{
  float: left;
  cursor: pointer;
  .newactive{
    background: $enterprisecolor;
    color: $text-color;
  }
  span:hover{
    background: $hovercolor;
    color: $text-color;
  }
  span{
    padding: 10px;
    border: 1px solid $bordercolor;
    border-radius: 3px
  }
}
.el-submenu__title {
  color: $text-color !important;
}
.el-breadcrumb {
  line-height: 60px;
  float: left;
}
.el-header {
  background-color: $backgroundstyle;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-header,
.el-footer {
  background-color: $backgroundstyle;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: $listbg;
  color: #333;
}

.el-main {
  background-color: $listbg;
  color: #333;
}
</style>
