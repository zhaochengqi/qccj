<template>
    <el-row>
        <div class="index-title margin-bottom-40 padding-top-10">
            <p class=""></p>
            <span class="font-150">杂志阅读</span>
            <router-link :to="{name:'zazhi'}" class="pull-right" style="border:0">
                <i class="el-icon-d-arrow-right"></i>
            </router-link>
        </div>
        <div class="index-yuedu margin-left-50 margin-right-50 margin-bottom-50 ">
            <el-row :gutter="28 ">
                <el-col :xs="12 " :sm="6 " :md="6 " :lg="6 " v-for="item in zazhiData " :key="item.id">
                    <div class="yuedu-menu ">
                        <div class="yuedu-img ">
                            <a :href="url+item.id" target="_Blank">
                                <img :src="item.img?item.img +'!228x284':'./static/img/default.jpg'" alt="">
                            </a>
                        </div>
                        <a :href="item.pdf_file" target="_Blank" class="font-110">立即下载</a>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-row>
</template>
<script>
export default {
    created: function() {
        this.getZazhi()
    },
    data() {
        return {
            zazhiData: [],
            url :process.env.NODE_ENV == "production" ? this.WEB_ROOT+"/zazhi-read-" : this.API_ROOT+'zazhi-read-'
        }
    },
    methods: {
        //获取杂志数据
        getZazhi() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/zazhi',
                data: {
                    listRows: 4,
                    _order: 'update_time'
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.zazhiData = response.data.data
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        }
    }
}
</script>
