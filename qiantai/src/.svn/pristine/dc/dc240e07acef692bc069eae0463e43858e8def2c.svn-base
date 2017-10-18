<template>
    <div class="cy-ds">
        <div class="container margin-top-50 padding-top-30">
            <el-row :gutter="60" class="margin-bottom-50">
                <el-col :xs="24" :sm="17" :md="17" :lg="17" v-loading="loading" element-loading-text="拼命加载中">
                    <div class="news-details" v-if="formData">
                        <h1 class="margin-bottom-30">{{formData.title}}</h1>
                        <div class="news-date margin-bottom-30">{{formData.author_name}} &nbsp;&nbsp;发表于&nbsp; {{formData.add_time}} &nbsp;&nbsp;来源：&nbsp;{{formData.sourceData}}</div>
                        <div class="news-main">
                            <p v-html="formData.content"></p>
                        </div>
                    </div>
                    <div v-else>
                        <h3>未查询到相关信息</h3>
                    </div>
                    <div class="fenxiang padding-top-10">
                        <el-row class="">
                            <el-col :xs="10" :sm="16" :md="16" :lg="16">
                                <div class="bdsharebuttonbox">
                                    <a href="http://service.weibo.com/share/share.php?appkey=&title=&url=&searchPic=false&style=simple" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"><img src="../../assets/img/weibo.png" alt=""></a>
                                    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"><img src="../../assets/img/weixin.png" alt=""></a>
                                </div>
                            </el-col>
                            <Inner_zan :id="formData.id" :cai_count="formData.cai_count" :ding_count="formData.ding_count" @CB-dincai="CB_dincai"></Inner_zan>
                            <!--                             <el-col :xs="14" :sm="8" :md="8" :lg="8">
                                <div class="zixun-date">
                                    <i class="fa fa-thumbs-o-up" style="cursor:pointer" @click="ding(formData.id)"></i> 顶 0　<i class="fa fa-thumbs-o-down" style="cursor:pointer" @click="cai(formData.id)"></i> 踩 0
                                    <i class="el-icon-star-off"></i> 收藏 0
                                </div>
                            </el-col> -->
                        </el-row>
                    </div>
                    <div class="inner-title padding-top-30 margin-bottom-40 margin-top-40">
                        <p class="no-margin"></p>
                        <span class="font-150">相关文章</span>
                    </div>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="item in wzData" :key="item.id">
                            <div class="tjyd-img index-img-big margin-bottom-10 font-120" @click="tiaoImage(item.id)">
                                <router-link :to="{name: 'details',params:{id:item.id}}" class="font-120">
                                    <img :src="item.img?item.img + '!273x163':'./static/img/default.jpg'" alt="">
                                </router-link>
                            </div>
                            <div class="tjyd-xt font-120" @click="tiaoImage(item.id)">
                                <router-link :to="{name: 'details',params:{id:item.id}}" class="font-120">
                                    {{item.title}}
                                </router-link>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="7">
                    <div class="index-right">
                        <Inner_zixun @CB-zuixingzixun="CB_zuixingzixun">此处显示最新资讯</Inner_zixun>
                        <Inner_zhuanti></Inner_zhuanti>
                        <!-- 广告 -->
                        <guanggao weizhi='资讯内页' listRows='1'></guanggao>
                    </div>
                </el-col>
            </el-row>
            <Inner_links>此处显示友情链接</Inner_links>
        </div>
    </div>
</template>
<script>
//挂载最新资讯
import Inner_zixun from '@/page/news/zixun'
//挂载专题
import Inner_zhuanti from '@/page/index/zhuanti'
//挂载友情链接
import Inner_links from '@/page/index/links'
//挂载顶一下猜一下
import Inner_zan from '@/page/zhiku/zan'
//广告位
import guanggao from '@/page/news/guanggao'
export default {
    activated: function() {
        this.getData(this.$route.params.id);
        // console.log(this.$route.params.id);
    },
    data() {
        return {
            dialog: false,
            formData: {},
            loading: false,
            nameData: {},
            sourceData: {},
            wzData: [],
            type: ''
        }
    },
    methods: {
        //接收子组件传送过来的数据
        CB_dincai(val) {
            this.getData(val);
        },
        //最新资讯
        CB_zuixingzixun(val) {
            this.$router.push({
                name: 'geren_details',
                params: {
                    id: val
                }
            })
        },
        //相关文章
        tiaoImage(val) {
            this.getData(val)
            this.$router.push({
                name: 'details',
                params: {
                    id: val
                }
            })
        },
        getData(id) {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/news/read',
                data: {
                    id: id,
                    tid: 4
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.formData = response.data.data
                        // document.title = response.data.data.zhikutext.title
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
        Inner_zixun,
        Inner_zhuanti,
        Inner_links,
        Inner_zan,
        guanggao
    }
}
</script>
<style>
.news-details {
    color: #501515;
}

.news-details h1 {
    font-size: 24px;
    color: #501515;
    margin-top: 0;
}

.news-date {
    font-size: 14px;
}

.news-jj {
    font-size: 18px;
    font-weight: 600;
}

.news-main {
    font-size: 18px;
}

.news-main h4 {
    font-size: 18px;
    color: #501515;
}

.fenxiang {
    width: 590px;
    border-top: 1px dashed #dcdcdc;
}

.fx-menu a {
    display: inline-block;
}

.fx-menu img {
    float: left;
}

.tjyd-img {
    cursor: pointer;
}

.tjyd-xt {
    cursor: pointer;
}
</style>
