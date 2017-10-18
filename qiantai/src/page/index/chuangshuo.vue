<template>
    <div v-if="fchuangshuo.id!=-1">
        <!-- 创·说 -->
        <div class="index-title margin-bottom-40 padding-top-10">
            <span class="font-150">创·说</span>
            <router-link :to="{name:'chuangshuo'}" style="border:0" class="pull-right">
                <i class="el-icon-d-arrow-right"></i>
            </router-link>
        </div>
        <el-row class="margin-bottom-30 padding-bottom-30 border-bottom" v-if="fchuangshuo.id!=-1">
            <el-col class="margin-bottom-30">
                <div class="zhuanti-img index-img-big zhuanti-img-first">
                    <a :href="url+fchuangshuo.id" target="_Blank">
                        <img :src="fchuangshuo.img?fchuangshuo.img+'!369x197':'./static/img/default.jpg'" alt="">
                    </a>
                </div>
            </el-col>
            <el-col>
                <div class="zhuanti-txt">
                    <h4 class="font-140 no-margin">
                        <a :href="url+fchuangshuo.id" target="_Blank">
                            {{fchuangshuo.title}}
                        </a>
                    </h4>
                </div>
            </el-col>
        </el-row>
        <div v-for="item in chuangshuoData" :key="item.id" v-if="chuangshuoData.length>0">
            <el-row :gutter="7" class="margin-bottom-30 padding-bottom-30 border-bottom">
                <el-col :xs="8" :sm="8" :md="8" :lg="8">
                    <div class="zhuanti-img index-img-big">
                       <a :href="url+item.id" target="_Blank">
                            <img :src="item.img?item.img+'!120x65':'./static/img/default.jpg'" alt="">
                        </a>
                    </div>
                </el-col>
                <el-col :xs="16" :sm="16" :md="16" :lg="16">
                    <div class="zhuanti-txt">
                        <h4 class="font-120 no-margin">
                            <a :href="url+item.id" target="_Blank">
                                {{item.title}}
                            </a>
                        </h4>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    created: function() {
        this.getData()
    },
    data() {
        return {
            fchuangshuo: {
                id: -1
            },
            url : process.env.NODE_ENV == "production" ? this.WEB_ROOT+"/details-" : this.API_ROOT+'details-',
            chuangshuoData: []
        }
    },
    methods: {
        getData() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/news',
                data: {
                    listRows: 6,
                    tid: 3,
                    size: 1
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    if (response.data.data.length > 0) {
                        this.fchuangshuo = response.data.data[0]
                        this.chuangshuoData = response.data.data
                        this.chuangshuoData.splice(0, 1)
                    }
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        }
    }
}
</script>
