<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :span="24" class="text-right">
                    <goBack></goBack>
                </el-col>
            </el-row>
        </div>
        <el-row :style="{ 'min-height': _PageHeight+'px'}">
            <el-form ref="form" :model="form" label-width="80px">
                <el-col :span="12">
                    <el-form-item label="标题名称">
                        <el-input v-model="form.title" placeholder="填写通知公告的标题名称"></el-input>
                    </el-form-item>
                    <el-form-item label="是否置顶">
                        <el-switch on-text="是" off-text="否" on-value="2" off-value="1" v-model="form.is_top"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="公告内容">
                        <vueEditor :editContent="form.content" @Callback-Content="CB_Content"></vueEditor>
                    </el-form-item>
                    <el-form-item label="发布日期">
                        <el-date-picker v-model="form.fabu_time" type="date" placeholder="选择日期时间" style="width:245px" @change="timeChange" format='yyyy-MM-dd'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认发布</el-button>
                        <el-button @click="quxiaoSubmit">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </el-card>
</template>
<script>
import Vue from 'vue'

//导入编辑器组件（共用）
import vueEditor from '@/components/editor'
import goBack from '@/components/goBack'

export default {
    activated() {
            if (this.$route.params.id) {
                this.getData()
            } else {
                this.form.fabu_time = new Date()
            }
        },
        deactivated() {
            this.form = {
                title: '',
                is_top: '1',
                fabu_time: '',
                content: ''
            }
        },
        data() {
            return {
                form: {
                    title: '',
                    is_top: '1',
                    fabu_time: '',
                    content: ''
                },
                time: ''
            }
        },
        methods: {
            onSubmit() {
                this.setData()
            },
            //取消发布
            quxiaoSubmit() {
                this.$router.go(-1)
            },
            CB_Content(content, token) {
                this.form.content = content
            },
            timeChange(value) {
                this.time = value
            },
            //处理数据
            setData() {
                var url
                if (this.$route.params.id) {
                    url = this.API_ROOT + '/api/notice/update'
                } else {
                    url = this.API_ROOT + '/api/notice/insert'
                }
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
                        this.$router.go(-1)
                        this.form = {
                            title: '',
                            is_top: '1',
                            fabu_time: '',
                            content: ''
                        }
                    }
                }, (error) => {
                    this.$emit('API-ERR');
                })
            },
            //编辑页面进来
            getData() {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/notice/read',
                    data: {
                        id: this.$route.params.id
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
                    this.$emit('API-ERR');
                    this.loading = false
                })
            }


        },
        //注意别忘记挂载组件
        components: {
            vueEditor,
            goBack
        }
}
</script>
