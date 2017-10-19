<template>
    <div class="index" v-loading="loading" element-loading-text="拼命加载中">
        <div class="container margin-top-50">
            <el-carousel :interval="5000" v-if="advert.length>0" indicator-position="none" :arrow="advert.length==1?'never':'hover'" class="margin-bottom-30">
                <el-carousel-item v-for="item in advert" :key="item.id">
                    <a :href="item.link_url" target="_Blank">
                        <img :src="item.img+'!1200x150'" alt="">
                    </a>
                </el-carousel-item>
            </el-carousel>
            <el-row>
                <el-col :xs="24" :sm="16" :md="16" :lg="16">
                    <div class="index-toutiao" v-if="topline.length>0">
                        <a class="font-150">头条</a>
                    </div>
                    <h2 class="index-h2 font-180 margin-top-40 margin-bottom-30 aui-ellipsis-1" v-if="topline.length>0">
                       <a :href="url+topline[0].id" target="_Blank">
                            {{topline[0].title}}
                        </a>
                    </h2>
                    <el-row v-if="topline.length>0" :gutter="20" class="margin-bottom-50">
                        <el-col :xs="24" :sm="14" :md="14" :lg="14">
                            <div class="index-news-banner index-img-big">
                                <a :href="url+topline[0].id" target="_Blank">
                                    <img :src="topline[0].img+'!501x297'" onerror="javascript:this.src='../assets/img/default.jpg';" alt="">
                                </a>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <div class="index-news-txt font-120">
                                <p class="aui-ellipsis-11">
                                    {{topline[0].daodu}}
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                    <Index_zixun :title="title" :listRows="listRows" :zxid="zxid" :news="news">此处显示资讯内容</Index_zixun>
                    <Index_zhiku>此处显示智库内容</Index_zhiku>
                    <Index_zixun :title="cgtitle" :listRows="listRow" :zxid="cgid" :news="chuangu">此处显示创谷内容</Index_zixun>
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="7" :offset="1">
                    <Index_zkzhuanlan>此处显示智库专栏</Index_zkzhuanlan>
                    <Index_zhuanti>此处显示专题内容</Index_zhuanti>
                    <Index_chuangshuo>此处显示创说</Index_chuangshuo>
                </el-col>
            </el-row>
            <!-- <Index_shuju>此处显示数据内容</Index_shuju> -->
            <Index_video>此处显示视频内容</Index_video>
            <Index_zazhi>此处显示杂志内容</Index_zazhi>
            <Index_links>此处显示友情链接内容</Index_links>
        </div>
    </div>
</template>
<script>
//挂载视频内容
import Index_video from './index/video'
//挂载杂志内容
import Index_zazhi from './index/zazhi'
//挂载友情链接
import Index_links from './index/links'
//挂载智库
import Index_zhiku from './index/zhiku'
//挂载咨询
import Index_zixun from './index/zixun'
//挂载数据
// import Index_shuju from './index/shuju'
//挂载右侧创谷、专题、创说
import Index_zhuanti from './index/zhuanti'
//挂载智库专栏
import Index_zkzhuanlan from './index/zkzhuanlan'
//挂载创说
import Index_chuangshuo from './index/chuangshuo'
export default {
    created: function() {
        this.getNews()
        this.getGuanggao()
    },
    data() {
        return {
            topline: {
                id: -1
            },
            advert: [],
            loading: false,
            zxid: '',
            listRows: 4,
            listRow: 3,
            title: '最新资讯',
            cgtitle: '创谷',
            zxid: 1,
            cgid: 2,
            news: 'news',
            chuangu: 'chuanggu',
            url : process.env.NODE_ENV == "production" ? this.WEB_ROOT+"/details-" : this.API_ROOT+'details-'
        }
    },
    methods: {
        //获取广告
        getGuanggao() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/guanggao',
                data: {
                    _order: 'sort',
                    _sort: 'desc',
                    type: '首页Banner'
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.advert = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        },
        //新闻资讯
        getNews() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/news',
                data: {
                    is_toutiao: 2
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.topline = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        }
    },
    computed: {},
    components: {
        Index_video,
        Index_zazhi,
        Index_links,
        Index_zhiku,
        Index_zixun,
        // Index_shuju,
        Index_zhuanti,
        Index_zkzhuanlan,
        Index_chuangshuo
    }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__container {
    height: 150px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.el-carousel__arrow {
    width: 20px;
    height: 24px;
    background-color: #e2534b;
    border-radius: 0;
}

.el-carousel__arrow:hover {
    background-color: #ce443d;
}

.el-carousel__arrow--left {
    left: 0;
}

.el-carousel__arrow--right {
    right: 0;
}
</style>
