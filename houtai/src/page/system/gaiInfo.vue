<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :span="24" class="text-right">
                    <goBack></goBack>
                </el-col>
            </el-row>
        </div>
        <el-row :style="{ 'min-height': _PageHeight+50+'px'}">
            <el-col :span="24">
                <el-form :model="form" ref="form" :rules="rules" label-suffix='：'>
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-form-item label-width="100px" label="用户名">
                                {{form.account}}
                            </el-form-item>
                        </el-col>
                        <el-col :md="12">
                            <el-form-item label-width="100px" label="姓名" prop="nickname">
                                <el-input v-model="form.nickname" placeholder="请填写姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12">
                            <el-form-item label-width="100px" label="手机" prop="phone">
                                <el-input v-model="form.phone" placeholder="请填写手机号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12">
                            <el-form-item label-width="100px" label="邮箱" required prop="email">
                                <el-input v-model="form.email" @keyup.enter.native="onSubmit" placeholder="请填写邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label-width="100px">
                        <el-button type="primary" size="large" :loading="loadingBiao" @click="onSubmit">确定保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
<script type="text/javascript">
var zzEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
//返回上一页共用组件
import goBack from '@/components/goBack'
export default {
    activated() {
            this.getData();
        },
        data() {
            return {
                loadingBiao: false,
                loading: false,
                formLabelWidth: '120px',
                rules: {
                    email: [{
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入邮箱！'));
                            } else {
                                if (!zzEmail.test(value)) {
                                    callback(new Error('请输入格式正确邮箱！'));
                                }
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }],
                    nickname: [{
                        required: true,
                        message: '请填写姓名！',
                        trigger: 'blur'
                    }]
                },
                form: {
                    head: '',
                    account: '',
                    nickname: '',
                    phone: '',
                    email: ''
                }
            }
        },
        methods: {
            //确定
            onSubmit() {
                this.loadingBiao = true;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.form.phone != '') {
                            if (/^1[34578]{1}\d{9}$/.test(this.form.phone)) {
                                this.setData()
                            } else {
                                this.loadingBiao = false;
                                this.$message.warning('请填写正确的手机号码');
                            }
                        } else {
                            this.setData()
                        }
                    } else {
                        return false
                    }
                })
            },
            //插入数据
            setData() {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/user/update',
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
                        this.getData();
                        this.$router.go(-1);
                    }
                    this.loadingBiao = false;
                }, (error) => {
                    this.loadingBiao = false;
                    this.$emit('API-ERR')
                })
            },
            //获取数据
            getData() {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/user/read',
                    data: {
                        id: this.userinfo.userinfo.id
                    },
                    headers: this.$store.getters.Request_Head
                }).then((response) => {
                    if (response.data.status.code !== 1001) {
                        this.form.group_id = []
                        this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                        if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                            this.lockout()
                        }
                    } else {
                        this.form = response.data.data;
                        //数据保存成功后再存入数据仓库
                        this.userinfo.userinfo.email = response.data.data.email;
                        this.userinfo.userinfo.phone = response.data.data.phone;
                        this.userinfo.userinfo.nickname = response.data.data.nickname;
                        this.$store.commit('setUserinfo', this.userinfo);
                        //去除此字段
                        delete this.form.group_id;
                    }
                }, (error) => {
                    this.form.group_id = []
                    this.$emit('API-ERR')
                })
            },
        },
        computed: {
            rules_juesezu: function() {
                return this.$store.state.rules_juesezu
            },
            //读取登录用户信息
            userinfo: function() {
                return this.$store.state.userinfo
            },
        },
        //注意别忘记挂载组件
        components: {
            goBack
        }
}
</script>
