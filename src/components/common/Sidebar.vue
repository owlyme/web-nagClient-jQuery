<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#8cc7cc"
            text-color="#20324c"
            active-text-color="#20324c"

            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <div  v-for="subItem in item.subs" :key="subItem.index">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </div>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [

        {
          title: this.$t('leftlist.title1'),
          icon: "iconfont icon-shouye",
          index:'1',
          subs: [
            {
              title: this.$t('leftlist.title2'),
              index: "/",
              icon: "icon-gongzuotai"
            },
            // {
            //   title: "待办任务",
            //   index: "/",
            //   icon: "1-2"
            // }
          ]
        },
        {
          title: this.$t('leftlist.title3'),
         icon: "iconfont icon-kehuguanli1",
          index:'2',
          subs: [
              {
              title: this.$t('message.newcustomer'),
              index: "adduser",
            },
            {
              title: this.$t('leftlist.title4'),
              index: "Rulescommission",
            },
            {
              title: this.$t('replenished.hint42'),
              index: "toactivate",
            },
            {
              title: this.$t('message.Activated')+this.$t('message.customer'),
              index: "Activated",
            }
          ]
        },
        {
          title:  this.$t('title.MyEarnings'),
          icon: "iconfont icon-jiaoyibaobiao",
          index:'/commissionib',
          // subs: [
          //   {
          //     title: "我的收入",
          //     index: "/commissionib",
          //     icon: "3-1"
          //   },
          //   {
          //     title: "交易信息",
          //     index: "/market",
          //     icon: "3-2"
          //   }
          // ]
        },
        {
          title: this.$t('leftlist.title5'),
          icon: "iconfont icon-churujinguanli",
           index:'4',
          subs: [
            {
              title:  this.$t('message.Deposit'),
              index: "deposit",
            },
            {
              title:  this.$t('message.withdraw'),
              index: "withdraw",
            },
             {
              title:  this.$t('message.Paymentdetails'),
              index: "accountdetails",
            },

          ]
        },

        // {
        //   title: " 交易歷史",
        //   icon: "iconfont icon-jiaoyi",
        //    index:'5',
        //   subs: [
        //     // {
        //     //   title: this.$t('title.transactionrecord'),
        //     //   index: "/transactionrecord",
        //     //   icon: "5-1"
        //     // },
        //     {
        //       title: this.$t('title.tradeinformation'),
        //       index: "market",
        //     },
        //     {
        //       title: this.$t('message.Paymentdetails'),
        //       index: "Paymentdetails",
        //     }
        //   ]
        // },
        {
          title: this.$t('leftlist.title6'),
          icon: "iconfont icon-ziliaoguanli1",
           index:'6',
          subs: [
            // {
            //   title: this.$t('title.dataverification'),
            //   index: "form",
            // }
            {
              title: this.$t('leftlist.title7'),
              index: "logMessage",
            },
            {
              title: this.$t('leftlist.title8'),
              index: "upload",
            },{
              title: this.$t('title.changepassword'),
              index: "changepassword",

            }
          ]
        },
        {
          title: this.$t('message.TransactionHistory'),
          icon: "iconfont icon-jiaoyi",
           index:'transactionrecord'
        },
        {
          title: this.$t('title.tradeinformation'),
          icon: "iconfont icon-jiaoyijilu",
          index:'/market'
        }
        // ,{
        //             icon: 'el-icon-lx-home',
        //             index: 'dashboard',
        //             title: '系统首页'
        //         },
        //         {
        //             icon: 'el-icon-lx-cascades',
        //             index: 'table',
        //             title: '基础表格'
        //         },
        //         {
        //             icon: 'el-icon-lx-copy',
        //             index: 'tabs',
        //             title: 'tab选项卡'
        //         },
        //         {
        //             icon: 'el-icon-lx-calendar',
        //             index: '7',
        //             title: '表单相关',
        //             subs: [
        //                 {
        //                     index: 'form',
        //                     title: '基本表单'
        //                 },
        //                 {
        //                     index: '7-2',
        //                     title: '三级菜单',
        //                     subs: [
        //                         {
        //                             index: 'editor',
        //                             title: '富文本编辑器'
        //                         },
        //                         {
        //                             index: 'markdown',
        //                             title: 'markdown编辑器'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     index: 'upload',
        //                     title: '文件上传'
        //                 }
        //             ]
        //         },
        //         {
        //             icon: 'el-icon-lx-emoji',
        //             index: 'icon',
        //             title: '自定义图标'
        //         },
        //         {
        //             icon: 'el-icon-pie-chart',
        //             index: 'charts',
        //             title: 'schart图表'
        //         },
        //         {
        //             icon: 'el-icon-rank',
        //             index: '8',
        //             title: '拖拽组件',
        //             subs: [
        //                 {
        //                     index: 'drag',
        //                     title: '拖拽列表'
        //                 },
        //                 {
        //                     index: 'dialog',
        //                     title: '拖拽弹框'
        //                 }
        //             ]
        //         },
        //         {
        //             icon: 'el-icon-lx-global',
        //             index: 'i18n',
        //             title: '国际化功能'
        //         },
        //         {
        //             icon: 'el-icon-lx-warn',
        //             index: '9',
        //             title: '错误处理',
        //             subs: [
        //                 {
        //                     index: 'permission',
        //                     title: '权限测试'
        //                 },
        //                 {
        //                     index: '404',
        //                     title: '404页面'
        //                 }
        //             ]
        //         },
        //         {
        //             icon: 'el-icon-lx-redpacket_fill',
        //             index: '/donate',
        //             title: '支持作者'
        //         }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    watch: {
      $route(to,from,next){
          console.log(to,from,next)
      }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            console.log(msg)
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
@import '@/style/leftstyle.scss';
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}

.el-submenu .el-menu-item {
    padding-left: 60px !important;
}

.ele-menu--popup{
    .el-menu-item {

    }
}

</style>
