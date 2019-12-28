<template>
    <div>
        <div class="tp-h">
            <ul>
                <li class="tp-li-m">
                    <a class="astyle" href="http://www.nag.com/live-chat-box.html">Live</a>
                </li>
                <li class="pl-3 tp-li-m">
                    <router-link to="signupdemo">Demo</router-link>
                </li>

                <li class="pl-3 tp-li-m">
                    <el-dropdown trigger="click" @command="changetext">
                        <span class="el-dropdown-link">
                            {{$t('message.changetext')}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="e.lang" v-for="(e,i) in columns">{{e.text}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li v-show="islogin" class="pl-3 tp-li-m">
                    <a class="astyle mynm" href="/">{{loginname}}</a>
                </li>
                <!-- <li class="pl-3 tp-li-m">
          <a class="astyle" href>Livechat</a>
                </li>-->
            </ul>
        </div>
        <div class="tp-b flex flexjustify">
            <a class="astyle" href="http://www.nag.com/">
                <img src="../../assets/common/img/logo.png" alt />
            </a>

            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
            >
                <el-menu-item index="1">
                    <a class="astyle" href="http://www.nag.com/home.html">Home</a>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <span class="fy-text astyle">Markets</span>
                    </template>
                    <el-menu-item index="2-1">
                        <a class="astyle" href="http://www.nag.com/forex.html">Forex</a>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <a class="astyle" href="http://www.nag.com/metals.html">Metals</a>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <a class="astyle" href="http://www.nag.com/energy.html">Energy</a>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <a class="astyle" href="http://www.nag.com/indices.html">Indices</a>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title" class="fy-text">
                        <span class="fy-text">Trading</span>
                    </template>
                    <el-menu-item index="3-1">
                        <a class="astyle" href="http://www.nag.com/trading-account.html">Account types</a>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <a class="astyle" href="http://www.nag.com/why-partner-nag.html">Why Partner with NAGMarkets</a>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <a class="astyle" href="http://www.nag.com/trading-platforms.html">Trading platforms</a>
                    </el-menu-item>
                    <el-submenu index="3-4">
                        <template slot="title">
                            <span class="astyle">Trading Tools</span>
                        </template>
                        <el-menu-item index="3-4-1">
                            <a class="astyle" href="http://www.nag.com/autochartist.html">AutoCharitist</a>
                        </el-menu-item>
                        <el-menu-item index="3-4-2">
                            <a class="astyle" href="http://www.nag.com/economic-calendar.html">Economic Calendar</a>
                        </el-menu-item>
                        <el-menu-item index="3-4-3">
                            <a class="astyle" href="http://www.nag.com/market-news.html">Market News</a>
                        </el-menu-item>
                        <el-menu-item index="2-4-3">
                            <a class="astyle" href="http://www.nag.com/market-commentary.html">Market Commentary</a>
                        </el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <span class="fy-text astyle">Products</span>
                    </template>
                    <el-menu-item index="4-1">
                        <a class="astyle" href="http://www.nag.com/product-and-cost.html">Product Specifications</a>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <a class="astyle" href="http://www.nag.com/funding-and-charges.html">Rollovers</a>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <span class="fy-text">Help centre</span>
                    </template>
                    <el-menu-item index="5-1">
                        <a class="astyle" href="http://www.nag.com/about-us.html">About Us</a>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                        <a class="astyle" href="http://www.nag.com/legal-documents.html">Legal Documents</a>
                    </el-menu-item>
                    <el-menu-item index="5-3">
                        <a class="astyle" href="http://www.nag.com/faqs.html">FAQs</a>
                    </el-menu-item>
                    <el-menu-item index="5-4">
                        <a cl href="http://www.nag.com/contact-us.html">Contact Us</a>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item class="bt" index="6">Get Started</el-menu-item>
            </el-menu>
        </div>
        
    </div>
</template>
  <script>
export default {
    name: 'App',
    props: {},
    data() {
        return {
        //   defaultActive:1,
          activeIndex:[],
            showlist: false,
            showlist2: false,
            showlist3: false,
            showlist4: false,
            showlist5: false,
            islogin: false,
            loginname: this.$t('header.hint1'),
            columns: [
                // { text: this.$t('message.language1'), lang: 'zh' },
                { text: this.$t('message.language2'), lang: 'zhHk' },
                { text: this.$t('message.language3'), lang: 'en' }
            ]
        };
    },
    created() {
        if (sessionStorage.info != undefined) {
            this.islogin = true;
            this.loginname = JSON.parse(sessionStorage.info).displayName;
        } else {
            this.islogin = false;
        }
        
    },
    methods: {
       
      changetext(lang){
         sessionStorage.setItem('localeLanguage', lang);
          location.reload();
      },
        hidelist(num) {
            if (num == 1) {
                this.showlist = false;
            } else if (num == 2) {
                this.showlist2 = false;
            }
        },
        showlistone(num) {
            console.log(156);
            if (num == 1) {
                this.showlist = !this.showlist;
                this.showlist2 = false;
                this.showlist3 = false;
                this.showlist4 = false;
                this.showlist5 = false;
            } else if (num == 2) {
                this.showlist = false;
                this.showlist2 = !this.showlist2;
                this.showlist3 = false;
                this.showlist4 = false;
                this.showlist5 = false;
            } else if (num == 3) {
                this.showlist = false;
                this.showlist2 = true;
                this.showlist3 = !this.showlist3;
                this.showlist4 = false;
                this.showlist5 = false;
            } else if (num == 4) {
                this.showlist = false;
                this.showlist2 = false;
                this.showlist3 = false;
                this.showlist4 = !this.showlist4;
                this.showlist5 = false;
            } else if (num == 5) {
                this.showlist = false;
                this.showlist2 = false;
                this.showlist3 = false;
                this.showlist4 = false;
                this.showlist5 = !this.showlist5;
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import '@/style/_style.scss';
.astyle {
    color: #333;
}
.astyle:hover {
    color: rgb(119, 230, 230);
}
.el-menu--horizontal > .el-menu-item {
    font-size: 18px;
}
.fy-text {
    background: #fff !important;
    font-size: 18px !important;
}
.el-menu-demo {
    width: 100%;
    border: none;
    display: flex;
    justify-content: space-between;
}
.tp-h {
    .el-dropdown {
        color: $text-color;
    }
}

ul li {
    list-style: none;
}
.tp-h {
    background: $style-background;
    overflow: hidden;
    padding: 0px 2%;
    ul {
        float: right;
        margin: 10px 0px;
        li {
            color: $text-color;
            display: inline-block;
            padding: 5px;
        }
        a {
            color: $text-color;
            text-decoration: none;
        }
    }
}
.tp-li-m,
.listone {
    padding: 20px 0px;
}
.tp-b {
    align-items: center;
    background: $listbg;
    padding: 0px 15%;
    .bt {
        background: $style-background !important;
        color: $text-color;
        a {
            color: $text-color;
        }
    }
    //   .listone{
    //     #dropdownMenu1 {
    //       z-index: 9;
    //       display: block;
    //     }

    //   }
    //   .listone:hover #dropdownMenu1{
    //     display: block;
    //   }
    //   #dropdownMenu1:hover{
    // display: block;
    //     }

    .dropdown-menu {
        position: absolute;
        background: $hovercolor;
        padding: 0px;
        border-radius: 5px;
        z-index: 9;
        // display: none;
        li {
            padding: 10px 20px;
            a {
                color: $text-color;
            }
        }
        li:hover {
            background: $style-background;
            a {
                color: $text-color;
            }
        }
    }
    #dropdownMenu2 {
        position: absolute;
        left: 100%;
        z-index: 6;
        width: 100%;
        top: 81%;
    }
}
</style>




















