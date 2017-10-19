<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="拼命加载中">
        <div slot="header" class="clearfix">
            <el-row>
                <el-col :md="6">
                    <el-input placeholder="检索：角色组名、描述" icon="search" v-model="keys">
                    </el-input>
                </el-col>
                <el-col :md="18" class="text-right">
                    <el-button type="primary" v-if="authCheck(43)" @click="handleAdd" icon="plus">
                        添加角色
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div v-bind:style="{ 'min-height': _PageHeight+52+'px'}">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="55">
                </el-table-column>
                <el-table-column prop="title" label="角色组名称" width="150">
                </el-table-column>
                <el-table-column prop="describe" label="角色描述">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100" :filters="[{ text: '正常', value: 1 }, { text: '禁用', value: 2 }]" :filter-method="filterTag">
                    <template scope="scope">
                        <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" close-transition>
                            <span v-if="scope.row.status==2">禁用</span>
                            <span v-if="scope.row.status==1">正常</span>
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template scope="scope">
                        <el-button-group>
                            <el-button size="small" v-if="authCheck(40)&&scope.row.status==1" class="jsGroupButton" type='warning' @click="handleStop(scope.row,2)">
                                <i class="ti-lock mini"></i> 禁用
                            </el-button>
                            <el-button size="small" v-if="authCheck(40)&&scope.row.status==2" class="jsGroupButton" type='info' @click="handleStop(scope.row,1)">
                                <i class="ti-unlock mini"></i> 启用
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type='success' v-if="authCheck(38)" @click="handleAuth(scope.row.id)">
                                <i class="ti-settings"></i> 权限管理
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type='primary' v-if="authCheck(39)" @click="handleAdd(scope.row.id)">
                                <i class="ti-pencil-alt"></i> 编辑
                            </el-button>
                            <el-button size="small" class="jsGroupButton" type='danger' v-if="authCheck(144)" @click="handleDelelt(scope.row.id)">
                                <i class="el-icon-delete2"></i> 删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加编辑角色弹框-->
        <el-dialog title="角色组信息" v-model="SearchMoreForm" @close="handleClose">
            <el-form label-suffix="：" :model="formData" :rules="rules" ref="formData" :label-width="formLabelWidth">
                <el-form-item label="角色组名称" prop="title">
                    <el-input v-model="formData.title" placeholder="请填写角色组名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="formData.describe" type="textarea" :rows="2" placeholder="请填写角色描述"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="false" @click="handleKeep('formData')">确认保存</el-button>
            </div>
        </el-dialog>
        <Quanxian :dialogStatus="dialog" :qxid="qxid" @CB-dialogStatus="CB_dialogStatus"></Quanxian>
    </el-card>
</template>
<script>
import Quanxian from '@/page/system/rules_quanxian'

export default {
    activated: function() {
        this.getData()
    },
    data() {
        return {
            keys: '',
            loading: false,
            tableData: [],
            value: '',
            SearchMoreForm: false,
            formData: {
                title: '',
                describe: '',
                status: 1
            },
            formLabelWidth: '120px',
            rules: {
                title: [{
                    required: true,
                    message: '请填写角色组名称',
                    trigger: 'blur'
                }]
            },
            url: '',
            dialog: false,
            qxid: '',
            status: 1,
        }
    },
    watch: {
        'keys': function(newValue, oldValue) {
            if (newValue == oldValue) return;
            this.keys = newValue;
            this.getData();
        }
    },
    methods: {
        //删除管理员
        handleDelelt(val) {
            this.$confirm('删除后不可恢复，确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/authgroup/delete',
                    data: {
                        id: val
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
                            message: '数据删除成功！',
                            type: 'success'
                        });
                        this.getData()
                    }
                }, (error) => {
                    this.$emit('API-ERR');
                })
            }).catch(() => {

            });
        },
        //禁用，启用
        handleStop(row, val) {
            this.url = this.API_ROOT + '/api/authgroup/update'
            this.formData = row
            this.formData.status = val;
            this.setData();
        },
        //权限管理
        handleAuth(id) {
            this.qxid = id
            this.dialog = true
        },
        //添加编辑角色
        handleAdd(id) {
            this.SearchMoreForm = true
            if (typeof id == 'number') {
                this.axios({
                    method: 'post',
                    url: this.API_ROOT + '/api/authgroup/read',
                    data: {
                        id: id
                    },
                    headers: this.$store.getters.Request_Head
                }).then((response) => {
                    if (response.data.status.code !== 1001) {
                        this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                        if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                            this.lockout()
                        }
                    } else {
                        this.formData = response.data.data
                    }
                })
                this.url = this.API_ROOT + '/api/authgroup/update'
            } else {
                this.url = this.API_ROOT + '/api/authgroup/insert'
            }
        },
        //保存数据
        handleKeep(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.setData();
                } else {
                    return false;
                }
            })
        },
        //编辑保存数据
        setData() {
            this.axios({
                method: 'post',
                url: this.url,
                data: this.formData,
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                } else {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    })
                    this.SearchMoreForm = false
                    this.getData()
                }
            }, (error) => {
                this.$emit('API-ERR')
            })
        },
        //筛选过滤
        filterTag(value, row) {
            return row.status === value;
        },
        getData() {
            this.loading = true
            this.axios({
                method: 'post',
                url: this.API_ROOT + '/api/authgroup',
                data: {
                    _order: 'update_time',
                    _sort: 'asc'
                },
                headers: this.$store.getters.Request_Head
            }).then((response) => {
                if (response.data.status.code !== 1001) {
                    this.$message.error(response.data.data ? response.data.data : response.data.status.title)
                    if (response.data.status.code == 1004 || response.data.status.code == 1006) {
                        this.lockout()
                    }
                    this.loading = false
                } else {
                    this.tableData = response.data.data
                }
                this.loading = false
            }, (error) => {
                this.loading = false
                this.$emit('API-ERR')
            })
        },
        //关闭弹框
        handleClose() {
            this.SearchMoreForm = false
            this.formData = {
                title: '',
                describe: '',
                status: 1
            }
        },
        CB_dialogStatus(val) {
            if (val == 1) {
                this.getData()
            }
            this.qxid = ''
            this.dialog = false
        }
    },
    components: {
        Quanxian
    }
}
</script>
<style>
.jsGroupButton {
    height: 30px;
}
</style>
