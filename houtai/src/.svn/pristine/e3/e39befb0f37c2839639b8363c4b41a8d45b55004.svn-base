<template>
    <div id="demo-set" class="demo-set">
        <div id="demo-set-body" class="demo-set-body collapse">
            <div id="demo-set-alert"></div>
            <div class="pad-hor bord-btm clearfix">
                <div class="pull-right pad-top">
                    <button id="demo-btn-close-settings" class="btn btn-trans">
                        <i class="pci-cross pci-circle icon-lg"></i>
                    </button>
                </div>
                <div class="media">
                    <div class="media-left">
                        <i class="demo-pli-gear icon-2x"></i>
                    </div>
                    <div class="media-body">
                        <span class="text-semibold text-lg text-main">系统偏好设置</span>
                        <p class="text-muted text-sm">界面布局、侧边导航以及皮肤设置</p>
                    </div>
                </div>
            </div>
            <div class="demo-set-content clearfix">
                <div class="col-xs-6 col-md-3">
                    <div class="pad-all bg-gray-light">
                        <p class="text-semibold text-main text-lg">界面布局</p>
                        <p class="text-semibold text-main pad-top">盒子布局模式设置</p>
                        <div class="pad-btm">
                            <div class="pull-right">
                                <input id="demo-box-lay" class="toggle-switch" type="checkbox" @click="setLayout('box')">
                                <label for="demo-box-lay"></label>
                            </div>
                            开启盒子布局
                        </div>
                        <div class="pad-btm">
                            <div class="pull-right">
                                <button id="demo-box-img" class="btn btn-sm btn-trans" disabled><i class="pci-hor-dots"></i></button>
                            </div>
                            设置盒子背景图片
                        </div>
                        <hr class="new-section-xs bord-no">
                        <p class="text-semibold text-main">页面切换动画</p>
                        <div class="pad-btm">
                            <div class="pull-right">
                                <input id="demo-anim" class="toggle-switch" type="checkbox" @click="setLayout('animate')">
                                <label for="demo-anim"></label>
                            </div>
                            开启动画效果
                        </div>
                        <div class="pad-btm hidden">
                            <div class="select pull-right">
                                <select id="demo-ease" v-model="animate_type">
                                    <option value="effect">ease (Default)</option>
                                    <option value="easeInQuart">easeInQuart</option>
                                    <option value="easeOutQuart">easeOutQuart</option>
                                    <option value="easeInBack">easeInBack</option>
                                    <option value="easeOutBack">easeOutBack</option>
                                    <option value="easeInOutBack">easeInOutBack</option>
                                    <option value="steps">Steps</option>
                                    <option value="jumping">Jumping</option>
                                    <option value="rubber">Rubber</option>
                                </select>
                            </div>
                            效果
                        </div>
                        <hr class="new-section-xs bord-no">
                        <p class="text-semibold text-main ">固定头部位置</p>
                        <div>
                            <div class="pull-right">
                                <input id="demo-navbar-fixed" class="toggle-switch" type="checkbox" @click="setLayout('navbar-fixed')">
                                <label for="demo-navbar-fixed"></label>
                            </div>
                            开启固定头部
                        </div>
                        <hr class="new-section-xs bord-no">
                        <p class="text-semibold text-main">固定页脚位置</p>
                        <div class="pad-btm">
                            <div class="pull-right">
                                <input id="demo-footer-fixed" class="toggle-switch" type="checkbox" @click="setLayout('footer-fixed')">
                                <label for="demo-footer-fixed"></label>
                            </div>
                            开启固定页脚
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 pos-rel">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="pad-all">
                                <p class="text-semibold text-main text-lg">侧边栏</p>
                                <p class="text-semibold text-main pad-top">左侧导航</p>
                                <div class="mar-btm">
                                    <div class="pull-right">
                                        <input id="demo-nav-fixed" class="toggle-switch" type="checkbox" @click="setLayout('slider-fixed')">
                                        <label for="demo-nav-fixed"></label>
                                    </div>
                                    固定左侧导航
                                </div>
                                <div class="mar-btm hidden">
                                    <div class="pull-right">
                                        <input id="demo-nav-profile" class="toggle-switch" type="checkbox" @click="setSlider('userinfo')">
                                        <label for="demo-nav-profile"></label>
                                    </div>
                                    显示左侧用户头像
                                </div>
                                <div class="mar-btm hidden">
                                    <div class="pull-right">
                                        <input id="demo-nav-shortcut" class="toggle-switch" type="checkbox" @click="setSlider('fastlink')">
                                        <label for="demo-nav-shortcut"></label>
                                    </div>
                                    显示快捷按钮
                                </div>
                                <div class="mar-btm">
                                    <div class="pull-right">
                                        <input id="demo-nav-coll" class="toggle-switch" type="checkbox" @click="setSlider('menu')">
                                        <label for="demo-nav-coll"></label>
                                    </div>
                                    默认折叠导航菜单
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div id="demo-theme">
                                <div class="row bg-gray-light pad-top">
                                    <p class="text-semibold text-main text-lg pad-lft">颜色皮肤设置</p>
                                    <div class="demo-theme-btn col-md-4 pad-ver">
                                        <p class="text-semibold text-main">页面头部</p>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-a-light add-tooltip" data-theme="theme-light" data-type="a" data-title="(A). Light" @click="setTheme('a','theme-light')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-navy add-tooltip" data-theme="theme-navy" data-type="a" data-title="(A). Navy Blue" @click="setTheme('a','theme-navy')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-ocean add-tooltip" data-theme="theme-ocean" data-type="a" data-title="(A). Ocean" @click="setTheme('a','theme-ocean')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-a-lime add-tooltip" data-theme="theme-lime" data-type="a" data-title="(A). Lime" @click="setTheme('a','theme-lime')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-purple add-tooltip" data-theme="theme-purple" data-type="a" data-title="(A). Purple" @click="setTheme('a','theme-purple')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-dust add-tooltip" data-theme="theme-dust" data-type="a" data-title="(A). Dust" @click="setTheme('a','theme-dust')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-a-mint add-tooltip" data-theme="theme-mint" data-type="a" data-title="(A). Mint" @click="setTheme('a','theme-mint')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-yellow add-tooltip" data-theme="theme-yellow" data-type="a" data-title="(A). Yellow" @click="setTheme('a','theme-yellow')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-well-red add-tooltip" data-theme="theme-well-red" data-type="a" data-title="(A). Well Red" @click="setTheme('a','theme-well-red')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-a-coffee add-tooltip" data-theme="theme-coffee" data-type="a" data-title="(A). Coffee" @click="setTheme('a','theme-coffee')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="a" data-title="(A). Prickly pear" @click="setTheme('a','theme-prickly-pear')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-a-dark add-tooltip" data-theme="theme-dark" data-type="a" data-title="(A). Dark" @click="setTheme('a','theme-dark')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="demo-theme-btn col-md-4 pad-ver">
                                        <p class="text-semibold text-main">系统名称</p>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-b-light add-tooltip" data-theme="theme-light" data-type="b" data-title="(B). Light" @click="setTheme('b','theme-light')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-navy add-tooltip" data-theme="theme-navy" data-type="b" data-title="(B). Navy Blue" @click="setTheme('b','theme-navy')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-ocean add-tooltip" data-theme="theme-ocean" data-type="b" data-title="(B). Ocean" @click="setTheme('b','theme-ocean')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-b-lime add-tooltip" data-theme="theme-lime" data-type="b" data-title="(B). Lime" @click="setTheme('b','theme-lime')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-purple add-tooltip" data-theme="theme-purple" data-type="b" data-title="(B). Purple" @click="setTheme('b','theme-purple')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-dust add-tooltip" data-theme="theme-dust" data-type="b" data-title="(B). Dust" @click="setTheme('b','theme-dust')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-b-mint add-tooltip" data-theme="theme-mint" data-type="b" data-title="(B). Mint" @click="setTheme('b','theme-mint')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-yellow add-tooltip" data-theme="theme-yellow" data-type="b" data-title="(B). Yellow" @click="setTheme('b','theme-yellow')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-well-red add-tooltip" data-theme="theme-well-red" data-type="b" data-title="(B). Well red" @click="setTheme('b','theme-well-red')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-b-coffee add-tooltip" data-theme="theme-coffee" data-type="b" data-title="(B). Coofee" @click="setTheme('b','theme-coffee')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="b" data-title="(B). Prickly pear" @click="setTheme('b','theme-prickly-pear')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-b-dark add-tooltip" data-theme="theme-dark" data-type="b" data-title="(B). Dark" @click="setTheme('b','theme-dark')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="demo-theme-btn col-md-4 pad-ver">
                                        <p class="text-semibold text-main">导航</p>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-c-light add-tooltip" data-theme="theme-light" data-type="c" data-title="(C). Light" @click="setTheme('c','theme-light')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-navy add-tooltip" data-theme="theme-navy" data-type="c" data-title="(C). Navy Blue" @click="setTheme('c','theme-navy')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-ocean add-tooltip" data-theme="theme-ocean" data-type="c" data-title="(C). Ocean" @click="setTheme('c','theme-ocean')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-c-lime add-tooltip" data-theme="theme-lime" data-type="c" data-title="(C). Lime" @click="setTheme('c','theme-lime')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-purple add-tooltip" data-theme="theme-purple" data-type="c" data-title="(C). Purple" @click="setTheme('c','theme-purple')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-dust add-tooltip" data-theme="theme-dust" data-type="c" data-title="(C). Dust" @click="setTheme('c','theme-dust')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-c-mint add-tooltip" data-theme="theme-mint" data-type="c" data-title="(C). Mint" @click="setTheme('c','theme-mint')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-yellow add-tooltip" data-theme="theme-yellow" data-type="c" data-title="(C). Yellow" @click="setTheme('c','theme-yellow')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-well-red add-tooltip" data-theme="theme-well-red" data-type="c" data-title="(C). Well Red" @click="setTheme('c','theme-well-red')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                        <div class="demo-justify-theme">
                                            <a href="#" class="demo-theme demo-c-coffee add-tooltip" data-theme="theme-coffee" data-type="c" data-title="(C). Coffee" @click="setTheme('c','theme-coffee')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="c" data-title="(C). Prickly pear" @click="setTheme('c','theme-prickly-pear')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                            <a href="#" class="demo-theme demo-c-dark add-tooltip" data-theme="theme-dark" data-type="c" data-title="(C). Dark" @click="setTheme('c','theme-dark')">
                                                <div class="demo-theme-brand"></div>
                                                <div class="demo-theme-head"></div>
                                                <div class="demo-theme-nav"></div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="demo-bg-boxed" class="demo-bg-boxed">
                        <div class="demo-bg-boxed-content">
                            <div class="row">
                                <div class="col-lg-4 text-justify">
                                    <p class="text-semibold text-main">Blurred</p>
                                    <div id="demo-blurred-bg" class="text-justify">
                                        <a href="#" class="thumbnail box-inline" @click="setBoxBgimg('blurred',index+1)" v-for="(n,index) in box_bg_1">
                                            <img class="img-responsive" :src="n" alt="Background Image">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-4 text-justify">
                                    <p class="text-semibold text-main">Polygon &amp; Geometric</p>
                                    <div id="demo-polygon-bg" class="text-justify">
                                        <a href="#" class="thumbnail box-inline" @click="setBoxBgimg('polygon',index+1)" v-for="(n,index) in box_bg_2">
                                            <img class="img-responsive" :src="n" alt="Background Image">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-4 text-justify">
                                    <p class="text-semibold text-main">Abstract</p>
                                    <div id="demo-abstract-bg" class="text-justify">
                                        <a href="#" class="thumbnail box-inline" @click="setBoxBgimg('abstract',index+1)" v-for="(n,index) in box_bg_3">
                                            <img class="img-responsive" :src="n" alt="Background Image">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="demo-bg-boxed-footer">
                            <button id="demo-close-boxed-img" class="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button id="demo-set-btn" class="btn" data-toggle="collapse" data-target="#demo-set-body"><i class="demo-psi-gear icon-lg"></i></button>
    </div>
</template>
<script>
export default {
    created: function() {},
    data: function() {
        return {
            animate_type: this.$store.state.settings.layout.animate.type,
            box_bg_1: this.bg_thumb_template('blurred'),
            box_bg_2: this.bg_thumb_template('polygon'),
            box_bg_3: this.bg_thumb_template('abstract'),
        }

    },
    methods: {
        //设置是否开启盒子布局
        setLayout(type) {
            var niftyContainer = $('#container')
            switch (type) {
                case 'box':
                    //开启盒子布局
                    if (niftyContainer.hasClass('boxed-layout')) {
                        this.$store.commit('setBoxLayout', false)
                    } else {
                        this.$store.commit('setBoxLayout', true)
                    }
                    break;

                case 'animate':
                    //设置界面动画
                    if (niftyContainer.hasClass('effect')) {
                        this.$store.commit('setAnimate', {
                            status: false,
                            type: this.$store.state.settings.layout.animate.type
                        })
                    } else {
                        this.$store.commit('setAnimate', {
                            status: true,
                            type: this.$store.state.settings.layout.animate.type
                        })
                    }
                    break;

                case 'navbar-fixed':
                    //固定头部
                    if (niftyContainer.hasClass('navbar-fixed')) {
                        this.$store.commit('setFixed', {
                            header: false,
                            footer: this.$store.state.settings.layout.fixed.footer,
                            slider: this.$store.state.settings.layout.fixed.slider
                        })
                    } else {
                        this.$store.commit('setFixed', {
                            header: true,
                            footer: this.$store.state.settings.layout.fixed.footer,
                            slider: this.$store.state.settings.layout.fixed.slider
                        })
                    }
                    break;

                case 'footer-fixed':
                    //固定头部、页脚 
                    if (niftyContainer.hasClass('footer-fixed')) {
                        this.$store.commit('setFixed', {
                            header: this.$store.state.settings.layout.fixed.footer,
                            footer: false,
                            slider: this.$store.state.settings.layout.fixed.slider
                        })
                    } else {
                        this.$store.commit('setFixed', {
                            header: this.$store.state.settings.layout.fixed.footer,
                            footer: true,
                            slider: this.$store.state.settings.layout.fixed.slider
                        })
                    }
                    break;

                case 'slider-fixed':
                    //固定左侧导航 
                    if (niftyContainer.hasClass('mainnav-fixed')) {
                        this.$store.commit('setFixed', {
                            header: this.$store.state.settings.layout.fixed.footer,
                            footer: this.$store.state.settings.layout.fixed.footer,
                            slider: false
                        })
                    } else {
                        this.$store.commit('setFixed', {
                            header: this.$store.state.settings.layout.fixed.footer,
                            footer: this.$store.state.settings.layout.fixed.footer,
                            slider: true
                        })
                    }
                    break;
                default:
                    break;
            }



        },
        //设置左侧菜单
        setSlider(type) {

            switch (type) {
                case 'userinfo':
                    //是否显示左侧用户信息
                    var navProfile = $('#mainnav-profile')
                    if (navProfile.hasClass('hidden')) {
                        this.$store.commit('setSlider', {
                            userinfo: true,
                            fastlink: this.$store.state.settings.slider.fastlink,
                            menu: this.$store.state.settings.slider.menu
                        })
                    } else {
                        this.$store.commit('setSlider', {
                            userinfo: false,
                            fastlink: this.$store.state.settings.slider.fastlink,
                            menu: this.$store.state.settings.slider.menu
                        })
                    }
                    break;

                case 'fastlink':
                    //是否显示左侧用户信息
                    var navShortcut = $('#mainnav-shortcut')
                    if (navShortcut.hasClass('hidden')) {
                        this.$store.commit('setSlider', {
                            userinfo: this.$store.state.settings.slider.userinfo,
                            fastlink: true,
                            menu: this.$store.state.settings.slider.menu
                        })
                    } else {
                        this.$store.commit('setSlider', {
                            userinfo: this.$store.state.settings.slider.userinfo,
                            fastlink: false,
                            menu: this.$store.state.settings.slider.menu
                        })
                    }
                    break;

                case 'menu':
                    //设置是否默认收缩菜单
                    var niftyContainer = $('#container')
                    if (niftyContainer.hasClass('mainnav-lg')) {
                        this.$store.commit('setSlider', {
                            userinfo: this.$store.state.settings.slider.userinfo,
                            fastlink: this.$store.state.settings.slider.fastlink,
                            menu: true
                        })
                    } else {
                        this.$store.commit('setSlider', {
                            userinfo: this.$store.state.settings.slider.userinfo,
                            fastlink: this.$store.state.settings.slider.fastlink,
                            menu: false
                        })
                    }
                    break;
            }

        },
        //设置皮肤样式
        setTheme(type, name) {
            var fileext = '.min.css',
                filename = 'static/css/themes/type-' + type + '/' + name + fileext
            this.$store.commit('setTheme', filename)

        },
        //生成背景缩略图
        bg_thumb_template(cat) {
            var list = [];
            for (var i = 1; i < 17; i++) {
                list[i - 1] = 'static/img/boxed-bg/' + cat + '/thumbs/' + i + '.jpg';
            }
            return list;
        },
        //设置盒子背景图片
        setBoxBgimg(type, index) {
            var fileext = '.jpg',
                filename = 'static/img/boxed-bg/' + type + '/bg/' + index + '.jpg'
            this.$store.commit('setBoxBgimg', filename)
        }
    },
    watch: {
        // 监听“animate”动画类型下拉菜单，当值发生改变时，重新提交一次数据  
        'animate_type': function(newValue, oldValue) {
            var niftyContainer = $('#container')
            if (niftyContainer.hasClass('effect')) {
                this.$store.commit('setAnimate', {
                    status: true,
                    type: this.animate_type
                })
            } else {
                this.$store.commit('setAnimate', {
                    status: false,
                    type: this.animate_type
                })
            }
        }
    }
}
</script>
