<template>
    <el-dialog title="权限管理" v-model="dialogFormVisible" top="5%" @close="handleClose">
        <div :style="{'height': _PageHeight+100+'px', 'overflow-x': 'scroll'}">
            <el-tree :data="treedata" show-checkbox default-expand-all node-key="id" :check-strictly="true" :default-checked-keys="treeform" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="false" @click="handleKeep()">确认保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    activated: function() {
        this.qxid = ''
    },
    props: ['dialogStatus', 'qxid'],
    data() {
        return {
            treedata: [],
            dialogFormVisible: false,
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            formData: '',
            treeform: []
        }
    },
    watch: {
        dialogStatus(newValue) {
            this.dialogFormVisible = newValue
        },
        'qxid': function(newValue, oldValue) {
            if (newValue == '') return
            if (typeof newValue == 'object') return
            this.qxid = newValue
            this.getRead()
            this.getTree()
        }
    },
    methods: {
        handleClose() {
            this.treeform = []
            this.formData = ''
            this.$emit('CB-dialogStatus', false)
        },
        handleKeep() {
            this.formData = this.$refs.tree.getCheckedKeys().join(",")
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/authgroup/saveauth',
                data: {
                    id: this.qxid,
                    rules: this.formData
                },
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
                        message: '保存成功'
                    })
                    this.formData = ''
                    this.treeform = []
                    this.$emit('CB-dialogStatus', 1)
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        getTree() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/node/treeselect',
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.treedata = response.data.data
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        getRead() {
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/authgroup/getrules',
                data: {
                    id: this.qxid
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    if (response.data.data == undefined) return
                    for (var i in response.data.data.split(",")) {
                        this.treeform[i] = parseInt(response.data.data.split(",")[i])
                    }
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        }
    }
}
</script>
