<template>
    <div>
        <div id="bg-overlay" :class="{'bg-img':bgImgStatus}" :style="{'background-image':'url('+bgImgUrl+')'}"></div>
        <!-- LOGIN FORM -->
        <!--===================================================-->
        <div class="cls-content">
            <div class="cls-content-sm panel">
                <div class="panel-body">
                    <div class="mar-ver pad-btm">
                        <h3 class="h3 mar-no">账号登录</h3>
                        <p class="text-muted">Sign In to your account</p>
                    </div>
                    <el-form :model="formData" :rules="rules" ref="formData" @keyup.enter.native="submitForm('formData')">
                        <div class="form-group">
                            <el-form-item prop="account">
                                <el-input placeholder="请输入内容" v-model="formData.account" autofocus>
                                    <el-select v-model="formData.type" slot="prepend" placeholder="选择登录类型" style="width:105px">
                                        <el-option label="身份认证" value="1"></el-option>
                                        <el-option label="系统账号" value="2"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <el-form-item prop="password">
                                <el-input placeholder="请输入内容" type="password" v-model="formData.password">
                                    <template slot="prepend">您的登录密码</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="form-group">
                            <div class="checkbox pad-btm text-left">
                                <el-checkbox v-model="formData.checked" label="记住我"></el-checkbox>
                            </div>
                        </div>
                        <el-button size="large" type="primary" @click="submitForm('formData')" class="btn-block">登录系统</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <!--===================================================-->
        <!-- DEMO PURPOSE ONLY -->
        <!--===================================================-->
        <div class="demo-bg text-center">
            <div id="demo-bg-list">
                <div class="demo-loading"><i class="psi-repeat-2"></i></div>
                <img class="demo-chg-bg bg-trans" src="../../assets/img/bg-img/thumbs/bg-trns.jpg" @click="setBgImg(0)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-1.jpg" @click="setBgImg(1)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-2.jpg" @click="setBgImg(2)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-3.jpg" @click="setBgImg(3)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-4.jpg" @click="setBgImg(4)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-5.jpg" @click="setBgImg(5)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-6.jpg" @click="setBgImg(6)">
                <img class="demo-chg-bg" src="../../assets/img/bg-img/thumbs/bg-img-7.jpg" @click="setBgImg(7)">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    data: function() {
        return {
            bgImgStatus: false,
            bgImgUrl: 'none',
            formData: {
                type: '2',
                account: '',
                password: '',
                checked: true
            },
            rules: {
                account: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    created: function() {
        //设置当前页面标题名称
        document.title = '账号登录'

        //如果有设置背景图片则显示
        var bgUrl = this.$store.state.settings.bgImg;
        if (bgUrl != 'none') {
            this.bgImgStatus = true;
            this.bgImgUrl = bgUrl;
        }
    },
    methods: {
        //设置登录页面背景图片
        setBgImg(img_num) {
            var $target = $('#bg-overlay');
            if (img_num == 0) {
                var url = 'none'
            } else {
                var url = 'static/img/bg-img/bg-img-' + img_num + '.jpg';
            }
            $target.css('background-image', 'url("' + url + '")').addClass('bg-img');
            this.$store.commit('setBgImg', url);
        },
        submitForm(formData) {
            this.$refs[formData].validate((valid) => {
                if (valid) {
                    //跨域请求，注意此处的跨域接口主域名在config/index.js配置
                    this.axios({
                        method: 'post',
                        url: this.API_ROOT + '/home_api/login',
                        data: this.formData
                    }).then((ret) => {
                        if (ret.data.status.code !== 1001) {
                            this.$message.error(ret.data.data ? ret.data.data : ret.data.status.title);
                        } else {
                            this.$store.commit('setUserinfo', ret.data.data);
                            this.getSliderNav();
                        };
                    }, (error) => {
                        this.$notify.error({
                            title: '操作提示！',
                            message: '服务器请求失败！',
                            duration: 3000
                        });
                    });
                } else {
                    this.$message({
                        message: '请检查是否填写账号信息！',
                        type: "dagner"
                    });
                    return false;
                };
            })
        },
        //生成左侧导航数据
        getSliderNav() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/node/treemenu',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.$store.commit('setSliderNav', response.data.data);
                    this.$router.push({
                        name: "home"
                    });
                    setTimeout(function() {
                        window.location.reload()
                    }, 10);
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        }
    }
}
</script>
