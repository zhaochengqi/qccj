<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div v-bind:style="{ 'min-height': _PageHeight+80+'px'}" class="margin-top-50">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <vueEditor :editContent="form.content" style="height: 400px;" @Callback-Content="CB_Content">
                    </vueEditor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="authCheck(122) || authCheck(123)|| authCheck(124)|| authCheck(125)" :loading="loadingBiao" size="large" @click="onSubmit">确认保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script>
//导入vuex辅助函数
import vueEditor from '@/components/editor'
import {
    mapState
} from 'vuex'

export default {
    activated: function() {
        this.getData()
    },
    data() {
        return {
            title: '',
            loading: false,
            form: {
                content: '',
                id: this.$route.meta.id
            },
            loadingBiao: false
        }
    },
    watch: {
        '$route.meta.id': function(newValue, oldValue) {
            if (newValue == '' || !newValue || newValue == '') return
            this.getData()
        }
    },
    methods: {
        //详细内容
        CB_Content(content, token) {
            this.form.content = content
        },
        //提交数据
        onSubmit() {
            var url
            this.loadingBiao = true
            url = this.API_ROOT + '/api/about/update';
            this.axios({
                method: 'post',
                url: url,
                data: this.form,
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$message.success('数据保存成功');
                }
                this.loadingBiao = false
            }, (error) => {
                this.loadingBiao = false
                this.$emit('API-ERR');
            })
        },
        getData() {
            //请求数据
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/about/read',
                data: {
                    id: this.$route.meta.id
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.form = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR');
            })

        },
    },
    //注意别忘记挂载组件
    components: {
        vueEditor,
    }
}
</script>
