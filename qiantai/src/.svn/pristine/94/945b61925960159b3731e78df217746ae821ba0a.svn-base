<template>
    <div class="zhuanlan" v-loading="loading" element-loading-text="拼命加载中">
        <div class="container margin-top-50 padding-top-30">
            <el-row :gutter="60" class="margin-bottom-40" v-for="item in tableData" :key="item.id">
                <el-col :xs="24" :sm="6" :md="6" :lg="6">
                    <div class="zl-zuozhe">
                        <div class="zuozhe-img">
                            <a :href="url+item.author.id" target="_Blank">
                                <img :src="item.author.img?item.author.img + '!159x145':'./static/img/default.jpg'" alt="">
                            </a>
                        </div>
                        <div class="zuozhe-txt">
                            <p class="font-140 margin-top-10">
                                <a :href="url+item.author.id" target="_Blank">
                                    {{item.author.name}}
                                </a>
                            </p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="18" :md="18" :lg="18">
                    <el-row :gutter="16" class="">
                        <el-col :xs="24" :sm="13" :md="13" :lg="13">
                            <div class="zhuanlan-list-img index-img-big">
                                <a :href="url+item.id" target="_Blank">
                                    <img :src="item.img?item.img + '!527x315':'./static/img/default.jpg'" alt="">
                                </a>
                            </div>
                            <div class="zhuanlan-list-date font-110 margin-top-10 margin-bottom-10 aui-ellipsis-1">
                                {{item.daytime}}　 来自：
                                <span class="padding-right-30">
                                    {{item.source || filterHtml}}
                                </span>
                                <!-- <i class="fa fa-thumbs-o-up"></i> 0 -->
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="11" :md="11" :lg="11">
                            <div class="zhuanlan-list-txt">
                                <div class="zl-list-title font-150 margin-bottom-50 aui-ellipsis-2">
                                    <a :href="url+item.id" target="_Blank">
                                        {{item.title}}
                                    </a>
                                </div>
                                <p class="font-110 aui-ellipsis-6">
                                    {{item.daodu || filtersource}}
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="fenye padding-top-40 margin-bottom-50">
                <div class="block" v-if="total>0">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    activated: function() {
        this.getData();
    },
    data() {
        return {
            total: 0,
            currentPage: 1,
            loading: false,
            tableData: [],
            //设置一页多少条
            pageSize: 10,
            url : process.env.NODE_ENV == "production" ? this.WEB_ROOT+"/details-" : this.API_ROOT+'details-'
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
            // this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/news',
                data: {
                    page: this.currentPage,
                    listRows: this.pageSize,
                    tid: 4
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.tableData = response.data.data
                    this.total = response.data.count
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })
        }
    },
    filters: {
        filterHtml(str) {
            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
            str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
            str = str.replace(/&nbsp;/g, '');
            return str;
        },
        filtersource(str) {
            return str.join(',');
        }
    },
}
</script>
<style scoped>
.zl-zuozhe {
    width: 165px;
    margin: 0 auto;
    text-align: center;
    color: #501515;
}

.zuozhe-img {
    border: 3px solid #eee;
    border-radius: 3px;
    height: 145px;
    overflow: hidden;
}

.zuozhe-img img {
    width: 100%;
}

.zuozhe-txt button {
    background-color: #e8645a;
    padding: 10px 35px;
}

.zhuanlan-list-img {
    height: 285px;
    overflow: hidden;
}

.zhuanlan-list-img img {
    width: 100%;
}

.zhuanlan-list-txt {
    color: #998b8b;
}

.zhuanlan-list-txt p {
    color: #998b8b;
}

.zl-list-title {
    line-height: 36px;
    height: 72px;
}

.zl-list-title a {
    color: #501515;
}

.zl-list-title a:hover {
    color: #e5655d;
}

.zhuanlan-list-date {
    color: #998b8b;
}

.zhuanlan-list-date span {
    color: #501515;
}
</style>