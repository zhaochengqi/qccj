<template>
    <el-dialog title="更改密码" size='tiny' :visible.sync="dialogVisible" @close="closeDialog">
        <el-row>
            <el-col :span="23">
                <el-form :model="form" ref="form" :rules="rules" label-suffix='：'>
                    <el-form-item label="用户名" required :label-width="formLabelWidth" prop="account">
                        <el-input disabled v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" :label-width="formLabelWidth" required prop="password">
                        <el-input v-model="form.password" placeholder="请填写新密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth" required prop="xpassword">
                        <el-input v-model="form.xpassword" placeholder="请填写新密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" :label-width="formLabelWidth" required prop="qrxpassword">
                        <el-input v-model="form.qrxpassword" placeholder="请再次填写新密码" @keyup.enter.native="onSubmit" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loadingBiao" @click="onSubmit">确定保存</el-button>
        </div>
    </el-dialog>
</template>
<script type="text/javascript">
export default {
    props: ['dialogFormVisible'],
    data() {
        return {
            form: {
                id: '',
                account: '',
                qrxpassword: "",
                password: "",
                xpassword: "",
            },
            loadingBiao: false,
            formLabelWidth: '120px',
            dialogVisible: false,
            rules: {
                password: [{
                    required: true,
                    message: '请填写旧密码',
                    trigger: 'blur'
                }],
                xpassword: [{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请填写新密码！'));
                        } else {
                            if (this.form.qrxpassword !== '') {
                                this.$refs['form'].validateField('qrxpassword');
                            }
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],
                qrxpassword: [{
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次填写新密码！'));
                        } else if (value !== this.form.xpassword) {
                            callback(new Error('两次填写新密码不一致！'));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'blur'
                }],
            },
        }
    },
    watch: {
        'dialogFormVisible': function(newvalue, oldvalue) {
            this.dialogVisible = newvalue
            if (!newvalue) {
                this.$refs['form'].resetFields();
            } else {
                console.log(this.userinfo)
                this.form.id = this.userinfo.id;
                this.form.account = this.userinfo.account;
            }

        }
    },
    methods: {
        //确定
        onSubmit() {
            this.loadingBiao = true;
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.setData()
                } else {
                    this.loadingBiao = false;
                    return false
                }
            })
        },
        closeDialog() {
            this.form = {
                id: '',
                account: '',
                qrxpassword: "",
                password: "",
                xpassword: ""
            };
            this.$emit('CB-dialogFormVisible');
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
                    this.dialogVisible = false;
                    this.$message.success('改密成功，请重新登陆！');
                    let json = {
                        userinfo: {},
                        rules: []
                    }
                    this.$store.commit('setUserinfo', json);
                    this.$store.commit('setSliderNav', []);
                    this.$router.push({
                        name: 'login'
                    })
                }
                this.loadingBiao = false;
            }, (error) => {
                this.loadingBiao = false;
                this.$emit('API-ERR')
            })
        }
    },
    computed: {
        rules_juesezu: function() {
            return this.$store.state.rules_juesezu
        },
        //读取登录用户信息
        userinfo: function() {
            return this.$store.state.userinfo.userinfo
        }
    }
}
</script>
