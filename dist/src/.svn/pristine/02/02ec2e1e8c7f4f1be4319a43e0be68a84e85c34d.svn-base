<template>
    <el-row>
        <div class="index-title margin-bottom-40 padding-top-10 index-title-zhiku">
            <p class=""></p>
            <span class="font-150">智库</span>
            <router-link :to="{name: 'daoshi'}" style="border:0" class="pull-right">
                <i class="el-icon-d-arrow-right"></i>
            </router-link>
        </div>
        <el-row :gutter="18" class="margin-bottom-30 padding-bottom-30" v-if="linkData.length>0">
            <el-col :xs="12" :sm="6" :md="6" class="zhiku-box" v-for="item in linkData" :key="item.id">
                <div class="zhiku-menu" style="cursor: pointer">
                    <img :src="item.img?item.img+'!143x130':'./static/img/default.jpg'" @click="chakan(item.id)" alt="">
                    <a class="font-130" @click="chakan(item.id)" alt=""><span>{{item.name}}</span></a>
                </div>
            </el-col>
        </el-row>
        <!-- 详情弹出框 -->
        <Inner_tank :dialogStatus="dialog" :zxid="zxid" @CB-dialogStatus="CB_dialogStatus"></Inner_tank>
    </el-row>
</template>
<script>
//挂载弹框
import Inner_tank from '@/page/zhiku/tank'
export default {
    created: function() {
        this.getData()
    },
    data() {
        return {
            linkData: [],
            dialog: false,
            zxid:''
        }
    },
    methods: {
        //弹框
        chakan(id) {
            this.zxid = id
            this.dialog = true
        },
        getData() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/home_api/zhiku',
                data: {
                    listRows: 10,
                    size: 1
                }
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                } else {
                    this.linkData = response.data.data
                }
            }, (error) => {
                this.$emit('API-ERR');
            })
        },
        //接收子组件传送过来的数据
        CB_dialogStatus(val) {
            this.zxid = ''
            this.dialog = false
        },
    },
    components: {
        Inner_tank
    }
}
</script>
