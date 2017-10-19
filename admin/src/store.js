import Vue from 'vue'
import Vuex from 'vuex'

//导入LocalStorage的封装器，详细使用方式参考 Git上storejs
import LS from 'storejs'

Vue.use(Vuex)

//定义数据仓库前缀，避免保存到LocalStorage中的数据节点冲突
var sysKeys = 'DB_auto_biz_'


/**
 * 定义每页显示记录条数的下拉菜单选项
 * @type {Array}
 */
const pageSizes = [10, 15, 20, 25, 50, 100]

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
 * 专题标签
 * @type {Array}
 */
const ztbiaoqian = ["汽车财经网"]

const ggbiaoqian = ['首页Banner', '资讯首页', '资讯内页', '智库首页', '视频首页', '视频内页', '专题Banner']
    /**
     * [source_type 文章信息管理]
     * @type {Array}
     */
const wenzhangbiaoqian = []


/**
 * pageSize：定义每页默认显示记录条数
 * @type {int}
 */
const pageSize = 15

/**
 * [source_type 资讯来源预配置]
 * @type {Array}
 */
const news_source_type = ["汽车财经", "网易汽车", "搜狐汽车", "新浪汽车", "汽车之家", "盖世汽车", "第一财经", "新京报", "腾讯汽车", "一财网", "中国汽车报网", "新华网", "经济参考报", "南方日报", "深圳晚报", "华夏时报", "经济观察网", "每日经济新闻", "网通社", "第一电动网", "科技日报", "环球汽车", "环球汽车", "中国经济网", "中国汽车工业协会", "证券日报", "中国新闻网", "中国证券网", "北京晚报", "爱卡汽车", "北京商报", "南方网", "现代快报", "中国汽车工业信息网", "21网", "北京晨报", "北京商报", "法制日报", "北京日报", "中国汽车产业数字化图书馆", "第一电动网", "京华时报", "21世纪经济报道", "中国经营报", "广州日报", "羊城晚报", "凤凰汽车", "重庆晨报", "能源新闻网", "北京青年报", "央广网", "扬子晚报", "中国青年报", "新浪科技", "驱动之家", "上海证券网", "易车网", "中国商务新闻网", "21世纪", "汽车产经", "南方都市报", "长江日报", "中新网", "中国财经报", "MSN汽车", "青年参考报", "全景网", "南方都市报", "中国科学报", "汽车周报", "华夏时报网", "东方网", "人民网", "中国环境报", "解放日报", "太平洋汽车网", "中国科学院", "环球汽车网", "cnBeta中文网", "解放网", "亿欧网", "车讯网", "腾讯数码", "天津北方网", "证券时报", "环球网", "天津日报", "彭博社", "澎拜网", "车云网", "3sNews", "轮胎世界网", "中国证券报", "美通社", "日经技术在线", "CNBC", "东方财富网", "轮胎世界网", "腾讯证券", "上海市人民政府官网", "美国汽车新闻", "Automotive NewsChina", "雷锋网", "财新网", "金华网新闻", "北极星储能网", "凤凰科技", "凤凰财经", "中国橡胶网", "朱伟华后市场", "新浪网", "网易科技", "深圳商报", "腾讯科技", "中华人民共和国国家邮政局", "亿欧网", "TechWeb", "科技部", "陕西日报", "电子发烧友", "智东西", "Recode中文站", "欧洲汽车新闻", "阿拉宁波网", "驱动之家", "商车网", "中国日报", "齐鲁网", "国家质量监督检验检疫总局", "新浪财经", "新能源汽车网", "新华社", "中国科技网", "网易数码", "阳光汽车网", "三秦都市报", "财联社", "快科技", "TechNews", "华尔街见闻", "底特律新闻", "36kr", "路透社", "中国轮胎商务网", "慧聪汽车电子网", "亿邦动力网", "Rosnauka", "The Verge", "中关村在线", "cleantechnica", "中国证券报·中证网", "节能与新能源汽车", "电车汇", "车300", "人民邮电报", "中国汽车报", "solidot", "TechCrunch", "日经中文网", "澎湃新闻网", "中国工业电器网", "经济日报", "电动汽车观察员", "动力电池网", "威锋网", "中国网", "日经BP社", "吉广国际", "中国石油网", "好奇心日报", "和讯网", "网易", "EV视界", "汽车市场网", "高工锂电", "DoNews", "卡车之家", "人民日报", "车联网周刊", "虎嗅网", "荆楚网", "U-CAR", "麦姆斯咨询", "中国质量报", "泰伯网", "汽车行业观察"]

/**
 * [guanjianchi 新闻关键词]
 * @type {Array}
 */
const news_guanjianchi = ['汽车财经网']

/**
 * [guanjianchi 广告投放位]
 * @type {Array}
 */
const guanggao_weizhi = ['']

/**
 * [角色组]
 * @type {Array}
 */
const rules_juesezu = []

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
 * [lcok 锁定屏幕]
 * @type {Object}
 * @author leo
 */
const lock = {
    status: false,
    fullPath: ''
}

/**
 * [InfoImgArr 默认10个个人头像]
 * @type {Array}
 */
const InfoImgArr = [];
InfoImgArr[0] = 'http://res.autoia.com.cn/book/20170724/djnm8yam6cc8g.png';
InfoImgArr[1] = 'http://res.autoia.com.cn/book/20170724/2h9frcfscagyp.png';
InfoImgArr[2] = 'http://res.autoia.com.cn/book/20170724/ltc3yl0cbw1j5.png';
InfoImgArr[3] = 'http://res.autoia.com.cn/book/20170724/g3xupsjx2esbt.png';
InfoImgArr[4] = 'http://res.autoia.com.cn/book/20170724/x9xcs427q8zsi.png';
InfoImgArr[5] = 'http://res.autoia.com.cn/book/20170724/4dgwk23c7k3qa.png';
InfoImgArr[6] = 'http://res.autoia.com.cn/book/20170724/3zcinw41sghan.png';
InfoImgArr[7] = 'http://res.autoia.com.cn/book/20170724/fq8fysdye055f.png';
InfoImgArr[8] = 'http://res.autoia.com.cn/book/20170724/79f39741lx3br.png';
InfoImgArr[9] = 'http://res.autoia.com.cn/book/20170724/udzg36ak95sls.png';

/**
 * [last_time 记录最后操作时间戳]
 * @type {String}
 */
const last_time = ''


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
 * [dockingArr 接口请求失败后报错信息]
 * @type {arr}
 */
const dockingArr = ['找投资', '找项目', '找并购机会', '解决技术难题']

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
    news_guanjianchi: news_guanjianchi,
    ztbiaoqian: ztbiaoqian,
    ggbiaoqian: ggbiaoqian,
    wenzhangbiaoqian: wenzhangbiaoqian,
    zkleixing: zkleixing,
    rules_juesezu: rules_juesezu,
    lock: lock,
    InfoImgArr: InfoImgArr,
    last_time: last_time,
    dockingArr: dockingArr

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
    // //增加资讯来源预配置
    // setNewsSourceType(state, payload) {
    //     state.news_source_type.push(payload)
    //     LS.set(sysKeys + 'news_source_type', JSON.stringify(state.news_source_type));
    // },
    //增加专题标签
    setZtbiaoqian(state, payload) {
        state.ztbiaoqian.push(payload)
        LS.set(sysKeys + 'ztbiaoqian', JSON.stringify(state.ztbiaoqian))
    },
    //存储所有管理员
    setRulesJuesezu(state, payload) {
        state.rules_juesezu = payload
        LS.set(sysKeys + 'rules_juesezu', JSON.stringify(state.rules_juesezu))
    },
    //设置锁屏
    setLock(state, payload) {
        state.lock = payload
        LS.set(sysKeys + 'lock', JSON.stringify(state.lock))
    },
    //记录最后操作时间
    setLast_time(state, payload) {
        state.last_time = payload
        LS.set(sysKeys + 'last_time', JSON.stringify(state.last_time))
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
