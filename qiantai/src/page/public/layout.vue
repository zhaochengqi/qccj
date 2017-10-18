<template>
    <div id="container" class="effect navbar-fixed mainnav-small">
        <SysHeader>
            <!-- 公共头部通组件 -->
        </SysHeader>
        <div id="content-container">
            <transition>
                <keep-alive>
                    <router-view v-on:API-ERR="API_ERR_NOTIFY"></router-view>
                </keep-alive>
            </transition>
        </div>
        <SysFooter>
            <!-- 公共底部 -->
        </SysFooter>
        <!-- 返回顶部按钮 -->
        <button class="scroll-top">
            回到顶部
            <i class="el-icon-d-arrow-left"></i>
        </button>
    </div>
</template>
<script>
//导入框架构成公共组件
import SysHeader from './Header.vue'
import SysFooter from './Footer.vue'


export default {
    beforeCreate: function() {
        //设置当前页面标题名称
        document.title = this.pageName = this.$route.meta.pagename;

    },
    created: function() {
        //根据路由，生成面包屑导航数据
        this.navArr = this.$route.matched;
    },
    data: function() {
        return {
            navArr: [],
            pageName: ''
        }
    },
    watch: {
        '$route': function(to, from) {
            this.navArr = this.$route.matched;
            //监听路由，当路由发生改变时，变更当前页面title,keyword,desc三个属性
            document.title = this.pageName = to.meta.pagename;
        }
    },
    methods: {

        //监听回调接口请求失败后的方法
        API_ERR_NOTIFY() {
            this.$notify.error(this.$store.state.API_Err_Info);
        }
    },
    components: {
        SysHeader,
        SysFooter
    }

}
</script>
