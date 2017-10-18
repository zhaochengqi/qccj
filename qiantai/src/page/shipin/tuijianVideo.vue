<template>
    <div class="margin-bottom-40" v-loading="loading" element-loading-text="拼命加载中">
        <div class="inner-title padding-top-30 margin-bottom-20">
            <p class="no-margin"></p>
            <span class="font-150">推荐视频</span>
        </div>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="item in tuijianData" :key="item.id" class="margin-bottom-20">
                <div class="tjyd-img index-img-big margin-bottom-10" @click="tiaoImage(item.id)" style="cursor:pointer;">
                    <!-- <router-link :to="{name:'bofang',params:{id:item.id}}"> -->
                    <img :src="item.img?item.img+'!273x163':'./static/img/default.jpg'" alt="">
                    <a href="#" target="_Blank"></a>
                    <!-- </router-link> -->
                </div>
                <div class="tjyd-xt" @click="tiaoImage(item.id)" style="cursor:pointer;">
                    <!-- <router-link :to="{name:'bofang',params:{id:item.id}}" class="font-120"> -->
                    <a class="font-120" target="_Blank">
                        {{item.title}}
                        </a>
                    <!-- </router-link> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    created: function() {
        this.getData(this.$route.params.id);
    },
    data() {
        return {
            tuijianData: [],
            data: {},
            loading: false
        }
    },
    methods: {
        tiaoImage(val) {
            this.getData(val)
            //因为路由没有变所以加个
            this.$router.push({
                name: 'bofang',
                params: {
                    id: val
                }
            })
        },
        getData(id) {
            if (id != this.$route.params.id) {
                this.$emit('CB-bofangVideo', id)
            }
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/videos/tuijian_videos',
                data: {
                    id: id
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.tuijianData = response.data.data;
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR')
            })
        }
    },

}

</script>
<style>
.tjyd-img {
    cursor: pointer;
}

.tjyd-xt {
    cursor: pointer;
}

</style>
