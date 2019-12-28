<template>
    <div class="header">
        <!-- logo -->
        <div class="logo">
            <img src="@/assets/img/logo.png">
        </div>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
            <span>MENU</span>
        </div>

        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->

                <!-- 用户名下拉菜单 -->

                <div style="font-size:14px" class="lr-margin" >
                    <span class="el-dropdown-link">
                          {{$t('message.hello')}}，{{username}}
                    </span>
                </div>
                <!-- 消息中心 -->
                <el-dropdown class="user-name" trigger="click" @command="changeLoginId">
                    <span class="el-dropdown-link">
                        {{nametradeLoginId}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            :command="item.tradeLoginId"
                            v-for="(item, i) in tableData"
                            :key="i"
                        >{{item.tradeLoginId}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <!-- 语言 -->
                <el-dropdown class="user-name" trigger="click" @command="changelang">
                    <span class="el-dropdown-link">
                        <!-- <i class="iconfont icon-yuyan"></i> -->
                        <!-- {{$t('message.changetext')}} -->
                        {{langtext}}
                        <i
                            class="el-icon-caret-bottom"
                        ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            :command="item.lang"
                            v-for="(item, i) in columns"
                            :key="i"
                        >{{item.text}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                &nbsp;<span style="font-size:14px; color: #0b2643;">|</span>&nbsp;
                <div style="font-size:14px" class="logout"  @click="loginout()">
                    <span class="el-dropdown-link">
                        {{$t('header.loginout')}}
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            langtext:sessionStorage.localeLanguage,
            collapse: false,
            fullscreen: false,
            name: '-',
            message: 2,
            info: '',
            columns: [
                // { text: this.$t('message.language1'), lang: 'zh' },
                { text: this.$t('message.language2'), lang: 'zhHk' },
                { text: this.$t('message.language3'), lang: 'en' }
            ],
            tableData: [],
            nametradeLoginId:sessionStorage.tradeLoginId == undefined? this.$t('header.hint'):sessionStorage.tradeLoginId
        };
    },
    created() {
        this.columns.forEach(e=>{
            if (e.lang == sessionStorage.localeLanguage) {
                this.langtext = e.text
            }
        })
        this.$api.user.userinfo({}, res => {
            this.info = res.data.info;
            sessionStorage.info = JSON.stringify(res.data.info);
        });
        this.$api.user.usertradeAccounts(
            {
                id: this.$route.query.userdata
            },
            res => {
                this.tableData = res.data.list;
            }
        );
    },
    computed: {
        username() {
            if (this.info != undefined) {
                var username = this.info.displayName == "nullnull"?this.info.email:this.info.displayName
            } else {
                var username =  this.$t('header.hint1');
            }

            return username ? username : this.name;
        }
    },
    methods: {
        changeLoginId(id){
            console.log(id)
            sessionStorage.tradeLoginId = id
            this.$message({
            type: 'success',
            message:  this.$t('header.hint2')
          });
          location.reload()
        },
        changelang(lang) {
            // alert(i)

            //切换语言
            sessionStorage.setItem('localeLanguage', lang);
            location.reload();
        },
        loginout(){
            this.$msgbox({
                    title: this.$t('message.isqut'),
                    showCancelButton: true,
                    confirmButtonText:this.$t('message.affirm'),
                    cancelButtonText: this.$t('button.cancel'),
                })
                    .then(() => {
                        this.$api.user.userlogout({}, res => {
                            sessionStorage.clear();
                            // localStorage.clear()
                            this.$router.push('/login');
                        });
                    })
                    .catch(() => {});
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                // localStorage.removeItem('ms_username');
                // this.$router.push('/login');
                this.$msgbox({
                    title: this.$t('message.isqut'),
                    showCancelButton: true,
                    confirmButtonText: this.$t('message.affirm'),
                    cancelButtonText:this.$t('button.cancel'),
                })
                    .then(() => {
                        this.$api.user.userlogout({}, res => {
                            sessionStorage.clear();

                            this.$router.push('/login');
                        });
                    })
                    .catch(() => {});
            } else if (command == 'changelogin') {
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped lang="scss">
@import '@/style/_style.scss';
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height:70px;
    font-size: 22px;
    color: #fff;
    border-bottom: 1px solid #e6fffc;
}
.collapse-btn {
    float: left;
    padding: 25px 10px 0;
    cursor: pointer;
    line-height: 60px;
    color:  #0b2643;
}
.collapse-btn:hover {
    background: none;
    color: #ffffff;
}
.header .logo {
    padding-top: 5px;
    padding-left: 2px;
    float: left;
    // width: 250px;
    line-height: 70px;

    img {
        width: 60px;
        height: 60px;
        background: #fff;
        border-radius: 30px;
    }
}

.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 110px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}

.logout:hover span{
    // color: $hovercolor
    color: #ffffff;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #0b2643;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
