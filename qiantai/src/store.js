import Vue from 'vue'
import Vuex from 'vuex'

//导入LocalStorage的封装器，详细使用方式参考 Git上storejs
import LS from 'storejs'

Vue.use(Vuex)

//定义数据仓库前缀，避免保存到LocalStorage中的数据节点冲突
var sysKeys = 'DB_auto_biz_home_'


/**
 * 定义每页显示记录条数的下拉菜单选项
 * @type {Array}
 */
const pageSizes = [10, 15, 20, 25, 50, 100]

/**
 * [dingData 顶的记录]
 * @type {Array}
 * @author [sy 2017-07-21]
 */
const dingData = []

/**
 * [caiData 踩的记录]
 * @type {Array}
 * @author [sy 2017-07-21]
 */
const caiData = []

/**
 * [activeData 首页导航特效]
 * @type {String}
 * @author sy 2017-07-26
 */
const activeData = 'index'

/**
 * 智库人物类型
 * @type {Array}
 */
const zkleixing = [{
    id: '30',
    title: '创业导师'
}, {
    id: '31',
    title: '专家'
}]

/**
 * [keysearch 关键词搜索]
 * @type {String}
 * [author sy 2017-07-19]
 */
const keysearch = ''

/**
 * 专题标签
 * @type {Array}
 */
const ztbiaoqian = []

/**
 * pageSize：定义每页默认显示记录条数
 * @type {int}
 */
const pageSize = 15

/**
 * [source_type 资讯来源预配置]
 * @type {Array}
 */
const news_source_type = ['汽车财经网']

/**
 * 用户偏好设置
 * @type {Object}
 * layout 界面布局设置
 * slider 侧边栏设置
 * skin 界面皮肤设置
 * bgImg 登录页面背景图片
 */
const settings = {
    layout: {
        boxLayout: {
            status: false,
            bgimg: ''
        },
        animate: {
            status: true,
            type: 'effect'
        },
        fixed: {
            header: false,
            footer: false,
            slider: false
        }
    },
    slider: {
        userinfo: true,
        fastlink: true,
        menu: false
    },
    skin: 'static/css/themes/type-b/theme-well-red.min.css',
    bgImg: ''
}

/**
 * [userinfo description]
 * @type {Object}
 */
const userinfo = { userinfo: {}, rules: [] }

/**
 * [sliderNav_data 当前登录用户的左侧导航权限]
 * @type {Array}
 * @author leo
 */
const sliderNav_data = []

/**
 * [API_Err_Info 接口请求失败后报错信息]
 * @type {Object}
 * @author leo
 */
const API_Err_Info = {
    title: '啊哦，出错咯！',
    message: '接口请求失败，赶紧联系工程师抢修吧~',
    duration: 0,
    offset: 5
}

/**
 * [LinkA 关于我们 | 联系我们 | 新闻爆料 | 加入我们 坐标存储]
 * @type {Object}
 */
const LinkA = {}
    /*
     * activeList 活动列表
     * pageSize 设置每页显示记录条数
     * pageSizes 设置每页显示记录条数的下拉选项
     * */
const state = {
    settings: settings,
    pageSizes: pageSizes,
    pageSize: pageSize,
    API_Err_Info: API_Err_Info,
    userinfo: userinfo,
    sliderNavData: sliderNav_data,
    news_source_type: news_source_type,
    ztbiaoqian: ztbiaoqian,
    zkleixing: zkleixing,
    keysearch: keysearch,
    dingData: dingData,
    caiData: caiData,
    LinkA: LinkA,
    activeData: activeData
}


/* 从本地存储读取数据 */
for (var item in state) {
    LS.get(sysKeys + item) ? state[item] = JSON.parse(LS.get(sysKeys + item)) : false;
}


//从组件中提交请求方法，写在此类下，注意保存时，一定要保存为json
const mutations = {

    setPageSize(state, payload) {
        state.pageSize = payload
        LS.set(sysKeys + 'pageSize', JSON.stringify(state.pageSize));
    },
    //设置界面是否为盒子布局
    setBoxLayout(state, data) {
        state.settings.layout.boxLayout.status = data
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置盒子背景图片
    setBoxBgimg(state, data) {
        state.settings.layout.boxLayout.bgimg = data
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置是否开启页面动画
    setAnimate(state, data) {
        state.settings.layout.animate = data
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置固定位置
    setFixed(state, payload) {
        state.settings.layout.fixed = payload
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置显示左侧信息
    setSlider(state, payload) {
        state.settings.slider = payload
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置皮肤
    setTheme(state, payload) {
        state.settings.skin = payload
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //设置登录页面背景图片
    setBgImg(state, payload) {
        state.settings.bgImg = payload
        LS.set(sysKeys + 'settings', JSON.stringify(state.settings));
    },
    //存储用户信息
    setUserinfo(state, payload) {
        state.userinfo = payload
        LS.set(sysKeys + 'userinfo', JSON.stringify(state.userinfo));
    },
    //保存当前登录用户左侧的导航权限
    setSliderNav(state, payload) {
        state.sliderNavData = payload
        LS.set(sysKeys + 'sliderNavData', JSON.stringify(state.sliderNavData));
    },
    //增加资讯来源预配置
    setNewsSourceType(state, payload) {
        state.news_source_type.push(payload)
        LS.set(sysKeys + 'news_source_type', JSON.stringify(state.news_source_type));
    },
    //增加专题标签
    setZtbiaoqian(state, payload) {
        state.ztbiaoqian = payload
        LS.set(sysKeys + 'ztbiaoqian', JSON.stringify(state.ztbiaoqian))
    },
    //赋值全局搜索字段
    setKeysearch(state, payload) {
        state.keysearch = payload
        LS.set(sysKeys + 'keysearch', JSON.stringify(state.keysearch))
    },
    //增加顶的记录
    setDingData(state, payload) {
        state.dingData.push(payload)
        LS.set(sysKeys + 'dingData', JSON.stringify(state.dingData));
    },
    //去除顶的记录
    setDingdata(state, payload) {
        state.dingData.splice(dingData.indexOf(payload), 1)
        LS.set(sysKeys + 'dingData', JSON.stringify(state.dingData));
    },
    //增加踩的记录
    setCaiData(state, payload) {
        state.caiData.push(payload)
        LS.set(sysKeys + 'caiData', JSON.stringify(state.caiData));
    },
    //去除踩的记录
    setCaidata(state, payload) {
        state.caiData.splice(caiData.indexOf(payload), 1)
        LS.set(sysKeys + 'caiData', JSON.stringify(state.caiData));
    },
    //关于我们 | 联系我们 | 新闻爆料 | 加入我们 坐标存储
    setLinkA(state, payload) {
        state.LinkA = payload
        LS.set(sysKeys + 'LinkA', JSON.stringify(state.LinkA));
    },
    //设置首页导航特效
    setActive(state, payload) {
        state.activeData = payload
        LS.set(sysKeys + 'activeData', JSON.stringify(state.activeData))
    }

}


//数据过滤
const getters = {
    Request_Head: state => {
        return {
            "User-Token": state.userinfo.userinfo.token
        }
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters
})
