<template>
    <div class="cy-ds">
        <div class="container margin-top-50 padding-top-30">
            <div v-loading="loading" element-loading-text="拼命加载中">
                <div class="inner-banner margin-bottom-50" v-if="guangao.length>1">
                    <el-carousel :interval="5000" indicator-position="none" :arrow="guangao.length==1?'never':'hover'" height="80px">
                        <el-carousel-item v-for="item in guangao" :key="item">
                            <a :href="item.link_url" target="_Blank">
                                <img :src="item.img?item.img+'!1200x80':'./static/img/default.jpg'" alt="">
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="zhuanti">
                    <el-row :gutter="30" class="">
                        <el-col :xs="24" :sm="12" :md="12" :lg="12" v-for="item in linkData" :key="item.id">
                            <dl class="zhuanti-dl margin-bottom-30">
                                <dt>
                                    <a :href="item.link" target="_Blank">
                                        <div class="zhuanti-dl-ig">
                                            <img :src="item.img ? item.img+ '!542x320':'./static/img/default.jpg'" alt="">
                                        </div>
                                    </a>
                                    <span class="font-120">
                                          {{item.label}}
                                    </span>
                                </dt>
                                <dd class="padding-left-50 padding-right-50 padding-bottom-50">
                                    <a :href="item.link" target="_Blank">
                                        <h3 class="font-180 aui-ellipsis-2 margin-bottom-10 zhuanti-title">{{item.title}}</h3>
                                    </a>
                                    <p class="font-120 aui-ellipsis-5 no-margin">{{item.daodu}}</p>
                                </dd>
                            </dl>
                        </el-col>
                    </el-row>
                </div>
                <div class="fenye padding-top-40 margin-bottom-50">
                    <div class="block" v-if="total>0">
                        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <Index_links></Index_links>
        </div>
    </div>
</template>
<script>
import Index_links from '@/page/index/links'
export default {
    activated: function() {
        this.getData();
        this.getGuanggao();
    },
    data() {
        return {
            total: 0,
            currentPage: 1,
            loading: false,
            linkData: [],
            //设置一页多少条
            pageSize: 10,
            //广告位
            guangao: []
        };
    },
    methods: {
        //页码发生变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData();
        },
        //获取数据
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/zhuanti',
                data: {
                    page: this.currentPage,
                    listRows: this.pageSize,
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.linkData = response.data.data
                    this.total = response.data.count
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        },
        //获取广告
        getGuanggao() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/guanggao',
                data: {
                    _order: 'sort',
                    _sort: 'desc',
                    type: '专题Banner'
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    if (response.data.data.length > 0)
                        this.guangao = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        }
    },
    components: {
        Index_links
    }
}
</script>
<style scoped>
/*banner*/

.inner-banner {
    height: 80px;
    overflow: hidden;
}

.inner-banner img {
    width: 100%;
}


/*banner*/

.zhuanti {
    padding: 10px 35px 0;
}

.zhuanti-dl {
    border: 1px solid #e3e3e3;
    margin: 4px;
    padding-bottom: 4px;
}

.zhuanti-dl:hover {
    border: 5px solid #eee;
    margin: 0;
    padding-bottom: 0;
    box-shadow: 0 0 13px rgba(100, 100, 100, .4);
}

.zhuanti-dl dt {
    position: relative;
}

.zhuanti-dl dt .zhuanti-dl-ig {
    height: 320px;
    overflow: hidden;
}

.zhuanti-dl dt span {
    position: absolute;
    z-index: 2;
    top: 16px;
    left: -12px;
    display: inline-block;
    width: 108px;
    text-align: center;
    height: 31px;
    line-height: 31px;
    background-color: #e2534b;
    color: #fff;
}

.zhuanti-dl dt span:before {
    content: '';
    border-right: 12px solid #c8463f;
    border-top: 0 solid transparent;
    border-bottom: 12px solid transparent;
    position: absolute;
    z-index: 1;
    bottom: -12px;
    left: 0;
}

.zhuanti-dl dt img {
    width: 100%;
}

.zhuanti-dl dd {
    color: #998b8b;
}

.zhuanti-dl dd h3 {
    line-height: 36px;
    color: #501515;
    height: 72px;
}

.zhuanti-dl dd p {
    height: 120px;
}

.zhuanti-title:hover {
    color: #E5655D;
}
</style>
