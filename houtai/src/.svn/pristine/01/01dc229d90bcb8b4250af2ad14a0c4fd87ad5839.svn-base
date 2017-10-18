<template>
    <el-dialog size="tiny" title="添加子类" v-model="dialogFormVisible" close-on-press-escape @close="cleardialog">
        <el-form :model="form" :label-width="formLabelWidth">
            <el-form-item label="上级类别名称">
                <el-cascader :options="options" change-on-select v-model="zid" @change="handleChange" :props="props" :show-all-levels="false" style="width:100%"></el-cascader>
            </el-form-item>
            <el-form-item label="类别名称">
                <el-input placeholder="请填写类别名称" @keyup.enter.native="handleBao('form')" v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="false" @click="handleBao('form')">确认保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    activated: function() {
        this.getRead()
    },
    props: ['dialogState', 'tjdata'],
    data() {
        return {
            props: {
                value: 'id',
                label: 'title',
                children: 'children'
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                title: '',
                pid: ''
            },
            zid: [],
            options: []
        }
    },
    watch: {
        dialogState(newValue) {
            this.dialogFormVisible = newValue
        },
        tjdata(newValue) {
            this.zid = newValue.depth
        }
    },
    methods: {
        handleChange(val) {
            this.zid = val
        },
        //提交
        handleBao(form) {
            this.form.pid = this.zid[this.zid.length - 1]
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/category/insert',
                data: this.form,
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    this.id = []
                    this.form = {
                        title: '',
                        pid: ''
                    }
                    this.$emit('CB-dialogState', 1)
                }
            })
        },
        getRead() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/category/treeselect',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.options = response.data.data
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        //关闭弹框
        cleardialog() {
            this.id = []
            this.form = {
                title: '',
                pid: ''
            }
            this.$emit('CB-dialogState', false)
        }
    }
}
</script>
